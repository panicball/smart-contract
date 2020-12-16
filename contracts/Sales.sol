pragma solidity ^0.5.0;

contract Sales {
    address[16] public renters;

    // renting a bike
    function rent(uint bikeId) public returns (uint) {
    require(bikeId >= 0 && bikeId <= 15);

    renters[bikeId] = msg.sender;

    return bikeId;
    }


    // Retrieving the renters
    function getRenters() public view returns (address[16] memory) {
    return renters;
    }

}