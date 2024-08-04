// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract DAVDEFI is ERC20, Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    uint256 public constant MAX_SUPPLY_OF_TOKENS = 500 ether;
    uint256 public constant MAX_SUPPLY_OF_THIRTEEN_PLS = 55888 ether;
    uint256 public constant MAX_TWO_PLS_SUPPLY = 440000 ether;
    uint256 public constant MAX_FIVE_PLS_SUPPLY = 250000 ether;
    uint256 public constant MAX_Eight_PLS_SUPPLY = 140000 ether;

    uint256 public HEX_TOKENS_MINTED = 0;
    uint256 public TEXAN_TOKENS_MINTED = 0;
    uint256 public REX_TOKENS_MINTED = 0;
    uint256 public LOAN_TOKENS_MINTED = 0;
    uint256 public PTGC_TOKENS_MINTED = 0;
    uint256 public WATT_TOKENS_MINTED = 0;
    uint256 public PLS_MINTED = 0;
    uint256 public PLSTWOTokenMinted = 0;
    uint256 public PLSFIVETokenMinted = 0;
    uint256 public PLSEightTokenMinted = 0;

    mapping(address => bool) public isHolder;
    address[] public holders;

    uint256 public constant HEX_ONE_TOKEN_PRICE = 5000 ether;
    uint256 public constant TEXAN_ONE_TOKEN_PRICE = 15000000 ether;
    uint256 public constant REX_ONE_TOKEN_PRICE = 50000000 ether;
    uint256 public constant LOAN_ONE_TOKEN_PRICE = 12000000 ether;
    uint256 public constant PTGC_ONE_TOKEN_PRICE = 1000000 ether;
    uint256 public constant WATT_ONE_TOKEN_PRICE = 30000 ether;
    uint256 public constant PRICE_TWO_TOKEN = 500000 ether;
    uint256 public constant PRICE_FIVE_TOKENS = 1000000 ether;
    uint256 public constant PRICE_Eight_TOKENS = 1500000 ether;
    uint256 public constant THIRTEEN_PLS_PRICE = 2000000 ether;

    address public HEX_TOKEN_ADDRESS;
    address public TEXAN_TOKEN_ADDRESS;
    address public REX_TOKEN_ADDRESS;
    address public LOAN_TOKEN_ADDRESS;
    address public PTGC_TOKEN_ADDRESS;
    address public WATT_TOKEN_ADDRESS;

    address payable public paymentAddress;

    event TokensBought(address indexed buyer, uint256 quantity, uint256 cost);
    event HolderAdded(address indexed holder);

    constructor(
        address _HEX_TOKEN_ADDRESS,
        address _TEXAN_TOKEN_ADDRESS,
        address _REX_TOKEN_ADDRESS,
        address _LOAN_TOKEN_ADDRESS,
        address _PTGC_TOKEN_ADDRESS,
        address _WATT_TOKEN_ADDRESS,
        address payable _paymentAddress,
        string memory tokenName,
        string memory SymbolOfToken
    ) ERC20(tokenName, SymbolOfToken) Ownable(msg.sender) {
        HEX_TOKEN_ADDRESS = _HEX_TOKEN_ADDRESS;
        TEXAN_TOKEN_ADDRESS = _TEXAN_TOKEN_ADDRESS;
        REX_TOKEN_ADDRESS = _REX_TOKEN_ADDRESS;
        LOAN_TOKEN_ADDRESS = _LOAN_TOKEN_ADDRESS;
        PTGC_TOKEN_ADDRESS = _PTGC_TOKEN_ADDRESS;
        WATT_TOKEN_ADDRESS = _WATT_TOKEN_ADDRESS;
        paymentAddress = _paymentAddress;
    }

    modifier validQuantity(uint256 quantity, uint256 expectedQuantity) {
        require(quantity == expectedQuantity, "Invalid token quantity");
        _;
    }

    modifier validCost(uint256 cost) {
        require(msg.value == cost, "Incorrect Ether amount sent");
        _;
    }

    modifier withinMintLimit(uint256 mintedAmount, uint256 maxSupply) {
        require(mintedAmount + (1 ether) <= maxSupply, "Exceeds minting limit");
        _;
    }

    function _symbol() public view returns (string memory) {
        return symbol();
    }

    function _name() public view returns (string memory) {
        return name();
    }

    function _mintAndNotify(uint256 quantity, uint256 cost) internal {
        _mint(msg.sender, quantity * 10 ** 18);
        emit TokensBought(msg.sender, quantity, cost);
    }

    function _processPayment(uint256 cost) internal {
        (bool success, ) = paymentAddress.call{value: cost}("");
        require(success, "Ether transfer failed");
    }

    function _addHolder(address holder) internal {
        if (!isHolder[holder]) {
            isHolder[holder] = true;
            holders.push(holder);
            emit HolderAdded(holder);
        }
    }

    function MintTwoPLSTokens(
        uint256 quantity
    )
        public
        payable
        nonReentrant
        validQuantity(quantity, 2)
        validCost(PRICE_TWO_TOKEN)
        withinMintLimit(PLSTWOTokenMinted, MAX_TWO_PLS_SUPPLY)
    {
        uint256 amountToMint = quantity * 10 ** 18;
        PLSTWOTokenMinted += amountToMint;
        _addHolder(msg.sender);
        _processPayment(PRICE_TWO_TOKEN);
        _mintAndNotify(quantity, PRICE_TWO_TOKEN);
    }

    function MintFivePLSTokens(
        uint256 quantity
    )
        public
        payable
        nonReentrant
        validQuantity(quantity, 5)
        validCost(PRICE_FIVE_TOKENS)
        withinMintLimit(PLSFIVETokenMinted, MAX_FIVE_PLS_SUPPLY)
    {
        uint256 amountToMint = quantity * 10 ** 18;
        PLSFIVETokenMinted += amountToMint;
        _addHolder(msg.sender);
        _processPayment(PRICE_FIVE_TOKENS);
        _mintAndNotify(quantity, PRICE_FIVE_TOKENS);
    }

    function MintEightPLSTokens(
        uint256 quantity
    )
        public
        payable
        nonReentrant
        validQuantity(quantity, 8)
        validCost(PRICE_Eight_TOKENS)
        withinMintLimit(PLSEightTokenMinted, MAX_Eight_PLS_SUPPLY)
    {
        uint256 amountToMint = quantity * 10 ** 18;
        PLSEightTokenMinted += amountToMint;
        _addHolder(msg.sender);
        _processPayment(PRICE_Eight_TOKENS);
        _mintAndNotify(quantity, PRICE_Eight_TOKENS);
    }

    function MintThirteenPLSTokens(
        uint256 quantity
    )
        public
        payable
        nonReentrant
        validQuantity(quantity, 13)
        validCost(THIRTEEN_PLS_PRICE)
        withinMintLimit(PLS_MINTED, MAX_SUPPLY_OF_THIRTEEN_PLS)
    {
        uint256 amountToMint = quantity * 10 ** 18;
        PLS_MINTED += amountToMint;
        _addHolder(msg.sender);
        _processPayment(THIRTEEN_PLS_PRICE);
        _mintAndNotify(quantity, THIRTEEN_PLS_PRICE);
    }

    function MintOneHEX(
        uint256 quantity
    ) public nonReentrant validQuantity(quantity, 1) {
        uint256 cost = HEX_ONE_TOKEN_PRICE;
        uint256 amountToMint = quantity * 10 ** 18;

        require(
            HEX_TOKENS_MINTED + amountToMint <= MAX_SUPPLY_OF_TOKENS,
            "Exceeds HEX minting limit"
        );

        IERC20 hex_token = IERC20(HEX_TOKEN_ADDRESS);

        HEX_TOKENS_MINTED += amountToMint;
        _addHolder(msg.sender);

        hex_token.safeTransferFrom(msg.sender, paymentAddress, cost);

        _mintAndNotify(quantity, cost);
    }

    function MintOneTEXAN(
        uint256 quantity
    ) public nonReentrant validQuantity(quantity, 1) {
        uint256 cost = TEXAN_ONE_TOKEN_PRICE;
        uint256 amountToMint = quantity * 10 ** 18;

        require(
            TEXAN_TOKENS_MINTED + amountToMint <= MAX_SUPPLY_OF_TOKENS,
            "Exceeds TEXAN minting limit"
        );

        IERC20 texan = IERC20(TEXAN_TOKEN_ADDRESS);

        TEXAN_TOKENS_MINTED += amountToMint;
        _addHolder(msg.sender);

        texan.safeTransferFrom(msg.sender, paymentAddress, cost);

        _mintAndNotify(quantity, cost);
    }

    function MintOneREX(
        uint256 quantity
    ) public nonReentrant validQuantity(quantity, 1) {
        uint256 cost = REX_ONE_TOKEN_PRICE;
        uint256 amountToMint = quantity * 10 ** 18;

        require(
            REX_TOKENS_MINTED + amountToMint <= MAX_SUPPLY_OF_TOKENS,
            "Exceeds REX minting limit"
        );

        IERC20 rex = IERC20(REX_TOKEN_ADDRESS);

        REX_TOKENS_MINTED += amountToMint;
        _addHolder(msg.sender);

        rex.safeTransferFrom(msg.sender, paymentAddress, cost);

        _mintAndNotify(quantity, cost);
    }

    function MintOneLOAN(
        uint256 quantity
    ) public nonReentrant validQuantity(quantity, 1) {
        uint256 cost = LOAN_ONE_TOKEN_PRICE;
        uint256 amountToMint = quantity * 10 ** 18;

        require(
            LOAN_TOKENS_MINTED + amountToMint <= MAX_SUPPLY_OF_TOKENS,
            "Exceeds LOAN minting limit"
        );

        IERC20 loan = IERC20(LOAN_TOKEN_ADDRESS);

        LOAN_TOKENS_MINTED += amountToMint;
        _addHolder(msg.sender);

        loan.safeTransferFrom(msg.sender, paymentAddress, cost);

        _mintAndNotify(quantity, cost);
    }

    function MintOnePTGC(
        uint256 quantity
    ) public nonReentrant validQuantity(quantity, 1) {
        uint256 cost = PTGC_ONE_TOKEN_PRICE;
        uint256 amountToMint = quantity * 10 ** 18;

        require(
            PTGC_TOKENS_MINTED + amountToMint <= MAX_SUPPLY_OF_TOKENS,
            "Exceeds PTGC minting limit"
        );

        IERC20 ptgc = IERC20(PTGC_TOKEN_ADDRESS);

        PTGC_TOKENS_MINTED += amountToMint;
        _addHolder(msg.sender);

        ptgc.safeTransferFrom(msg.sender, paymentAddress, cost);

        _mintAndNotify(quantity, cost);
    }

    function MintOneWATT(
        uint256 quantity
    ) public nonReentrant validQuantity(quantity, 1) {
        uint256 cost = WATT_ONE_TOKEN_PRICE;
        uint256 amountToMint = quantity * 10 ** 18;

        require(
            WATT_TOKENS_MINTED + amountToMint <= MAX_SUPPLY_OF_TOKENS,
            "Exceeds WATT minting limit"
        );

        IERC20 watt = IERC20(WATT_TOKEN_ADDRESS);

        WATT_TOKENS_MINTED += amountToMint;
        _addHolder(msg.sender);

        watt.safeTransferFrom(msg.sender, paymentAddress, cost);

        _mintAndNotify(quantity, cost);
    }

    function holdersLength() external view returns (uint256) {
        return holders.length;
    }

    function getLimitOfAllButtons()
        public
        view
        returns (uint256, uint256, uint256, uint256, uint256, uint256)
    {
        return (
            HEX_TOKENS_MINTED,
            TEXAN_TOKENS_MINTED,
            REX_TOKENS_MINTED,
            LOAN_TOKENS_MINTED,
            PTGC_TOKENS_MINTED,
            WATT_TOKENS_MINTED
        );
    }

    function holderAt(uint256 index) external view returns (address) {
        require(index < holders.length, "Index out of bounds");
        return holders[index];
    }
}
