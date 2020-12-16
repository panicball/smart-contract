# smart-contract

Written program enables a smart contract that is implemented in Solidyti programming language. The smart contract has
been adapted to the Ethereum blockchain network.

## Installation instructions
To run the program code you need:

1. Install <br />[Node.js](https://nodejs.org/en/)

2. Install Truffle using
   <br /> `npm install -g truffle` 
   
3. Install <br />[Ganache](https://www.trufflesuite.com/ganache)

4. Download the program code

5. Find the location of the program code (directory) using the command line

6. Make sure that all dapp files are up to date:
   <br /> `truffle compile` 
   <br /> `truffle migrate` 
   
Note: before the migration of the contract to the blockchain, we need to have a blockchain running. Before the excecuting  <br /> `truffle migrate` open Ganache application. This will generate a blockchain running locally on port 7545.

7. Install and configurate <br />[MetaMask](https://metamask.io/)
  * Install MetaMask in your browser
  * Choose Import Wallet
  * In the Wallet Seed field enter the mnemonic that is generated by Ganache (it is displayed on the Ganache main window, just above the addresses)
  * Connect MetaMask to the blockchain created by Ganache by creating a new network
    * Click on "Main Network" 
    * Click on "Custom RPC"
    * Create new network
       * In "New Network" enter http://127.0.0.1:7545
       * In "Network ID" enter 1337
  
8. Run the program code using (start a local server)
   <br /> `npm run dev` 

### The program works in the following steps:

After following installation instruction steps the local server will launch and automatically open a new browser tab containing the dapp that will display the "Bike shop" page with all the rental bikes.
* When the dapp is displayed a "MetaMask" page will apear asking you to connect it to the dapp. After you do that you can functionate in the dapp. 
* When you choose the bike you want to rent - click on the button rent and the MetaMask page will apear asking you to confirm the rent.
* After the confirmation of the rental - the bike is rented
    * it will be outtaken from the rental option
    * a transaction will be excecuted - this outcome is visible in the "MetaMask" section "Activity"
    
