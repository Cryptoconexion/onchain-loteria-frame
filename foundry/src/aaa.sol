// SPDX-License-Identifier: LicenseRef-Proprietary
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";
import "@openzeppelin/contracts/access/AccessControl.sol"; // Import AccessControl

contract CarpinteroNFT is
    ERC721,
    IERC2981,
    Ownable,
    AccessControl // Add AccessControl to the inheritance list
{
    uint256 private _tokenIds;
    string private _contractURI;
    address private _royaltyRecipient;
    uint256 private _royaltyPercentage;
    mapping(uint256 => string) public tokenUri;

    bytes32 public constant AUTHORIZED_MINTER_ROLE = keccak256("AUTHORIZED_MINTER"); // Define a role for authorized
        // minters

    constructor(string memory contractURI_) ERC721("CarpinteroNFT Token", "CarpinteroNFT") Ownable(msg.sender) {
        _contractURI = contractURI_;
        _royaltyRecipient = owner(); // Default royalty recipient is the contract owner
        _royaltyPercentage = 1; // Default royalty is 1%
        grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        grantRole(AUTHORIZED_MINTER_ROLE, msg.sender);
        // deployer
    }

    // Override the function to check for the AUTHORIZED_MINTER_ROLE or ownership
    function mintNFT(address recipient) public returns (uint256) {
        require(
            hasRole(AUTHORIZED_MINTER_ROLE, msg.sender) || owner() == msg.sender,
            "CarpinteroNFT: Caller must have the AUTHORIZED_MINTER_ROLE or be the owner"
        );

        _tokenIds++;
        uint256 newItemId = _tokenIds;
        _mint(recipient, newItemId);
        return newItemId;
    }

    // Function to safely grant the AUTHORIZED_MINTER_ROLE
    function grantMinterRole(address minter) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Caller is not an admin");
        grantRole(AUTHORIZED_MINTER_ROLE, minter);
    }

    // Function to revoke the AUTHORIZED_MINTER_ROLE
    function revokeMinterRole(address minter) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Caller is not an admin");
        revokeRole(AUTHORIZED_MINTER_ROLE, minter);
    }

    function setContractURI(string memory contractURI_) public onlyOwner {
        _contractURI = contractURI_;
    }

    function contractURI() public view returns (string memory) {
        return _contractURI;
    }

    // EIP-2981 Royalty Info
    function setRoyaltyInfo(address recipient, uint256 percentage) public onlyOwner {
        _royaltyRecipient = recipient;
        _royaltyPercentage = percentage;
    }

    function royaltyInfo(
        uint256, /* tokenId */
        uint256 salePrice
    )
        external
        view
        override
        returns (address receiver, uint256 royaltyAmount)
    {
        royaltyAmount = (salePrice * _royaltyPercentage) / 100;
        return (_royaltyRecipient, royaltyAmount);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721, AccessControl, IERC165)
        returns (bool)
    {
        return interfaceId == type(IERC2981).interfaceId || super.supportsInterface(interfaceId);
    }
    // Override the tokenUri method to concatenate the base URI and the token ID
  

    // function _requireOwned(uint256 tokenId) internal view {
    //     require(_exists(tokenId), "ERC721: invalid token ID");
    // }
    // Override the tokenUri method to concatenate the base URI and the token ID

    function setTokenURI(uint256 _tokenId, string memory _uri) external onlyOwner {
        //   uri = ipfs://bafybeidu5fitri4z5pxzrrslrcj5jui3jpb4nhmcjos7fuzxnttl2wa67i/
        //   uri = htts://ipfs/bafybeidu5fitri4z5pxzrrslrcj5jui3jpb4nhmcjos7fuzxnttl2wa67i/
        tokenUri[_tokenId] = _uri;
        // emit URI(_uri, _tokenId);
    }
}
