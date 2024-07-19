// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract Certificate {

    struct CertificateData {
        bytes32 sha;
        string hash;
        address student;
    }

    struct govData{
        address owner;
    }

    mapping(address => string) public collegeInfo;
    mapping(bytes32 => CertificateData) public storeHash;
    mapping(address => govData) public govAdmin;

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

    function setImageHash(string calldata _hash, bytes32 _sha, address _student) public {
        storeHash[_sha].sha = _sha;
        storeHash[_sha].hash = _hash;
        storeHash[_sha].student = _student;
    }

    function getImageHash(bytes32 _sha) public view returns (string memory) {
        CertificateData storage data = storeHash[_sha];
        require(bytes(data.hash).length != 0, "Hash not found");
        return (data.hash);
    }

    function getImageHashAndAcc(bytes32 _sha, address _address) public view returns (string memory, address) {
        CertificateData storage data = storeHash[_sha];
        require(bytes(data.hash).length != 0, "Hash not found");
        require(data.student == _address, "Student not valid");
        return (data.hash, data.student);
    }

    function setAdmin(address _address) public {
        require(_address != address(0), "Address cannot be empty");
        govAdmin[_address].owner = _address;
    }

    modifier checkAdminAddress(address _address) {
        require(govAdmin[_address].owner == _address, "Address cannot be empty");
        _;
    }

    function getAdmin(address _address) public view checkAdminAddress(_address) returns (address) {
        return govAdmin[_address].owner;
    }
}


//0x32eE560C5E54311bad0129c30d3B2fba195509f2