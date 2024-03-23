// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SimpleStorage {
    struct metadata {
        string name;
        uint256 creationDate; 
        uint256 modifiedDate;
        uint256 size;
        string extension; 
    }

    struct File {
        string fileHash;
        metadata metadata; 
    }

    File[] public listOfFiles;

    function store(string memory _name, uint256 _creationDate, uint256 _modifiedDate, uint256 _size, string memory _extension, string memory _fileHash) public {
        metadata memory newMetadata = metadata(_name, _creationDate, _modifiedDate, _size, _extension);
        File memory newFile = File(_fileHash, newMetadata);
        listOfFiles.push(newFile);
    }


    function getFileDetails(uint256 index) public view returns (string memory, uint256, uint256, uint256, string memory, string memory) {
        require(index < listOfFiles.length, "Index out of bounds");
        File memory file = listOfFiles[index];
        return (
            file.metadata.name,
            file.metadata.creationDate,
            file.metadata.modifiedDate,
            file.metadata.size,
            file.metadata.extension,
            file.fileHash
        );

    }

    function searchByMetadata(
        string memory _name,
        uint256 _creationDate,
        uint256 _modifiedDate,
        uint256 _size,
        string memory _extension
    ) public view returns (string[] memory) {
        string[] memory matchingFileHashes = new string[](listOfFiles.length);
        uint256 count = 0;
        for (uint256 i = 0; i < listOfFiles.length; i++) {
            if (
                (bytes(_name).length == 0 || keccak256(bytes(listOfFiles[i].metadata.name)) == keccak256(bytes(_name))) &&
                (_creationDate == 0 || listOfFiles[i].metadata.creationDate == _creationDate) &&
                (_modifiedDate == 0 || listOfFiles[i].metadata.modifiedDate == _modifiedDate) &&
                (_size == 0 || listOfFiles[i].metadata.size == _size) &&
                (bytes(_extension).length == 0 || keccak256(bytes(listOfFiles[i].metadata.extension)) == keccak256(bytes(_extension)))
            ) {
                matchingFileHashes[count] = listOfFiles[i].fileHash;
                count++;
            }
        }
        string[] memory result = new string[](count);
        for (uint256 j = 0; j < count; j++) {
            result[j] = matchingFileHashes[j];
        }
        return result;
    }
}




