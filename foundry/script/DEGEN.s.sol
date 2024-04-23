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
import "../src/DEGEN.sol";
import "../src/DEGEN.sol";

contract scriptDEGEN is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("OWNER_KEY");
        vm.startBroadcast(deployerPrivateKey);
        // Instantiate the DEGEN contract with an IPFS link as constructor argument
        DEGEN chalupa = new DEGEN( );


        // Log the deployed contract address
        console.log("\nDEGEN deployed at address: ", address(chalupa));
        vm.stopBroadcast();
    }
}
