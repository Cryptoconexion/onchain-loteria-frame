//  ██████╗ ███╗   ██╗ ██████╗██╗  ██╗ █████╗ ██╗███╗   ██╗
// ██╔═══██╗████╗  ██║██╔════╝██║  ██║██╔══██╗██║████╗  ██║
// ██║   ██║██╔██╗ ██║██║     ███████║███████║██║██╔██╗ ██║
// ██║   ██║██║╚██╗██║██║     ██╔══██║██╔══██║██║██║╚██╗██║
// ╚██████╔╝██║ ╚████║╚██████╗██║  ██║██║  ██║██║██║ ╚████║
//  ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝

// ██╗      ██████╗ ████████╗███████╗██████╗ ██╗ █████
// ██║     ██╔═══██╗╚══██╔══╝██╔════╝██╔══██╗██║██╔══██╗
// ██║     ██║   ██║   ██║   █████╗  ██████╔╝██║███████║
// ██║     ██║   ██║   ██║   ██╔══╝  ██╔══██╗██║██╔══██║
// ███████╗╚██████╔╝   ██║   ███████╗██║  ██║██║██║  ██║
// ╚══════╝ ╚═════╝    ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝

// SPDX-License-Identifier: MIT License
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title OnchainLoteria
 * @dev Implementation of a non-fungible token (NFT) for a lottery game.
 */
