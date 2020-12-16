pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Sales.sol";

contract TestSales {
 // The address of the sales contract to be tested
 Sales sales = Sales(DeployedAddresses.Sales());

 // The id of the bike that will be used for testing
 uint expectedBikeId = 8;

 //The expected owner of rented bike is this contract
 address expectedRenter = address(this);

 // Testing the buy() function
    function testUserCanRentBike() public {
    uint returnedId = sales.rent(expectedBikeId);

    Assert.equal(returnedId, expectedBikeId, "Sales of the expected bike should match what is returned.");
    }

    // Testing retrieval of a single bike owner
    function testGetRenterAddressByBikeId() public {
    address renter = sales.renters(expectedBikeId);

    Assert.equal(renter, expectedRenter, "Owner of the expected bike should be this contract");
    }

    // Testing retrieval of all bike owners
    function testGetBuyerAddressByBikeIdInArray() public {
    // Store renters in memory rather than contract's storage
    address[16] memory renters = sales.getRenters();

    Assert.equal(renters[expectedBikeId], expectedRenter, "Owner of the expected bike should be this contract");
    }

}