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

import "forge-std/src/Script.sol";
import "forge-std/src/console.sol";
import "../src/OnchainLoteria.sol";

contract scriptOnchainLoteria is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("OWNER_KEY");
        vm.startBroadcast(deployerPrivateKey);
        // Instantiate the OnchainLoteria contract with an IPFS link as constructor argument
        OnchainLoteria chalupa = new OnchainLoteria(
           "https://onchainloteria.mypinata.cloud/ipfs/QmdMuj2WDFoFkVKWFv7NkGFxfZMQReyK1u6NJDaYxUrvGP"
        );

        // Add authorized addresses to the contract
        chalupa.addAuthorizedAddress(
            0xdA2Ce3E297ecCDb08610720835795eEF97A60a37
        );
        chalupa.addAuthorizedAddress(
            0x35BB6B2757C004A1662e83FdA9a034f4aFbBEdb3
        );


        // Log the deployed contract address
        console.log("\nOnchainLoteria deployed at address: ", address(chalupa));
        vm.stopBroadcast();
    }
}
