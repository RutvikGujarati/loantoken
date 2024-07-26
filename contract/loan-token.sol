// SPDX-License-Identifier: SEE LICENSE IN LICENSE

// File: PLSTokenPriceFeed.sol

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// File: @openzeppelin/contracts/utils/math/SafeMath.sol

// OpenZeppelin Contracts (last updated v4.9.0) (utils/math/SafeMath.sol)

// CAUTION
// This version of SafeMath should only be used with Solidity 0.8 or later,
// because it relies on the compiler's built in overflow checks.

/**
 * @dev Wrappers over Solidity's arithmetic operations.
 *
 * NOTE: `SafeMath` is generally not needed starting with Solidity 0.8, since the compiler
 * now has built in overflow checking.
 */
library SafeMath {
    /**
     * @dev Returns the addition of two unsigned integers, with an overflow flag.
     *
     * _Available since v3.4._
     */
    function tryAdd(
        uint256 a,
        uint256 b
    ) internal pure returns (bool, uint256) {
        unchecked {
            uint256 c = a + b;
            if (c < a) return (false, 0);
            return (true, c);
        }
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, with an overflow flag.
     *
     * _Available since v3.4._
     */
    function trySub(
        uint256 a,
        uint256 b
    ) internal pure returns (bool, uint256) {
        unchecked {
            if (b > a) return (false, 0);
            return (true, a - b);
        }
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, with an overflow flag.
     *
     * _Available since v3.4._
     */
    function tryMul(
        uint256 a,
        uint256 b
    ) internal pure returns (bool, uint256) {
        unchecked {
            // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
            // benefit is lost if 'b' is also tested.
            // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
            if (a == 0) return (true, 0);
            uint256 c = a * b;
            if (c / a != b) return (false, 0);
            return (true, c);
        }
    }

    /**
     * @dev Returns the division of two unsigned integers, with a division by zero flag.
     *
     * _Available since v3.4._
     */
    function tryDiv(
        uint256 a,
        uint256 b
    ) internal pure returns (bool, uint256) {
        unchecked {
            if (b == 0) return (false, 0);
            return (true, a / b);
        }
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers, with a division by zero flag.
     *
     * _Available since v3.4._
     */
    function tryMod(
        uint256 a,
        uint256 b
    ) internal pure returns (bool, uint256) {
        unchecked {
            if (b == 0) return (false, 0);
            return (true, a % b);
        }
    }

    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     *
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        return a + b;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return a - b;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `*` operator.
     *
     * Requirements:
     *
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        return a * b;
    }

    /**
     * @dev Returns the integer division of two unsigned integers, reverting on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator.
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return a / b;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * reverting when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return a % b;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
     * overflow (when the result is negative).
     *
     * CAUTION: This function is deprecated because it requires allocating memory for the error
     * message unnecessarily. For custom revert reasons use {trySub}.
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b <= a, errorMessage);
            return a - b;
        }
    }

    /**
     * @dev Returns the integer division of two unsigned integers, reverting with custom message on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a / b;
        }
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * reverting with custom message when dividing by zero.
     *
     * CAUTION: This function is deprecated because it requires allocating memory for the error
     * message unnecessarily. For custom revert reasons use {tryMod}.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a % b;
        }
    }
}

// File: @openzeppelin/contracts/utils/Context.sol

// OpenZeppelin Contracts (last updated v5.0.1) (utils/Context.sol)

/**
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */

// File: @openzeppelin/contracts/access/Ownable.sol

// OpenZeppelin Contracts (last updated v5.0.0) (access/Ownable.sol)

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * The initial owner is set to the address provided by the deployer. This can
 * later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract Ownable is Context {
    address private _owner;

    /**
     * @dev The caller account is not authorized to perform an operation.
     */
    error OwnableUnauthorizedAccount(address account);

    /**
     * @dev The owner is not a valid owner account. (eg. `address(0)`)
     */
    error OwnableInvalidOwner(address owner);

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    /**
     * @dev Initializes the contract setting the address provided by the deployer as the initial owner.
     */
    constructor(address initialOwner) {
        if (initialOwner == address(0)) {
            revert OwnableInvalidOwner(address(0));
        }
        _transferOwnership(initialOwner);
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if the sender is not the owner.
     */
    function _checkOwner() internal view virtual {
        if (owner() != _msgSender()) {
            revert OwnableUnauthorizedAccount(_msgSender());
        }
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby disabling any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        if (newOwner == address(0)) {
            revert OwnableInvalidOwner(address(0));
        }
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

interface IPDXN {
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);
}

contract DAVTOKEN is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 422000 * 10 ** 18;
    uint256 public constant MAX_PDXN_SUPPLY = 80000 * 10 ** 18;
    uint256 public pdxnMinted = 0;

    mapping(address => bool) public isHolder;
    address[] public holders;

    uint256 public PRICE_TWO_TOKEN = 500000 ether;
    uint256 public PRICE_FIVE_TOKENS = 1000000 ether;
    uint256 public PRICE_THIRTEEN_TOKENS = 2000000 ether;

    uint256 public PDXN_PRICE_TWO_TOKEN = 800 * 10 ** 18;
    uint256 public PDXN_PRICE_FIVE_TOKENS = 1750 * 10 ** 18;
    uint256 public PDXN_PRICE_THIRTEEN_TOKENS = 2500 * 10 ** 18;

    address public PDXN_TOKEN_ADDRESS;
    address payable public paymentAddress;

    event TokensBought(address indexed buyer, uint256 quantity, uint256 cost);
    event TokensMintedWithPDXN(
        address indexed minter,
        uint256 quantity,
        uint256 cost
    );
    event HolderAdded(address indexed holder);
    event PricesSet(
        uint256 priceTwoTokens,
        uint256 priceFiveTokens,
        uint256 priceThirteenTokens
    );
    event PDXNPricesSet(
        uint256 priceTwoTokens,
        uint256 priceFiveTokens,
        uint256 priceThirteenTokens
    );

    constructor(
        address _PDXN_TOKEN_ADDRESS,
        address payable _paymentAddress
    ) ERC20("DAVPLS", "DAVPLS") Ownable(msg.sender) {
        PDXN_TOKEN_ADDRESS = _PDXN_TOKEN_ADDRESS;
        paymentAddress = _paymentAddress;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        require(
            totalSupply() + amount <= MAX_SUPPLY,
            "Exceeds maximum token supply"
        );
        _mint(to, amount);
        _addHolder(to);
    }

    function buyTokens(uint256 quantity) public payable {
        uint256 cost;
        if (quantity == 2) {
            cost = PRICE_TWO_TOKEN;
        } else if (quantity == 5) {
            cost = PRICE_FIVE_TOKENS;
        } else if (quantity == 13) {
            cost = PRICE_THIRTEEN_TOKENS;
        } else {
            revert("Invalid token quantity");
        }

        require(msg.value == cost, "Incorrect Ether amount sent");
        require(
            totalSupply() + (quantity * 10 ** 18) <= MAX_SUPPLY,
            "Exceeds maximum token supply"
        );

        _mint(msg.sender, quantity * 10 ** 18);
        _addHolder(msg.sender);

        // Transfer the received Ether to the payment address
        (bool success, ) = paymentAddress.call{value: msg.value}("");
        require(success, "Ether transfer failed");

        emit TokensBought(msg.sender, quantity, cost);
    }

    function mintWithPDXN(uint256 quantity) public {
        uint256 cost;
        if (quantity == 2) {
            cost = PDXN_PRICE_TWO_TOKEN;
        } else if (quantity == 5) {
            cost = PDXN_PRICE_FIVE_TOKENS;
        } else if (quantity == 13) {
            cost = PDXN_PRICE_THIRTEEN_TOKENS;
        } else {
            revert("Invalid token quantity");
        }

        uint256 amountToMint = quantity * 10 ** 18;
        require(
            pdxnMinted + amountToMint <= MAX_PDXN_SUPPLY,
            "Exceeds pDXN minting limit"
        );
        require(
            totalSupply() + amountToMint <= MAX_SUPPLY,
            "Exceeds maximum token supply"
        );

        IPDXN pdxnToken = IPDXN(PDXN_TOKEN_ADDRESS);
        require(
            pdxnToken.transferFrom(msg.sender, paymentAddress, cost),
            "pDXN transfer failed"
        );

        _mint(msg.sender, amountToMint);
        pdxnMinted += amountToMint;
        _addHolder(msg.sender);

        emit TokensMintedWithPDXN(msg.sender, quantity, cost);
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner()).transfer(balance);
    }

    function getUsersAddress() public view returns (address[] memory) {
        return holders;
    }

    function _addHolder(address holder) internal {
        if (!isHolder[holder]) {
            isHolder[holder] = true;
            holders.push(holder);
            emit HolderAdded(holder);
        }
    }

    function holdersLength() external view returns (uint256) {
        return holders.length;
    }

    function holderAt(uint256 index) external view returns (address) {
        require(index < holders.length, "Index out of bounds");
        return holders[index];
    }

    function setPriceOfTokens(
        uint256 twoT,
        uint256 fiveT,
        uint256 thirteenT
    ) public onlyOwner {
        PRICE_TWO_TOKEN = twoT;
        PRICE_FIVE_TOKENS = fiveT;
        PRICE_THIRTEEN_TOKENS = thirteenT;
        emit PricesSet(twoT, fiveT, thirteenT);
    }

    function setPDXNPriceOfTokens(
        uint256 twoT,
        uint256 fiveT,
        uint256 thirteenT
    ) public onlyOwner {
        PDXN_PRICE_TWO_TOKEN = twoT;
        PDXN_PRICE_FIVE_TOKENS = fiveT;
        PDXN_PRICE_THIRTEEN_TOKENS = thirteenT;
        emit PDXNPricesSet(twoT, fiveT, thirteenT);
    }
}

contract system_state_sc_Autovaults_V1_1 is Ownable(msg.sender) {
    using SafeMath for uint256;

    IERC20 public xenToken;
    DAVTOKEN public DAVPLS;
    address private BackendOperationAddress;
    uint256 public ID = 1;
    uint256 public Deployed_Time;
    uint256 public NumberOfUser;

    struct Deposit {
        address depositAddress;
        uint256 depositAmount; // Deposit amount in Eth.
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
    event ProtocolClaimed(address User, uint256 AmountClaimed);
    event TransactionConfirmation(bool Status);
    event AutoVaultThresholdReached(address user, uint256 value);

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

    function getAddresses()
        public
        view
        returns (address XenToken, address DavPLS)
    {
        return (address(xenToken), address(DAVPLS));
    }

    receive() external payable {}

    modifier onlyBackend() {
        require(
            msg.sender == BackendOperationAddress,
            "Only backend operation can call this function."
        );
        _;
    }

    function changeOwner(address owner) public onlyOwner {
        require(owner != address(0), "Invalid owner address");
        _transferOwnership(owner);
    }

    function setAddresses(
        address _backendOperationAddress,
        address XenToken,
        address davpls
    ) public onlyOwner {
        require(
            _backendOperationAddress != address(0),
            "Invalid backend operation address"
        );
        require(XenToken != address(0), "Invalid XEN token address");
        require(davpls != address(0), "Invalid DAVPLS token address");

        BackendOperationAddress = _backendOperationAddress;
        xenToken = IERC20(XenToken);
        DAVPLS = DAVTOKEN(davpls);
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

        for (uint256 i = 0; i < DAVPLS.holdersLength(); i++) {
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
        emit DepositEvent(ID, msg.sender, autoVaultAmount);

        userAutoVault[msg.sender] = 0;
    }

    function getAutovaults(address user) public view returns (uint256) {
        return userAutoVault[user];
    }

    function deposit(uint256 value) public {
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

    function holdersAddress() public view returns (address[] memory) {
        return DAVPLS.getUsersAddress();
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
        for (uint256 i = 0; i < DAVPLS.holdersLength(); i++) {
            address user = DAVPLS.holders(i);
            uint256 userBalance = DAVPLS.balanceOf(user);

            if (userBalance > 0 && DAVPLS.totalSupply() > 0) {
                uint256 userShare = _tokenParity.mul(userBalance).div(
                    DAVPLS.totalSupply()
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
    }

    function claimAllReward() public {
        address user = msg.sender;

        uint256 parityShareTokenReward = parityShareTokensMapping[user]
            .parityClaimableAmount;
        uint256 allRewardAmount = parityShareTokenReward;

        require(allRewardAmount > 0, "No funds available in your reward.");

        parityShareTokensMapping[user].parityClaimableAmount = 0;

        require(
            xenToken.transfer(user, allRewardAmount),
            "User transaction failed."
        );

        PSTClaimed[user] = PSTClaimed[user].add(allRewardAmount);
    }

    function getTotalAutoVaults() public view returns (uint256) {
        uint256 totalAutoVaults = 0;

        for (uint256 i = 0; i < DAVPLS.holdersLength(); i++) {
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
