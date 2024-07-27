// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {SafeMath} from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {DAVTOKEN} from "./DAV.sol";

contract system_state_sc_Autovaults_V1_1 is
    Ownable(msg.sender),
    ReentrancyGuard
{
    using SafeMath for uint256;

    IERC20 public xenToken;
    DAVTOKEN public DAVPLS;
    uint256 public ID = 1;
    uint256 public Deployed_Time;
    uint256 public NumberOfUser;

    struct Deposit {
        address depositAddress;
        uint256 depositAmount; // Deposit amount in Xen.
        uint256 tokenParity;
        bool withdrawn;
    }

    struct ParityShareTokens {
        address UserAddress;
        uint256 parityAmount;
        uint256 parityClaimableAmount;
    }

    mapping(address => ParityShareTokens) private parityShareTokensMapping;
    address[] private usersWithDeposits;
    mapping(uint256 => Deposit[]) private depositMapping;
    mapping(address => uint256) private PSTClaimed;
    mapping(address => uint256) private ParityAmountDistributed;
    mapping(address => uint256) public TokenTransfered;
    mapping(address => uint256) public userAutoVault;

    address private depositer;

    // Events
    event DepositEvent(
        uint256 ID,
        address indexed depositAddress,
        uint256 depositAmount
    );
    event ParityClaimed(address User, uint256 AmountClaimed);
    event Parity(
        uint256 parityAmount,
        uint256 totalPSTshare,
        uint256 distributeParityFeePercentage,
        uint256 ParityAmountPerUser,
        uint256 tokenParity
    );
    event TransactionConfirmation(bool Status);
    event AutoVaultFeeDistributed(address indexed user, uint256 userShare);
    event OwnerChanged(address indexed previousOwner, address indexed newOwner);
    event AddressesUpdated(address indexed xenToken, address indexed davpls);

    constructor(
        address _xenTokenAddress,
        address _davplsAddress,
        address _depositerAddress
    ) {
        require(_xenTokenAddress != address(0), "Invalid XEN token address");
        require(_davplsAddress != address(0), "Invalid DAVPLS token address");
        require(_depositerAddress != address(0), "Invalid depositer address");

        xenToken = IERC20(_xenTokenAddress);
        DAVPLS = DAVTOKEN(_davplsAddress);
        depositer = _depositerAddress;

        _transferOwnership(msg.sender);
        Deployed_Time = block.timestamp;
    }

    modifier onlyDepositer() {
        require(
            msg.sender == depositer,
            "Only the depositer can call this function"
        );
        _;
    }

    function getAddresses()
        public
        view
        returns (address XenToken, address DavPLS)
    {
        return (address(xenToken), address(DAVPLS));
    }

    receive() external payable {}

    function changeOwner(address owner) public onlyOwner {
        require(owner != address(0), "Invalid owner address");
        _transferOwnership(owner);
        emit OwnerChanged(msg.sender, owner);
    }

    function setAddresses(address XenToken, address davpls) public onlyOwner {
        require(XenToken != address(0), "Invalid XEN token address");
        require(davpls != address(0), "Invalid DAVPLS token address");

        xenToken = IERC20(XenToken);
        DAVPLS = DAVTOKEN(davpls);
        emit AddressesUpdated(XenToken, davpls);
    }

    function calculationFunction(
        uint256 value,
        address currentUser
    ) private returns (uint256, uint256) {
        uint256 tokenParity = value.mul(3820).div(10000); // tokenParity - 38.2.0%
        uint256 AutoVaultFee = value.mul(6180).div(10000); // AutoVault Fee - 61.8%

        distributeAutoVaultFee(AutoVaultFee, currentUser);
        return (tokenParity, 0);
    }

    function distributeAutoVaultFee(
        uint256 AutoVaultFee,
        address excludeUser
    ) private {
        uint256 totalSupply = DAVPLS.totalSupply();
        uint256 excludeUserBalance = DAVPLS.balanceOf(excludeUser);

        if (totalSupply == 0 || AutoVaultFee == 0) {
            return;
        }

        uint256 totalDistributableSupply = totalSupply.sub(excludeUserBalance);

        uint256 holdersLength = DAVPLS.holdersLength();

        for (uint256 i = 0; i < holdersLength; i++) {
            address user = DAVPLS.holders(i);
            uint256 userBalance = DAVPLS.balanceOf(user);

            if (user == excludeUser) {
                continue;
            }

            if (userBalance > 0 && totalDistributableSupply > 0) {
                uint256 userShare = AutoVaultFee.mul(userBalance).div(
                    totalDistributableSupply
                );
                userAutoVault[user] = userAutoVault[user].add(userShare);

                emit AutoVaultFeeDistributed(user, userShare);
            }
        }
    }

    function depositAndAutoVaults() public {
        uint256 autoVaultAmount = userAutoVault[msg.sender];
        require(autoVaultAmount > 0, "Enter a valid Auto-Vault amount");

        (uint256 tokenParity, ) = calculationFunction(
            autoVaultAmount,
            msg.sender
        );

        if (!isDepositor(msg.sender)) {
            usersWithDeposits.push(msg.sender);
            NumberOfUser++;
        }

        updateParityAmount(tokenParity);

        userAutoVault[msg.sender] = 0;
        emit DepositEvent(ID, msg.sender, autoVaultAmount);
        emit TransactionConfirmation(true);
    }

    function getAutovaults(address user) public view returns (uint256) {
        return userAutoVault[user];
    }

    function deposit(uint256 value) public onlyDepositer {
        require(value > 0, "Enter a valid amount");

        require(
            xenToken.transferFrom(msg.sender, address(this), value),
            "Token transfer failed"
        );

        TokenTransfered[msg.sender] = TokenTransfered[msg.sender].add(value);

        (uint256 tokenParity, ) = calculationFunction(value, msg.sender);

        if (!isDepositor(msg.sender)) {
            usersWithDeposits.push(msg.sender);
            NumberOfUser++;
        }

        depositMapping[ID].push(Deposit(msg.sender, value, tokenParity, false));
        emit DepositEvent(ID, msg.sender, value);

        updateParityAmount(tokenParity);
        ID++;
    }

    function contractTokenBalance() public view returns (uint256) {
        return xenToken.balanceOf(address(this));
    }

    function setDepositAddress(address depositeAddress) public onlyOwner {
        require(depositeAddress != address(0), "Invalid deposit address");
        depositer = depositeAddress;
    }

    function getUserAutoVaults()
        public
        view
        returns (address[] memory, uint256[] memory, uint256[] memory)
    {
        uint256 length = DAVPLS.holdersLength();
        address[] memory addresses = new address[](length);
        uint256[] memory autoVaults = new uint256[](length);
        uint256[] memory balances = new uint256[](length);

        for (uint256 i = 0; i < length; i++) {
            address user = DAVPLS.holders(i);
            addresses[i] = user;
            autoVaults[i] = userAutoVault[user];
            balances[i] = DAVPLS.balanceOf(user);
        }

        return (addresses, autoVaults, balances);
    }

    function updateParityAmount(uint256 _tokenParity) internal {
        uint256 totalSupply = DAVPLS.totalSupply();
        uint256 holdersLength = DAVPLS.holdersLength();

        for (uint256 i = 0; i < holdersLength; i++) {
            address user = DAVPLS.holders(i);
            uint256 userBalance = DAVPLS.balanceOf(user);

            if (userBalance > 0 && totalSupply > 0) {
                uint256 userShare = _tokenParity.mul(userBalance).div(
                    totalSupply
                );
                ParityShareTokens
                    storage parityshare = parityShareTokensMapping[user];

                parityshare.UserAddress = user;
                parityshare.parityAmount = parityshare.parityAmount.add(
                    userShare
                );
                parityshare.parityClaimableAmount = parityshare
                    .parityClaimableAmount
                    .add(userShare);
                ParityAmountDistributed[user] = ParityAmountDistributed[user]
                    .add(userShare);
            }
        }
        emit Parity(_tokenParity, totalSupply, 0, 0, _tokenParity);
    }

    function claimAllReward() public nonReentrant {
        address user = msg.sender;

        uint256 parityShareTokenReward = parityShareTokensMapping[user]
            .parityClaimableAmount;
        uint256 allRewardAmount = parityShareTokenReward;

        require(allRewardAmount > 0, "No funds available in your reward.");

        PSTClaimed[user] = PSTClaimed[user].add(allRewardAmount);

        parityShareTokensMapping[user].parityClaimableAmount = 0;
        require(
            xenToken.transfer(user, allRewardAmount),
            "User transaction failed."
        );

        emit ParityClaimed(msg.sender, allRewardAmount);
        emit TransactionConfirmation(true);
    }

    function getTotalAutoVaults() public view returns (uint256) {
        uint256 totalAutoVaults = 0;
        uint256 holdersLength = DAVPLS.holdersLength();

        for (uint256 i = 0; i < holdersLength; i++) {
            address user = DAVPLS.holders(i);
            totalAutoVaults = totalAutoVaults.add(userAutoVault[user]);
        }

        return totalAutoVaults;
    }

    function getParityShareTokensDetail(
        address _user
    )
        public
        view
        returns (address user, uint256 parityAmount, uint256 claimableAmount)
    {
        ParityShareTokens memory tokens = parityShareTokensMapping[_user];
        return (
            tokens.UserAddress,
            tokens.parityAmount,
            tokens.parityClaimableAmount
        );
    }

    function getDeposited(uint256 _ID) public view returns (Deposit[] memory) {
        return depositMapping[_ID];
    }

    function getDepositors() public view returns (address[] memory) {
        return usersWithDeposits;
    }

    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getPSTClaimed(address _user) public view returns (uint256) {
        return PSTClaimed[_user];
    }

    function getParityAmountDistributed(
        address _user
    ) public view returns (uint256) {
        return ParityAmountDistributed[_user];
    }

    function isDepositor(address _depositor) private view returns (bool) {
        for (uint256 i = 0; i < usersWithDeposits.length; i++) {
            if (usersWithDeposits[i] == _depositor) {
                return true;
            }
        }
        return false;
    }
}
