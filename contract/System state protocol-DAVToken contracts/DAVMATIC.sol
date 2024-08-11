// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract DAVMATIC is ERC20, Ownable, ReentrancyGuard {
    // -> Max Supply of bFENIX, bDXN and POLYGON

    uint256 public constant MFENIX_MAX_SUPPLY = 111 ether;
    uint256 public constant MAX_MDXN_SUPPLY = 277 ether;
    uint256 public constant MAX_TWO_POLYGON_SUPPLY = 440000 ether;
    uint256 public constant MAX_FIVE_POLYGON_SUPPLY = 250000 ether;
    uint256 public constant MAX_Eight_POLYGON_SUPPLY = 140000 ether;
    uint256 public constant MAX_Thirteen_POLYGON_SUPPLY = 58500 ether;

    // total minted tokens.
    uint256 public mDXNminted = 0;
    uint256 public mFENIXminted = 0;
    uint256 public MATICTWOTokenMinted = 0;
    uint256 public MATICIVETokenMinted = 0;
    uint256 public MATICEightTokenMinted = 0;
    uint256 public MATICThirteenTokenMinted = 0;

    mapping(address => bool) public isHolder;
    address[] public holders;
    // PFENIX and PDXN buy one token
    uint256 public constant MFENIX_PRICE_ONE_TOKEN = 4000000 ether;
    uint256 public constant MDXN_PRICE_ONE_TOKEN = 2000 ether;

    // POLYGON mint cose
    uint256 public constant PRICE_TWO_TOKEN = 60 ether;
    uint256 public constant PRICE_FIVE_TOKENS = 120 ether;
    uint256 public constant PRICE_Eight_TOKENS = 180 ether;
    uint256 public constant PRICE_THIRTEEN_TOKENS = 240 ether;

    address public mDXN_TOKEN_ADDRESS;
    address public bFENIX_TOKEN_ADDRESS;
    address payable public paymentAddress;

    event TokensBought(address indexed buyer, uint256 quantity, uint256 cost);
    event TokensMintedWithBDXN(
        address indexed minter,
        uint256 quantity,
        uint256 cost
    );
    event HolderAdded(address indexed holder);

    constructor(
        address _mDXN_TOKEN_ADDRESS,
        address MFENIX_TOKEN_ADDRESS,
        address payable _paymentAddress,
        string memory tokenName,
        string memory SymbolOfToken
    ) ERC20(tokenName, SymbolOfToken) Ownable(msg.sender) {
        mDXN_TOKEN_ADDRESS = _mDXN_TOKEN_ADDRESS;
        bFENIX_TOKEN_ADDRESS = MFENIX_TOKEN_ADDRESS;
        paymentAddress = _paymentAddress;
    }

    function _symbol() public view returns (string memory) {
        return symbol();
    }

    function _name() public view returns (string memory) {
        return name();
    }
    function MintTwoPOLYGONTokens(
        uint256 quantity
    ) public payable nonReentrant {
        uint256 cost;
        if (quantity == 2) {
            cost = PRICE_TWO_TOKEN;
        } else {
            revert("Invalid token quantity");
        }
        uint256 amountToMint = quantity * 10 ** 18;

        require(msg.value == cost, "Incorrect Ether amount sent");
        require(
            MATICTWOTokenMinted + amountToMint <= MAX_TWO_POLYGON_SUPPLY,
            "Exceeds POLYGON minting limit"
        );

        MATICTWOTokenMinted += amountToMint;
        _addHolder(msg.sender);

        // Transfer the received Ether to the payment address
        (bool success, ) = paymentAddress.call{value: msg.value}("");
        require(success, "Ether transfer failed");

        _mint(msg.sender, quantity * 10 ** 18);
        emit TokensBought(msg.sender, quantity, cost);
    }

    function MintFivePOLYGONTokens(
        uint256 quantity
    ) public payable nonReentrant {
        uint256 cost;
        if (quantity == 5) {
            cost = PRICE_FIVE_TOKENS;
        } else {
            revert("Invalid token quantity");
        }
        uint256 amountToMint = quantity * 10 ** 18;

        require(msg.value == cost, "Incorrect Ether amount sent");
        require(
            MATICIVETokenMinted + amountToMint <= MAX_FIVE_POLYGON_SUPPLY,
            "Exceeds POLYGON minting limit"
        );

        MATICIVETokenMinted += amountToMint;
        _addHolder(msg.sender);

        // Transfer the received Ether to the payment address
        (bool success, ) = paymentAddress.call{value: msg.value}("");
        require(success, "Ether transfer failed");

        _mint(msg.sender, quantity * 10 ** 18);
        emit TokensBought(msg.sender, quantity, cost);
    }

    function MintEightPOLYGONTokens(
        uint256 quantity
    ) public payable nonReentrant {
        uint256 cost;
        if (quantity == 8) {
            cost = PRICE_Eight_TOKENS;
        } else {
            revert("Invalid token quantity");
        }
        uint256 amountToMint = quantity * 10 ** 18;

        require(msg.value == cost, "Incorrect Ether amount sent");
        require(
            MATICEightTokenMinted + amountToMint <= MAX_Eight_POLYGON_SUPPLY,
            "Exceeds POLYGON minting limit"
        );

        MATICEightTokenMinted += amountToMint;
        _addHolder(msg.sender);

        // Transfer the received Ether to the payment address
        (bool success, ) = paymentAddress.call{value: msg.value}("");
        require(success, "Ether transfer failed");

        _mint(msg.sender, quantity * 10 ** 18);
        emit TokensBought(msg.sender, quantity, cost);
    }

    function MintThirteenPOLYGONTokens(
        uint256 quantity
    ) public payable nonReentrant {
        uint256 cost;
        if (quantity == 13) {
            cost = PRICE_THIRTEEN_TOKENS;
        } else {
            revert("Invalid token quantity");
        }
        uint256 amountToMint = quantity * 10 ** 18;

        require(msg.value == cost, "Incorrect Ether amount sent");
        require(
            MATICThirteenTokenMinted + amountToMint <=
                MAX_Thirteen_POLYGON_SUPPLY,
            "Exceeds POLYGON minting limit"
        );

        MATICThirteenTokenMinted += amountToMint;
        _addHolder(msg.sender);

        // Transfer the received Ether to the payment address
        (bool success, ) = paymentAddress.call{value: msg.value}("");
        require(success, "Ether transfer failed");

        _mint(msg.sender, quantity * 10 ** 18);
        emit TokensBought(msg.sender, quantity, cost);
    }

    function MintWIthPFNIX(uint256 quantity) public nonReentrant {
        uint256 cost;
        if (quantity == 1) {
            cost = MFENIX_PRICE_ONE_TOKEN;
        } else {
            revert("Invalid token quantity");
        }
        uint256 amountToMint = quantity * 10 ** 18;

        require(
            mFENIXminted + amountToMint <= MFENIX_MAX_SUPPLY,
            "Exceeds bFENIX minting limit"
        );

        IERC20 bPFNIXToken = IERC20(bFENIX_TOKEN_ADDRESS);

        mFENIXminted += amountToMint;
        _addHolder(msg.sender);

        require(
            bPFNIXToken.transferFrom(msg.sender, paymentAddress, cost),
            "bFENIX transfer failed"
        );

        _mint(msg.sender, quantity * 10 ** 18);

        emit TokensBought(msg.sender, quantity, cost);
    }

    function mintWithBDXN(uint256 quantity) public nonReentrant {
        uint256 cost;
        if (quantity == 1) {
            cost = MDXN_PRICE_ONE_TOKEN;
        } else {
            revert("Invalid token quantity");
        }

        uint256 amountToMint = quantity * 10 ** 18;
        require(
            mDXNminted + amountToMint <= MAX_MDXN_SUPPLY,
            "Exceeds pDXN minting limit"
        );

        IERC20 bdxnToken = IERC20(mDXN_TOKEN_ADDRESS);

        mDXNminted += amountToMint;
        _addHolder(msg.sender);

        require(
            bdxnToken.transferFrom(msg.sender, paymentAddress, cost),
            "pDXN transfer failed"
        );

        _mint(msg.sender, amountToMint);

        emit TokensMintedWithBDXN(msg.sender, quantity, cost);
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
            mDXNminted,
            mFENIXminted,
            MATICTWOTokenMinted,
            MATICIVETokenMinted,
            MATICEightTokenMinted,
            MATICThirteenTokenMinted
        );
    }

    function holderAt(uint256 index) external view returns (address) {
        require(index < holders.length, "Index out of bounds");
        return holders[index];
    }
}
