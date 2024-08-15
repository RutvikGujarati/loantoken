// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract DAVTRADE is ERC20, Ownable, ReentrancyGuard {
    uint256 public constant MAX_SUPPLY_OF_TOKENS = 1000 ether;

    uint256 public constant MAX_TWO_PLS_SUPPLY = 440000 ether;
    uint256 public constant MAX_FIVE_PLS_SUPPLY = 250000 ether;
    uint256 public constant MAX_Eight_PLS_SUPPLY = 140000 ether;
    uint256 public constant MAX_SUPPLY_OF_THIRTEEN_PLS = 52888 ether;

    uint256 public NineMM_TOKENS_MINTED = 0;
    uint256 public NineInch_TOKENS_MINTED = 0;
    uint256 public PTS_TOKENS_MINTED = 0;
    uint256 public SPARK_TOKENS_MINTED = 0;
    uint256 public PRATE_TOKENS_MINTED = 0;
    uint256 public TONI_TOKENS_MINTED = 0;
    uint256 public PLS_MINTED = 0;
    uint256 public PLSTWOTokenMinted = 0;
    uint256 public PLSFIVETokenMinted = 0;
    uint256 public PLSEightTokenMinted = 0;

    mapping(address => bool) public isHolder;
    mapping(address => bool) private holdersMapping;
    address[] public holders;
    uint256 public constant NineMM_ONE_TOKEN_PRICE = 1500 ether;
    uint256 public constant NineInch_ONE_TOKEN_PRICE = 4000000 ether;
    uint256 public constant PTS_ONE_TOKEN_PRICE = 500 ether;
    uint256 public constant SPARK_ONE_TOKEN_PRICE = 1500 ether;
    uint256 public constant PRATE_ONE_TOKEN_PRICE = 10000000 ether;
    uint256 public constant TONI_ONE_TOKEN_PRICE = 21000 ether;
    uint256 public constant PRICE_TWO_TOKEN = 1250000 ether;
    uint256 public constant PRICE_FIVE_TOKENS = 2500000 ether;
    uint256 public constant PRICE_Eight_TOKENS = 4000000 ether;
    uint256 public constant THIRTEEN_PLS_PRICE = 5000000 ether;

    address public NineMM_TOKEN_ADDRESS;
    address public PLSX_TOKEN_ADDRESS;
    address public NineInch_TOKEN_ADDRESS;
    address public PTS_TOKEN_ADDRESS;
    address public SPARK_TOKEN_ADDRESS;
    address public PRATE_TOKEN_ADDRESS;
    address public TONI_TOKEN_ADDRESS;

    address payable public paymentAddress;

    event TokensBought(address indexed buyer, uint256 quantity, uint256 cost);

    event HolderAdded(address indexed holder);

    constructor(
        address _PLSX_TOKEN_ADDRESS,
        address _NineMM_TOKEN_ADDRESS,
        address _NineInch_TOKEN_ADDRESS,
        address _PTS_TOKEN_ADDRESS,
        address _SPARK_TOKEN_ADDRESS,
        address _PRATE_TOKEN_ADDRESS,
        address _TONI_TOKEN_ADDRESS,
        address payable _paymentAddress,
        string memory tokenName,
        string memory SymbolOfToken
    ) ERC20(tokenName, SymbolOfToken) Ownable(msg.sender) {
        PLSX_TOKEN_ADDRESS = _PLSX_TOKEN_ADDRESS;
        NineMM_TOKEN_ADDRESS = _NineMM_TOKEN_ADDRESS;
        NineInch_TOKEN_ADDRESS = _NineInch_TOKEN_ADDRESS;
        PTS_TOKEN_ADDRESS = _PTS_TOKEN_ADDRESS;
        SPARK_TOKEN_ADDRESS = _SPARK_TOKEN_ADDRESS;
        PRATE_TOKEN_ADDRESS = _PRATE_TOKEN_ADDRESS;
        TONI_TOKEN_ADDRESS = _TONI_TOKEN_ADDRESS;

        paymentAddress = _paymentAddress;
    }
    function _symbol() public view returns (string memory) {
        return symbol();
    }

    function _name() public view returns (string memory) {
        return name();
    }

    modifier validQuantity(uint256 quantity, uint256 requiredQuantity) {
        require(quantity == requiredQuantity, "Invalid token quantity");
        _;
    }

    function MintTwoPLSTokens(
        uint256 quantity
    ) public nonReentrant validQuantity(quantity, 2) {
        uint256 cost = PRICE_TWO_TOKEN;
        uint256 amountToMint = quantity * 10 ** 18;

        require(
            PLSTWOTokenMinted + amountToMint <= MAX_TWO_PLS_SUPPLY,
            "Exceeds PLS minting limit"
        );

        PLSTWOTokenMinted += amountToMint;
        _addHolder(msg.sender);

        IERC20 PLSX = IERC20(PLSX_TOKEN_ADDRESS);
        require(
            PLSX.transferFrom(msg.sender, paymentAddress, cost),
            "PTS transfer failed"
        );

        _mint(msg.sender, amountToMint);
        emit TokensBought(msg.sender, quantity, cost);
    }

    function MintFivePLSTokens(
        uint256 quantity
    ) public nonReentrant validQuantity(quantity, 5) {
        uint256 cost = PRICE_FIVE_TOKENS;

        uint256 amountToMint = quantity * 10 ** 18;

        require(
            PLSFIVETokenMinted + amountToMint <= MAX_FIVE_PLS_SUPPLY,
            "Exceeds PLS minting limit"
        );

        PLSFIVETokenMinted += amountToMint;
        _addHolder(msg.sender);

        // Transfer the received Ether to the payment address

        IERC20 PLSX = IERC20(PLSX_TOKEN_ADDRESS);
        require(
            PLSX.transferFrom(msg.sender, paymentAddress, cost),
            "PTS transfer failed"
        );

        _mint(msg.sender, quantity * 10 ** 18);
        emit TokensBought(msg.sender, quantity, cost);
    }

    function MintEightPLSTokens(
        uint256 quantity
    ) public nonReentrant validQuantity(quantity, 8) {
        uint256 cost = PRICE_Eight_TOKENS;

        uint256 amountToMint = quantity * 10 ** 18;

        require(
            PLSEightTokenMinted + amountToMint <= MAX_Eight_PLS_SUPPLY,
            "Exceeds PLS minting limit"
        );

        PLSEightTokenMinted += amountToMint;
        _addHolder(msg.sender);

        // Transfer the received Ether to the payment address

        IERC20 PLSX = IERC20(PLSX_TOKEN_ADDRESS);
        require(
            PLSX.transferFrom(msg.sender, paymentAddress, cost),
            "PTS transfer failed"
        );
        _mint(msg.sender, quantity * 10 ** 18);
        emit TokensBought(msg.sender, quantity, cost);
    }

    function MintThirteenPLSTokens(
        uint256 quantity
    ) public nonReentrant validQuantity(quantity, 13) {
        uint256 cost = THIRTEEN_PLS_PRICE;

        uint256 amountToMint = quantity * 10 ** 18;

        require(
            PLS_MINTED + amountToMint <= MAX_SUPPLY_OF_THIRTEEN_PLS,
            "Exceeds PLS minting limit"
        );

        PLS_MINTED += amountToMint;
        _addHolder(msg.sender);

        // Transfer the received Ether to the payment address

        IERC20 PLSX = IERC20(PLSX_TOKEN_ADDRESS);
        require(
            PLSX.transferFrom(msg.sender, paymentAddress, cost),
            "PTS transfer failed"
        );

        _mint(msg.sender, quantity * 10 ** 18);
        emit TokensBought(msg.sender, quantity, cost);
    }

    function MintOneNineMM(
        uint256 quantity
    ) public nonReentrant validQuantity(quantity, 1) {
        uint256 cost = NineMM_ONE_TOKEN_PRICE;

        uint256 amountToMint = quantity * 10 ** 18;

        require(
            NineMM_TOKENS_MINTED + amountToMint <= MAX_SUPPLY_OF_TOKENS,
            "Exceeds NineMM minting limit"
        );

        IERC20 nine_MM = IERC20(NineMM_TOKEN_ADDRESS);

        NineMM_TOKENS_MINTED += amountToMint;
        _addHolder(msg.sender);

        require(
            nine_MM.transferFrom(msg.sender, paymentAddress, cost),
            "NineMM transfer failed"
        );

        _mint(msg.sender, quantity * 10 ** 18);

        emit TokensBought(msg.sender, quantity, cost);
    }
    function MintOneNineInch(
        uint256 quantity
    ) public nonReentrant validQuantity(quantity, 1) {
        uint256 cost = NineInch_ONE_TOKEN_PRICE;

        uint256 amountToMint = quantity * 10 ** 18;

        require(
            NineInch_TOKENS_MINTED + amountToMint <= MAX_SUPPLY_OF_TOKENS,
            "Exceeds nine_Inch minting limit"
        );

        IERC20 nine_Inch = IERC20(NineInch_TOKEN_ADDRESS);

        NineInch_TOKENS_MINTED += amountToMint;
        _addHolder(msg.sender);

        require(
            nine_Inch.transferFrom(msg.sender, paymentAddress, cost),
            "NineInch transfer failed"
        );

        _mint(msg.sender, quantity * 10 ** 18);

        emit TokensBought(msg.sender, quantity, cost);
    }
    function MintOnePTS(
        uint256 quantity
    ) public nonReentrant validQuantity(quantity, 1) {
        uint256 cost = PTS_ONE_TOKEN_PRICE;

        uint256 amountToMint = quantity * 10 ** 18;

        require(
            PTS_TOKENS_MINTED + amountToMint <= MAX_SUPPLY_OF_TOKENS,
            "Exceeds PTS minting limit"
        );

        IERC20 pts = IERC20(PTS_TOKEN_ADDRESS);

        PTS_TOKENS_MINTED += amountToMint;
        _addHolder(msg.sender);

        require(
            pts.transferFrom(msg.sender, paymentAddress, cost),
            "PTS transfer failed"
        );

        _mint(msg.sender, quantity * 10 ** 18);

        emit TokensBought(msg.sender, quantity, cost);
    }
    function MintOneSPARK(
        uint256 quantity
    ) public nonReentrant validQuantity(quantity, 1) {
        uint256 cost = SPARK_ONE_TOKEN_PRICE;

        uint256 amountToMint = quantity * 10 ** 18;

        require(
            SPARK_TOKENS_MINTED + amountToMint <= MAX_SUPPLY_OF_TOKENS,
            "Exceeds SPARK minting limit"
        );

        IERC20 spark = IERC20(SPARK_TOKEN_ADDRESS);

        SPARK_TOKENS_MINTED += amountToMint;
        _addHolder(msg.sender);

        require(
            spark.transferFrom(msg.sender, paymentAddress, cost),
            "SPARK transfer failed"
        );

        _mint(msg.sender, quantity * 10 ** 18);

        emit TokensBought(msg.sender, quantity, cost);
    }
    function MintOnePRATE(
        uint256 quantity
    ) public nonReentrant validQuantity(quantity, 1) {
        uint256 cost = PRATE_ONE_TOKEN_PRICE;

        uint256 amountToMint = quantity * 10 ** 18;

        require(
            PRATE_TOKENS_MINTED + amountToMint <= MAX_SUPPLY_OF_TOKENS,
            "Exceeds prate minting limit"
        );

        IERC20 prate = IERC20(PRATE_TOKEN_ADDRESS);

        PRATE_TOKENS_MINTED += amountToMint;
        _addHolder(msg.sender);

        require(
            prate.transferFrom(msg.sender, paymentAddress, cost),
            "prate transfer failed"
        );

        _mint(msg.sender, quantity * 10 ** 18);

        emit TokensBought(msg.sender, quantity, cost);
    }
    function MintOneTONI(
        uint256 quantity
    ) public nonReentrant validQuantity(quantity, 1) {
        uint256 cost = TONI_ONE_TOKEN_PRICE;

        uint256 amountToMint = quantity * 10 ** 18;

        require(
            TONI_TOKENS_MINTED + amountToMint <= MAX_SUPPLY_OF_TOKENS,
            "Exceeds toni minting limit"
        );

        IERC20 toni = IERC20(TONI_TOKEN_ADDRESS);

        TONI_TOKENS_MINTED += amountToMint;
        _addHolder(msg.sender);

        require(
            toni.transferFrom(msg.sender, paymentAddress, cost),
            "TONIT transfer failed"
        );

        _mint(msg.sender, quantity * 10 ** 18);

        emit TokensBought(msg.sender, quantity, cost);
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

    function getLimitOfAllButtons()
        public
        view
        returns (uint256, uint256, uint256, uint256, uint256, uint256)
    {
        return (
            NineMM_TOKENS_MINTED,
            NineInch_TOKENS_MINTED,
            PTS_TOKENS_MINTED,
            SPARK_TOKENS_MINTED,
            PRATE_TOKENS_MINTED,
            TONI_TOKENS_MINTED
        );
    }

    function holderAt(uint256 index) external view returns (address) {
        require(index < holders.length, "Index out of bounds");
        return holders[index];
    }
}
