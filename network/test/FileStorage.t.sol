// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {FileStorage} from "../src/FileStorage.sol";

contract FileTest is Test {
    FileStorage public fileStorage;

    function setUp() public {
        fileStorage = new FileStorage();
        fileStorage.store("Lurid",10,40,300,"pdf","n12838v219848x");
        fileStorage.store("Arcy",20,40,500,"xml","42b12x8czv9721");
    }

    function testStore() public {
        fileStorage.store("Larcy",30,60,1000,"exe","8cv7z8xbc58z7x");
        assertEq(fileStorage.searchByMetadata("Larcy",0,0,0,"")[0], "8cv7z8xbc58z7x");
    }

    function testHashFinder() public {
        assertEq(fileStorage.getFileByHash("n12838v219848x").metadata.name, "Lurid");
    }

    function testGetFileDetails() public {
        assertEq(fileStorage.getFileDetails(0).metadata.name, "Lurid");
    }

    function testSearch() public {
        assertEq(fileStorage.searchByMetadata("Lurid",0,40,0,"")[0], "n12838v219848x");
        assertEq(fileStorage.searchByMetadata("",0,0,0,"xml")[0], "42b12x8czv9721");
        assertEq(fileStorage.searchByMetadata("",0,40,0,"")[0], "n12838v219848x");
        assertEq(fileStorage.searchByMetadata("",0,40,0,"")[1], "42b12x8czv9721");
    }
}
