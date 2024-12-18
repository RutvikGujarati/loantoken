// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {SafeMath} from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {DAVMATIC} from "../System state protocol-DAVToken contracts/DAVMATIC.sol";

/**
 * @title Autovaults V1.1
 * @dev A smart contract for managing deposits, distributing fees, and claiming rewards.
 */
contract system_state_sc_Autovaults_V1_2_mDXN is
    Ownable(msg.sender),
    ReentrancyGuard
{
    using SafeMath for uint256;

    IERC20 public mDXN;
    DAVMATIC public DavMatic;
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
    event AddressesUpdated(address indexed mDXN, address indexed davpls);

    /**
     * @dev Initializes the contract with the specified token addresses and depositer address.
     * @param _mDXNAddress The address of the XEN token contract.
     * @param _davMaticAddress The address of the DavMatic token contract.
     * @param _depositerAddress The address of the depositer.
     */
    constructor(
        address _mDXNAddress,
        address _davMaticAddress,
        address _depositerAddress
    ) {
        require(_mDXNAddress != address(0), "Invalid XEN token address");
        require(_davMaticAddress != address(0), "Invalid DavMatic token address");
        require(_depositerAddress != address(0), "Invalid depositer address");

        mDXN = IERC20(_mDXNAddress);
        DavMatic = DAVMATIC(_davMaticAddress);
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

    /**
     * @dev Returns the addresses of the XEN and DavMatic tokens.
     * @return PDXN The address of the XEN token.
     * @return DavPLS The address of the DavMatic token.
     */
    function getAddresses() public view returns (address PDXN, address DavPLS) {
        return (address(mDXN), address(DavMatic));
    }

    receive() external payable {}

    /**
     * @dev Changes the owner of the contract.
     * @param owner The address of the new owner.
     */
    function changeOwner(address owner) public onlyOwner {
        require(owner != address(0), "Invalid owner address");
        _transferOwnership(owner);
        emit OwnerChanged(msg.sender, owner);
    }

    /**
     * @dev Sets the addresses of the XEN and DavMatic tokens.
     * @param PDXN The address of the XEN token.
     * @param davpls The address of the DavMatic token.
     */
    function setAddresses(address PDXN, address davpls) public onlyOwner {
        require(PDXN != address(0), "Invalid XEN token address");
        require(davpls != address(0), "Invalid DavMatic token address");

        mDXN = IERC20(PDXN);
        DavMatic = DAVMATIC(davpls);
        emit AddressesUpdated(PDXN, davpls);
    }

    /**
     * @dev Calculates the token parity and auto vault fee for a given value.
     * @param value The value to calculate the fees for.
     * @param currentUser The address of the current user.
     * @return tokenParity The calculated token parity.
     * @return The auto vault fee (always returns 0 for now).
     */
    function calculationFunction(
        uint256 value,
        address currentUser
    ) private returns (uint256, uint256) {
        uint256 tokenParity = value.mul(3820).div(10000); // tokenParity - 38.2%
        uint256 AutoVaultFee = value.mul(6180).div(10000); // AutoVault Fee - 61.8%

        distributeAutoVaultFee(AutoVaultFee, currentUser);
        return (tokenParity, 0);
    }

    /**
     * @dev Distributes the auto vault fee to all DavMatic token holders except the excluded user.
     * @param AutoVaultFee The auto vault fee to distribute.
     * @param excludeUser The address of the user to exclude from the distribution.
     */
    function distributeAutoVaultFee(
        uint256 AutoVaultFee,
        address excludeUser
    ) private {
        uint256 totalSupply = DavMatic.totalSupply();
        uint256 excludeUserBalance = DavMatic.balanceOf(excludeUser);

        if (totalSupply == 0 || AutoVaultFee == 0) {
            return;
        }

        uint256 totalDistributableSupply = totalSupply.sub(excludeUserBalance);

        uint256 holdersLength = DavMatic.holdersLength();

        for (uint256 i = 0; i < holdersLength; i++) {
            address user = DavMatic.holders(i);
            uint256 userBalance = DavMatic.balanceOf(user);

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

    /**
     * @dev Deposits the auto vault amount and distributes the token parity.
     */
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

    /**
     * @dev Returns the auto vault amount for a given user.
     * @param user The address of the user.
     * @return The auto vault amount of the user.
     */
    function getAutovaults(address user) public view returns (uint256) {
        return userAutoVault[user];
    }

    /**
     * @dev Deposits a specified value and updates the mapping.
     * @param value The value to deposit.
     */
    function deposit(uint256 value) public onlyDepositer {
        require(value > 0, "Enter a valid amount");

        require(
            mDXN.transferFrom(msg.sender, address(this), value),
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

    /**
     * @dev Returns the balance of the contract in XEN tokens.
     * @return The contract's balance in XEN tokens.
     */
    function contractTokenBalance() public view returns (uint256) {
        return mDXN.balanceOf(address(this));
    }

    /**
     * @dev Sets the deposit address.
     * @param depositeAddress The new deposit address.
     */
    function setDepositAddress(address depositeAddress) public onlyOwner {
        require(depositeAddress != address(0), "Invalid deposit address");
        depositer = depositeAddress;
    }

    /**
     * @dev Returns the auto vault details of all users.
     * @return An array of user addresses, their auto vault amounts, and balances.
     */
    function getUserAutoVaults()
        public
        view
        returns (address[] memory, uint256[] memory, uint256[] memory)
    {
        uint256 length = DavMatic.holdersLength();
        address[] memory addresses = new address[](length);
        uint256[] memory autoVaults = new uint256[](length);
        uint256[] memory balances = new uint256[](length);

        for (uint256 i = 0; i < length; i++) {
            address user = DavMatic.holders(i);
            addresses[i] = user;
            autoVaults[i] = userAutoVault[user];
            balances[i] = DavMatic.balanceOf(user);
        }

        return (addresses, autoVaults, balances);
    }

    /**
     * @dev Updates the parity amount for all DavMatic token holders.
     * @param _tokenParity The new token parity amount.
     */
    function updateParityAmount(uint256 _tokenParity) internal {
        uint256 totalSupply = DavMatic.totalSupply();
        uint256 holdersLength = DavMatic.holdersLength();

        for (uint256 i = 0; i < holdersLength; i++) {
            address user = DavMatic.holders(i);
            uint256 userBalance = DavMatic.balanceOf(user);

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

    /**
     * @dev Claims all rewards for the calling user.
     */
    function claimAllReward() public nonReentrant {
        address user = msg.sender;

        uint256 parityShareTokenReward = parityShareTokensMapping[user]
            .parityClaimableAmount;
        uint256 allRewardAmount = parityShareTokenReward;

        require(allRewardAmount > 0, "No funds available in your reward.");

        PSTClaimed[user] = PSTClaimed[user].add(allRewardAmount);

        parityShareTokensMapping[user].parityClaimableAmount = 0;
        require(
            mDXN.transfer(user, allRewardAmount),
            "User transaction failed."
        );

        emit ParityClaimed(msg.sender, allRewardAmount);
        emit TransactionConfirmation(true);
    }

    /**
     * @dev Returns the total auto vault amount of all users.
     * @return The total auto vault amount.
     */
    function getTotalAutoVaults() public view returns (uint256) {
        uint256 totalAutoVaults = 0;
        uint256 holdersLength = DavMatic.holdersLength();

        for (uint256 i = 0; i < holdersLength; i++) {
            address user = DavMatic.holders(i);
            totalAutoVaults = totalAutoVaults.add(userAutoVault[user]);
        }

        return totalAutoVaults;
    }

    /**
     * @dev Returns the parity share tokens details for a given user.
     * @param _user The address of the user.
     * @return user The address of the user.
     * @return parityAmount The total parity amount of the user.
     * @return claimableAmount The claimable parity amount of the user.
     */
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

    /**
     * @dev Returns the deposit details for a given ID.
     * @param _ID The ID of the deposit.
     * @return An array of Deposit structs.
     */
    function getDeposited(uint256 _ID) public view returns (Deposit[] memory) {
        return depositMapping[_ID];
    }

    /**
     * @dev Returns the addresses of all users with deposits.
     * @return An array of user addresses.
     */
    function getDepositors() public view returns (address[] memory) {
        return usersWithDeposits;
    }

    /**
     * @dev Returns the balance of the contract in Ether.
     * @return The contract's balance in Ether.
     */
    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }

    /**
     * @dev Returns the total PST claimed by a given user.
     * @param _user The address of the user.
     * @return The total PST claimed by the user.
     */
    function getPSTClaimed(address _user) public view returns (uint256) {
        return PSTClaimed[_user];
    }

    /**
     * @dev Returns the total parity amount distributed to a given user.
     * @param _user The address of the user.
     * @return The total parity amount distributed to the user.
     */
    function getParityAmountDistributed(
        address _user
    ) public view returns (uint256) {
        return ParityAmountDistributed[_user];
    }

    /**
     * @dev Checks if an address is a depositor.
     * @param _depositor The address to check.
     * @return True if the address is a depositor, false otherwise.
     */
    function isDepositor(address _depositor) internal view returns (bool) {
        for (uint256 i = 0; i < usersWithDeposits.length; i++) {
            if (usersWithDeposits[i] == _depositor) {
                return true;
            }
        }
        return false;
    }
}
