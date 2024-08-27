// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract DAVTOKEN is ERC20, Ownable, ReentrancyGuard {
    // -> Max Supply of bFENIX, pDXN and BNB

    uint256 public constant PFENIX_MAX_SUPPLY = 111 ether;
    uint256 public constant MAX_PDXN_SUPPLY = 277 ether;
    uint256 public constant MAX_TWO_BNB_SUPPLY = 440000 ether;
    uint256 public constant MAX_FIVE_BNB_SUPPLY = 250000 ether;
    uint256 public constant MAX_Eight_BNB_SUPPLY = 140000 ether;
    uint256 public constant MAX_Thirteen_BNB_SUPPLY = 58500 ether;

    // total minted tokens.
    uint256 public bPDXNminted = 0;
    uint256 public bPFENIXminted = 0;
    uint256 public BNBTWOTokenMinted = 0;
    uint256 public BNBFIVETokenMinted = 0;
    uint256 public BNBEightTokenMinted = 0;
    uint256 public BNBThirteenTokenMinted = 0;

    mapping(address => bool) public isHolder;
    address[] public holders;
    // PFENIX and PDXN buy one token
    uint256 public constant BPFENIX_PRICE_ONE_TOKEN = 750000 ether;
    uint256 public constant BDXN_PRICE_ONE_TOKEN = 5000 ether;

    // BNB mint cose
    uint256 public constant PRICE_TWO_TOKEN = 0.10 ether;
    uint256 public constant PRICE_FIVE_TOKENS = 0.20 ether;
    uint256 public constant PRICE_Eight_TOKENS = 0.30 ether;
    uint256 public constant PRICE_THIRTEEN_TOKENS = 0.40 ether;

    address public BDXN_TOKEN_ADDRESS;
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
        address _BDXN_TOKEN_ADDRESS,
        address pFNIX_TOKEN_ADDRESS,
        address payable _paymentAddress,
        string memory tokenName,
        string memory SymbolOfToken
    ) ERC20(tokenName, SymbolOfToken) Ownable(msg.sender) {
        BDXN_TOKEN_ADDRESS = _BDXN_TOKEN_ADDRESS;
        bFENIX_TOKEN_ADDRESS = pFNIX_TOKEN_ADDRESS;
        paymentAddress = _paymentAddress;
    }

    function _symbol() public view returns (string memory) {
        return symbol();
    }

    function _name() public view returns (string memory) {
        return name();
    }

    function approve()public {
        
    }

    function MintTwoBNBTokens(uint256 quantity) public payable nonReentrant {
        uint256 cost;
        if (quantity == 2) {
            cost = PRICE_TWO_TOKEN;
        } else {
            revert("Invalid token quantity");
        }
        uint256 amountToMint = quantity * 10 ** 18;

        require(msg.value == cost, "Incorrect Ether amount sent");
        require(
            BNBTWOTokenMinted + amountToMint <= MAX_TWO_BNB_SUPPLY,
            "Exceeds BNB minting limit"
        );

        BNBTWOTokenMinted += amountToMint;
        _addHolder(msg.sender);

        // Transfer the received Ether to the payment address
        (bool success, ) = paymentAddress.call{value: msg.value}("");
        require(success, "Ether transfer failed");

        _mint(msg.sender, quantity * 10 ** 18);
        emit TokensBought(msg.sender, quantity, cost);
    }

    function MintFiveBNBTokens(uint256 quantity) public payable nonReentrant {
        uint256 cost;
        if (quantity == 5) {
            cost = PRICE_FIVE_TOKENS;
        } else {
            revert("Invalid token quantity");
        }
        uint256 amountToMint = quantity * 10 ** 18;

        require(msg.value == cost, "Incorrect Ether amount sent");
        require(
            BNBFIVETokenMinted + amountToMint <= MAX_FIVE_BNB_SUPPLY,
            "Exceeds BNB minting limit"
        );

        BNBFIVETokenMinted += amountToMint;
        _addHolder(msg.sender);

        // Transfer the received Ether to the payment address
        (bool success, ) = paymentAddress.call{value: msg.value}("");
        require(success, "Ether transfer failed");

        _mint(msg.sender, quantity * 10 ** 18);
        emit TokensBought(msg.sender, quantity, cost);
    }

    function MintEightBNBTokens(uint256 quantity) public payable nonReentrant {
        uint256 cost;
        if (quantity == 8) {
            cost = PRICE_Eight_TOKENS;
        } else {
            revert("Invalid token quantity");
        }
        uint256 amountToMint = quantity * 10 ** 18;

        require(msg.value == cost, "Incorrect Ether amount sent");
        require(
            BNBEightTokenMinted + amountToMint <= MAX_Eight_BNB_SUPPLY,
            "Exceeds BNB minting limit"
        );

        BNBEightTokenMinted += amountToMint;
        _addHolder(msg.sender);

        // Transfer the received Ether to the payment address
        (bool success, ) = paymentAddress.call{value: msg.value}("");
        require(success, "Ether transfer failed");

        _mint(msg.sender, quantity * 10 ** 18);
        emit TokensBought(msg.sender, quantity, cost);
    }

    function MintThirteenBNBTokens(
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
            BNBThirteenTokenMinted + amountToMint <= MAX_Thirteen_BNB_SUPPLY,
            "Exceeds BNB minting limit"
        );

        BNBThirteenTokenMinted += amountToMint;
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
            cost = BPFENIX_PRICE_ONE_TOKEN;
        } else {
            revert("Invalid token quantity");
        }
        uint256 amountToMint = quantity * 10 ** 18;

        require(
            bPFENIXminted + amountToMint <= PFENIX_MAX_SUPPLY,
            "Exceeds bFENIX minting limit"
        );

        IERC20 bPFNIXToken = IERC20(bFENIX_TOKEN_ADDRESS);

        bPFENIXminted += amountToMint;
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
            cost = BDXN_PRICE_ONE_TOKEN;
        } else {
            revert("Invalid token quantity");
        }

        uint256 amountToMint = quantity * 10 ** 18;
        require(
            bPDXNminted + amountToMint <= MAX_PDXN_SUPPLY,
            "Exceeds pDXN minting limit"
        );

        IERC20 bdxnToken = IERC20(BDXN_TOKEN_ADDRESS);

        bPDXNminted += amountToMint;
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
            bPDXNminted,
            bPFENIXminted,
            BNBTWOTokenMinted,
            BNBFIVETokenMinted,
            BNBEightTokenMinted,
            BNBThirteenTokenMinted
        );
    }

    function holderAt(uint256 index) external view returns (address) {
        require(index < holders.length, "Index out of bounds");
        return holders[index];
    }
}
