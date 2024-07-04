// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract Certificate {

    struct CertificateData {
        bytes32 sha;
        string hash;
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

    function setImageHash(string calldata _hash, bytes32 _sha) public {
        storeHash[_sha].sha = _sha;
        storeHash[_sha].hash = _hash;
    }

    function getImageHash(bytes32 _sha) public view returns (string memory) {
        CertificateData storage data = storeHash[_sha];
        require(bytes(data.hash).length != 0, "Hash not found");
        return (data.hash);
    }
}


//0xCD7f3D1530e03D42011C30c39dC074E2CdE42456