contract OnchainLoteria is
    ERC721,
    IERC2981,
    Ownable,
    AccessControl,
    ReentrancyGuard
{
    uint256 private _tokenIds;
    string private _contractURI;
    address private _royaltyRecipient;
    uint256 private _royaltyPercentage;
    mapping(uint256 => string) public tokenUri;

    bytes32 public constant AUTHORIZED_ROLE = keccak256("AUTHORIZED_ROLE");
    // State variable to store mint price
    uint256 public mintPrice = 0.00032 ether;

    // Discount rates in ten-thousandths (1e4) to avoid floating point numbers
    uint256 private constant BUNDLE_10_DISCOUNT = 1000; // Represents a 10% discount
    uint256 private constant BUNDLE_25_DISCOUNT = 2500; // Represents a 25% discount
    uint256 private constant BUNDLE_100_DISCOUNT = 5000; // Represents a 50% discount

    uint256[] private _boardlessTokens;

    /**
     * @notice Event emitted when the URI of a token is updated, providing transparency and traceability.
     */
    event URIUpdated(string _uri, uint256 indexed _tokenId);

    // Define an event for the airdrop
    event AirdropMint(address indexed recipient, uint256 indexed tokenId);

    /**
     * @notice Initializes the contract with specified metadata and sets the royalty recipient to the contract owner.
     * @param contractURI_ The URI for the contract metadata, describing the project.
     */
    constructor(
        string memory contractURI_
    ) ERC721("Onchain Loteria", "Onchain Loteria") Ownable(msg.sender) {
        _contractURI = contractURI_; // Set the URI for contract-level metadata
        _royaltyRecipient = owner(); // Assign the contract owner as the recipient of royalties
        _royaltyPercentage = 1; // Set a default royalty percentage of 1%

        // Grant the contract owner the AUTHORIZED_ROLE, allowing them to perform privileged actions within the contract.
        _grantRole(AUTHORIZED_ROLE, owner());


    }

    /**
     * @notice Mints NFTs in batches with quantity-based discounts and requires exact payment.
     * @param quantity The number of NFTs to mint at once.
     */
    function mintNFT(uint256 quantity) public payable nonReentrant {
        uint256 totalPrice = getTotalPrice(quantity);
        require(
            msg.value == totalPrice,
            "Please submit the exact minting fee for the bundle."
        );
        require(msg.sender != address(0), "Cannot mint to the zero address.");

        for (uint256 i = 0; i < quantity; i++) {
            _tokenIds++;
            uint256 newItemId = _tokenIds;
            _mint(msg.sender, newItemId);
            _boardlessTokens.push(newItemId);
        }
    }

    /**
     * @notice Allows authorized roles to set the mint price for NFTs, ensuring only privileged users can alter economic parameters.
     * @param _newMintPrice The new mint price per NFT.
     */
    function setMintPrice(
        uint256 _newMintPrice
    ) public onlyRole(AUTHORIZED_ROLE) nonReentrant {
        // Additional access control, such as onlyRole(AUTHORIZED_ROLE), can be added here
        mintPrice = _newMintPrice;
    }

    /**
     * @notice Airdrops an NFT to a specified player address, restricted to authorized roles.
     * @param _player The recipient address for the airdropped NFT.
     */
    function airdrop(
        address _player
    ) public onlyRole(AUTHORIZED_ROLE) nonReentrant {
        require(_player != address(0), "Cannot mint to the zero address.");

        _tokenIds++;
        uint256 newItemId = _tokenIds;
        _mint(_player, newItemId);
        _boardlessTokens.push(newItemId);

        // Emit the AirdropMint event
        emit AirdropMint(_player, newItemId);
    }

    /**
     * @notice Calculates the total price for a specified quantity of NFTs, accounting for bulk purchase discounts.
     * @param quantity Number of NFTs intended for purchase.
     * @return totalPrice Total cost for the specified number of NFTs, after discounts.
     */
    function getTotalPrice(
        uint256 quantity
    ) public view returns (uint256 totalPrice) {
        uint256 pct_dnom = 10000;
        if (quantity == 10) {
            return
                (mintPrice * quantity * (pct_dnom - BUNDLE_10_DISCOUNT)) /
                pct_dnom;
        } else if (quantity == 25) {
            return
                (mintPrice * quantity * (pct_dnom - BUNDLE_25_DISCOUNT)) /
                pct_dnom;
        } else if (quantity == 100) {
            return
                (mintPrice * quantity * (pct_dnom - BUNDLE_100_DISCOUNT)) /
                pct_dnom;
        } else if (quantity == 1) {
            return mintPrice * quantity;
        }
        revert("Invalid quantity");
    }

    /**
     * @notice Allows authorized roles to update the metadata URI for a specific token, facilitating dynamic content updates.
     * @param _tokenId The unique identifier for the token.
     * @param _uri The new metadata URI for the token.
     */
    function setTokenURI(
        uint256 _tokenId,
        string memory _uri
    ) external onlyRole(AUTHORIZED_ROLE) nonReentrant {
        for (uint256 i = 0; i < _boardlessTokens.length; i++) {
            if (_boardlessTokens[i] == _tokenId) {
                _boardlessTokens[i] = _boardlessTokens[
                    _boardlessTokens.length - 1
                ];
                _boardlessTokens.pop();
            }
        }

        tokenUri[_tokenId] = _uri;
        emit URIUpdated(_uri, _tokenId);
    }

    /**
     * @notice Sets the URI for the overall contract metadata, describing the NFT collection and its features.
     * @param contractURI_ The new URI to set for the contract metadata.
     */
    function setContractURI(
        string memory contractURI_
    ) public onlyRole(AUTHORIZED_ROLE) nonReentrant {
        _contractURI = contractURI_;
    }

    /**
     * @notice Retrieves the current metadata URI for the contract.
     * @return The URI string that points to the metadata of the contract.
     */
    function contractURI() public view returns (string memory) {
        return _contractURI;
    }

    /**
     * @notice Returns royalty information for any sale of the NFTs, compliant with EIP-2981 standards.
     * @param salePrice The sale price of the NFT from which the royalty is calculated.
     * @return receiver The address entitled to receive the royalties.
     * @return royaltyAmount The amount of royalties to be paid out.
     */
    function royaltyInfo(
        uint256, // tokenId is not used in this case
        uint256 salePrice
    ) external view override returns (address receiver, uint256 royaltyAmount) {
        royaltyAmount = (salePrice * _royaltyPercentage) / 100;
        return (_royaltyRecipient, royaltyAmount);
    }

    /**
     * @notice Sets the recipient and percentage for royalties, modifying the economic inflows from secondary sales.
     * @param recipient The address to receive the royalties.
     * @param percentage The percentage of each sale price allocated to the royalty.
     */ function setRoyaltyInfo(
        address recipient,
        uint256 percentage
    ) public onlyRole(AUTHORIZED_ROLE) nonReentrant {
        _royaltyRecipient = recipient;
        _royaltyPercentage = percentage;
    }

    /**
     * @notice Overrides the supportsInterface method to accommodate the identification of supported interfaces, such as ERC721 and ERC2981.
     */ function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        virtual
        override(ERC721, AccessControl, IERC165)
        returns (bool)
    {
        return
            interfaceId == type(IERC2981).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    /**
     * @notice Retrieves the URI for a specific token, providing the metadata that describes the token's properties.
     * @param _tokenId The identifier for the token.
     * @return The URI string that provides access to the token's metadata.
     */ function tokenURI(
        uint256 _tokenId
    ) public view override returns (string memory) {
        return tokenUri[_tokenId];
    }

    /**
     * @notice Retrieves the URI for a specific token, providing the metadata that describes the token's properties.
     * @param tokenId The identifier for the token.
     * @return The URI string that provides access to the token's metadata.
     */ function uri(uint256 tokenId) public view returns (string memory) {
        return tokenUri[tokenId];
    }

    /**
     * @notice Manages authorized addresses, allowing the owner to grant or revoke access to specific functionalities.
     * @param authorizedAddress The address to grant authorization.
     */ function addAuthorizedAddress(
        address authorizedAddress
    ) external onlyOwner nonReentrant {
        _grantRole(AUTHORIZED_ROLE, authorizedAddress);
    }

    function grantRole(
        bytes32 role,
        address account
    ) public virtual override onlyRole(getRoleAdmin(role)) {
        _grantRole(role, account);
    }

    function revokeRole(
        bytes32 role,
        address account
    ) public virtual override onlyRole(getRoleAdmin(role)) {
        _revokeRole(role, account);
    }

    /**
     * @notice Revokes an authorization, removing previously granted permissions.
     * @param authorizedAddress The address to remove authorization from.
     */
    function removeAuthorizedAddress(
        address authorizedAddress
    ) external onlyRole(AUTHORIZED_ROLE) nonReentrant {
        _revokeRole(AUTHORIZED_ROLE, authorizedAddress);
    }

    /**
     * @notice Checks if an address is authorized to perform certain actions within the contract.
     * @param authorizedAddress The address to check for authorization.
     * @return True if the address has the specified role, otherwise false.
     */
    function hasAuthorizedAddress(
        address authorizedAddress
    ) external view returns (bool) {
        return hasRole(AUTHORIZED_ROLE, authorizedAddress);
    }

    // Method to retrieve boardless tokens.
    function getBoardlessTokens() public view returns (uint256[] memory) {
        return _boardlessTokens;
    }

    /**
     * @notice Allows the withdrawal of contract funds by authorized roles, transferring the balance to the contract owner.
     */
    function withdraw() external onlyRole(AUTHORIZED_ROLE) nonReentrant {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ether left to withdraw");

        // Transfer the balance to the owner
        (bool success, ) = owner().call{value: balance}("");
        require(success, "Transfer failed.");
    }

      /**
     * @notice Get the total supply of NFTs minted
     * @return The total number of NFTs minted
     */
     function totalSupply() public view returns (uint256) {
        return _tokenIds;  // Return the current value of _tokenIds, representing the total supply
    }
}
