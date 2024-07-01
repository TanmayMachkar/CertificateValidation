// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract Certificate {

    struct CertificateData {
        bytes32 encryptImg;
        string ipfs;
    }
    mapping(address => string) public collegeInfo;
    mapping(bytes32 => CertificateData) public storeHash;

    function setInfo(address _address, string calldata _clgname) public {
        require(_address != address(0), "Address cannot be empty");
        require(bytes(_clgname).length != 0, "College name cannot be empty");
        collegeInfo[_address] = _clgname;
    }

    modifier checkAddressRegistered(address _address) {
        require(bytes(collegeInfo[_address]).length > 0, "No name registered on this address");
        _;
    }

    function getInfo(address _address) public view checkAddressRegistered(_address) returns (string memory) {
        return collegeInfo[_address];
    }

    function setImageHash(bytes32 _hash, string calldata _ipfs) public {
        storeHash[_hash].encryptImg = _hash;
        storeHash[_hash].ipfs = _ipfs;
    }

    function getImageHash(bytes32 _hash) public view returns (bytes32, string memory) {
        CertificateData storage data = storeHash[_hash];
        require(data.encryptImg != bytes32(0), "Hash not found");
        return (data.encryptImg, data.ipfs);
    }
}
