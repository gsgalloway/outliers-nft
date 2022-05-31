//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@gsgalloway/solidity-erc721-transfer-restricted/contracts/ERC721TransferRestricted.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract OutliersNFT is ERC721TransferRestricted {
    using Counters for Counters.Counter;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER");
    Counters.Counter private _tokenIdTracker;    

    constructor(address admin, string memory name, string memory symbol) ERC721TransferRestricted(admin, name, symbol) {}

    function mint() public virtual {
        require(hasRole(MINTER_ROLE, _msgSender()), "OutliersNFT: must have minter role to mint");
        
        _revokeRole(MINTER_ROLE, _msgSender());

        _mint(_msgSender(), _tokenIdTracker.current());
        _tokenIdTracker.increment();
    }
}
