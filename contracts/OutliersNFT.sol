//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@gsgalloway/solidity-erc721-transfer-restricted/contracts/ERC721TransferRestricted.sol";

contract OutliersNFT is ERC721TransferRestricted {
    constructor(address admin, string memory name, string memory symbol) ERC721TransferRestricted(admin, name, symbol) {}
}
