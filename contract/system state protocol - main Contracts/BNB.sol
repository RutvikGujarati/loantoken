// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

/*   

   ____         __              ______       __        ___           __                __
  / __/_ _____ / /____ __ _    / __/ /____ _/ /____   / _ \_______  / /____  _______  / /
 _\ \/ // (_-</ __/ -_)  ' \  _\ \/ __/ _ `/ __/ -_) / ___/ __/ _ \/ __/ _ \/ __/ _ \/ / 
/___/\_, /___/\__/\__/_/_/_/ /___/\__/\_,_/\__/\__/ /_/  /_/  \___/\__/\___/\__/\___/_/  
    /___/                                                                                


*/

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {SafeMath} from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {DAVBNB} from "../System state protocol-DAVToken contracts/BNBDAV.sol";

/**
 * @title Autovaults V1.1
 * @dev A smart contract for managing deposits, distributing fees, and claiming rewards.
 */
contract system_state_sc_Autovaults_V1_1 is
    Ownable(msg.sender),
    ReentrancyGuard
{
    using SafeMath for uint256;

    DAVBNB public DavBnb;
    uint256 public ID = 1;
    uint256 public Deployed_Time;
    uint256 public NumberOfUser;

    struct Deposit {
        address depositAddress;
        uint256 depositAmount; 
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
    event AddressesUpdated(address indexed pFENIX, address indexed davpls);

    /**
     * @dev Initializes the contract with the specified token addresses and depositer address.
     * @param _davBnbAddress The address of the DavBnb token contract.
     * @param _depositerAddress The address of the depositer.
     */
    constructor(address _davBnbAddress, address _depositerAddress) {
        require(_davBnbAddress != address(0), "Invalid DavBnb token address");
        require(_depositerAddress != address(0), "Invalid depositer address");

        DavBnb = DAVBNB(_davBnbAddress);
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
     * @dev Returns the addresses of the XEN and DavBnb tokens.
     * @return DavPLS The address of the DavBnb token.
     */
    function getAddresses() public view returns (address DavPLS) {
        return (address(DavBnb));
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
     * @dev Distributes the auto vault fee to all DavBnb token holders except the excluded user.
     * @param AutoVaultFee The auto vault fee to distribute.
     * @param excludeUser The address of the user to exclude from the distribution.
     */
    function distributeAutoVaultFee(
        uint256 AutoVaultFee,
        address excludeUser
    ) private {
        uint256 totalSupply = DavBnb.totalSupply();
        uint256 excludeUserBalance = DavBnb.balanceOf(excludeUser);

        if (totalSupply == 0 || AutoVaultFee == 0) {
            return;
        }

        uint256 totalDistributableSupply = totalSupply.sub(excludeUserBalance);

        uint256 holdersLength = DavBnb.holdersLength();

        for (uint256 i = 0; i < holdersLength; i++) {
            address user = DavBnb.holders(i);
            uint256 userBalance = DavBnb.balanceOf(user);

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
     */
    function deposit() public payable onlyDepositer {
        uint256 value = msg.value;
        require(value > 0, "Enter a valid amount");

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
        return address(this).balance;
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
        uint256 length = DavBnb.holdersLength();
        address[] memory addresses = new address[](length);
        uint256[] memory autoVaults = new uint256[](length);
        uint256[] memory balances = new uint256[](length);

        for (uint256 i = 0; i < length; i++) {
            address user = DavBnb.holders(i);
            addresses[i] = user;
            autoVaults[i] = userAutoVault[user];
            balances[i] = DavBnb.balanceOf(user);
        }

        return (addresses, autoVaults, balances);
    }

    /**
     * @dev Updates the parity amount for all DavBnb token holders.
     * @param _tokenParity The new token parity amount.
     */
    function updateParityAmount(uint256 _tokenParity) internal {
        uint256 totalSupply = DavBnb.totalSupply();
        uint256 holdersLength = DavBnb.holdersLength();

        for (uint256 i = 0; i < holdersLength; i++) {
            address user = DavBnb.holders(i);
            uint256 userBalance = DavBnb.balanceOf(user);

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
        (bool success, ) = payable(user).call{value: allRewardAmount}("");

        require(success, "transaction error");

        emit ParityClaimed(msg.sender, allRewardAmount);
        emit TransactionConfirmation(true);
    }

    /**
     * @dev Returns the total auto vault amount of all users.
     * @return The total auto vault amount.
     */
    function getTotalAutoVaults() public view returns (uint256) {
        uint256 totalAutoVaults = 0;
        uint256 holdersLength = DavBnb.holdersLength();

        for (uint256 i = 0; i < holdersLength; i++) {
            address user = DavBnb.holders(i);
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
