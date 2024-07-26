// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

interface IPDXN {
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);
}

interface IpFENIX {
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);
}

contract DAVTOKEN is ERC20, Ownable {
    /// @title Max Supply of pFENIX, pDXN and PLS
    // / @author
    /// @notice It is a limit of minting tokens.

    uint256 public constant PFENIX_MAX_SUPPLY = 111 ether;
    uint256 public constant MAX_PDXN_SUPPLY = 277 ether;
    uint256 public constant MAX_TWO_PLS_SUPPLY = 440000 ether;
    uint256 public constant MAX_FIVE_PLS_SUPPLY = 250000 ether;
    uint256 public constant MAX_Eight_PLS_SUPPLY = 140000 ether;
    uint256 public constant MAX_Thirteen_PLS_SUPPLY = 58500 ether;

    // total minted tokens.
    uint256 public pdxnMinted = 0;
    uint256 public pFENIXMinted = 0;
    uint256 public PLSTWOTokenMinted = 0;
    uint256 public PLSFIVETokenMinted = 0;
    uint256 public PLSEightTokenMinted = 0;
    uint256 public PLSThirteenTokenMinted = 0;

    mapping(address => bool) public isHolder;
    address[] public holders;
    // PFENIX and PDXN buy one token
    uint256 public PFENIX_PRICE_ONE_TOKEN = 5000000 ether;
    uint256 public PDXN_PRICE_ONE_TOKEN = 450 ether;

    // PLS mint cose
    uint256 public PRICE_TWO_TOKEN = 500000 ether;
    uint256 public PRICE_FIVE_TOKENS = 1000000 ether;
    uint256 public PRICE_Eight_TOKENS = 1500000 ether;
    uint256 public PRICE_THIRTEEN_TOKENS = 2000000 ether;

    address public PDXN_TOKEN_ADDRESS;
    address public pFENIX_TOKEN_ADDRESS;
    address payable public paymentAddress;

    event TokensBought(address indexed buyer, uint256 quantity, uint256 cost);
    event TokensMintedWithPDXN(
        address indexed minter,
        uint256 quantity,
        uint256 cost
    );
    event HolderAdded(address indexed holder);

    event PDXNPricesSet(
        uint256 priceTwoTokens,
        uint256 priceFiveTokens,
        uint256 priceThirteenTokens
    );

    constructor(
        address _PDXN_TOKEN_ADDRESS,
        address pFNIX_TOKEN_ADDRESS,
        address payable _paymentAddress
    ) ERC20("DAVPLS", "DAVPLS") Ownable(msg.sender) {
        PDXN_TOKEN_ADDRESS = _PDXN_TOKEN_ADDRESS;
        pFENIX_TOKEN_ADDRESS = pFNIX_TOKEN_ADDRESS;
        paymentAddress = _paymentAddress;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
        _addHolder(to);
    }

    function MintTwoPLSTokens(uint256 quantity) public payable {
        uint256 cost;
        if (quantity == 2) {
            cost = PRICE_TWO_TOKEN;
        } else {
            revert("Invalid token quantity");
        }
        uint256 amountToMint = quantity * 10 ** 18;

        require(msg.value == cost, "Incorrect Ether amount sent");
        require(
            PLSTWOTokenMinted + amountToMint <= MAX_TWO_PLS_SUPPLY,
            "Exceeds PLS minting limit"
        );

        _mint(msg.sender, quantity * 10 ** 18);

        PLSTWOTokenMinted += amountToMint;
        _addHolder(msg.sender);

        // Transfer the received Ether to the payment address
        (bool success, ) = paymentAddress.call{value: msg.value}("");
        require(success, "Ether transfer failed");

        emit TokensBought(msg.sender, quantity, cost);
    }

    function MintFivePLSTokens(uint256 quantity) public payable {
        uint256 cost;
        if (quantity == 5) {
            cost = PRICE_FIVE_TOKENS;
        } else {
            revert("Invalid token quantity");
        }
        uint256 amountToMint = quantity * 10 ** 18;

        require(msg.value == cost, "Incorrect Ether amount sent");
        require(
            PLSFIVETokenMinted + amountToMint <= MAX_FIVE_PLS_SUPPLY,
            "Exceeds PLS minting limit"
        );

        _mint(msg.sender, quantity * 10 ** 18);

        PLSFIVETokenMinted += amountToMint;
        _addHolder(msg.sender);

        // Transfer the received Ether to the payment address
        (bool success, ) = paymentAddress.call{value: msg.value}("");
        require(success, "Ether transfer failed");

        emit TokensBought(msg.sender, quantity, cost);
    }

    uint256 public DUMMY_PRICE = 500 ether;

    function mintWithLoan(uint256 quantity) public {
        uint256 cost;
        if (quantity == 2) {
            cost = DUMMY_PRICE;
        } else if (quantity == 5) {
            cost = DUMMY_PRICE;
        } else if (quantity == 8) {
            cost = DUMMY_PRICE;
        } else if (quantity == 13) {
            cost = DUMMY_PRICE;
        } else {
            revert("Invalid token quantity");
        }

        uint256 amountToMint = quantity * 10 ** 18;
        require(
            pdxnMinted + amountToMint <= MAX_PDXN_SUPPLY,
            "Exceeds pDXN minting limit"
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

    function MintEightPLSTokens(uint256 quantity) public payable {
        uint256 cost;
        if (quantity == 8) {
            cost = PRICE_Eight_TOKENS;
        } else {
            revert("Invalid token quantity");
        }
        uint256 amountToMint = quantity * 10 ** 18;

        require(msg.value == cost, "Incorrect Ether amount sent");
        require(
            PLSEightTokenMinted + amountToMint <= MAX_Eight_PLS_SUPPLY,
            "Exceeds PLS minting limit"
        );

        _mint(msg.sender, quantity * 10 ** 18);

        PLSEightTokenMinted += amountToMint;
        _addHolder(msg.sender);

        // Transfer the received Ether to the payment address
        (bool success, ) = paymentAddress.call{value: msg.value}("");
        require(success, "Ether transfer failed");

        emit TokensBought(msg.sender, quantity, cost);
    }

    function MintThirteenPLSTokens(uint256 quantity) public payable {
        uint256 cost;
        if (quantity == 13) {
            cost = PRICE_THIRTEEN_TOKENS;
        } else {
            revert("Invalid token quantity");
        }
        uint256 amountToMint = quantity * 10 ** 18;

        require(msg.value == cost, "Incorrect Ether amount sent");
        require(
            PLSThirteenTokenMinted + amountToMint <= MAX_Thirteen_PLS_SUPPLY,
            "Exceeds PLS minting limit"
        );

        _mint(msg.sender, quantity * 10 ** 18);

        PLSThirteenTokenMinted += amountToMint;
        _addHolder(msg.sender);

        // Transfer the received Ether to the payment address
        (bool success, ) = paymentAddress.call{value: msg.value}("");
        require(success, "Ether transfer failed");

        emit TokensBought(msg.sender, quantity, cost);
    }

    function MintWIthPFNIX(uint256 quantity) public {
        uint256 cost;
        if (quantity == 1) {
            cost = PFENIX_PRICE_ONE_TOKEN;
        } else {
            revert("Invalid token quantity");
        }
        uint256 amountToMint = quantity * 10 ** 18;

        require(
            pFENIXMinted + amountToMint <= PFENIX_MAX_SUPPLY,
            "Exceeds pFENIX minting limit"
        );

        IpFENIX pFNIXToken = IpFENIX(pFENIX_TOKEN_ADDRESS);
        require(
            pFNIXToken.transferFrom(msg.sender, paymentAddress, cost),
            "pFENIX transfer failed"
        );
        _mint(msg.sender, quantity * 10 ** 18);
        pFENIXMinted += amountToMint;

        _addHolder(msg.sender);

        emit TokensBought(msg.sender, quantity, cost);
    }

    function mintWithPDXN(uint256 quantity) public {
        uint256 cost;
        if (quantity == 1) {
            cost = PDXN_PRICE_ONE_TOKEN;
        } else {
            revert("Invalid token quantity");
        }

        uint256 amountToMint = quantity * 10 ** 18;
        require(
            pdxnMinted + amountToMint <= MAX_PDXN_SUPPLY,
            "Exceeds pDXN minting limit"
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
            pdxnMinted,
            pFENIXMinted,
            PLSTWOTokenMinted,
            PLSFIVETokenMinted,
            PLSEightTokenMinted,
            PLSThirteenTokenMinted
        );
    }

    function holderAt(uint256 index) external view returns (address) {
        require(index < holders.length, "Index out of bounds");
        return holders[index];
    }
}
