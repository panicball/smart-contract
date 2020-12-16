App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load bikes.
    $.getJSON('../bikes.json', function(data) 
    {
      var bikesRow = $('#bikesRow');
      var bikeTemplate = $('#bikeTemplate');

      for (i = 0; i < data.length; i ++) 
      {
        bikeTemplate.find('.panel-title').text(data[i].name);
        bikeTemplate.find('img').attr('src', data[i].picture);
        bikeTemplate.find('.bike-type').text(data[i].type);
        bikeTemplate.find('.bike-years').text(data[i].years);
        bikeTemplate.find('.bike-location').text(data[i].location);
        bikeTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        bikesRow.append(bikeTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: async function() 
  {
    // Modern dapp browsers...
    if (window.ethereum) 
    {
      App.web3Provider = window.ethereum;
      try 
      {
        // Request account access
        await window.ethereum.enable();
      } 
      
      catch (error) 
      {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) 
    {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else 
    {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() 
  {
    $.getJSON('Sales.json', function(data) 
    {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var SalesArtifact = data;
      App.contracts.Sales = TruffleContract(SalesArtifact);
    
      // Set the provider for our contract
      App.contracts.Sales.setProvider(App.web3Provider);
    
      // Use our contract to retrieve and mark the rented bikes
      return App.markRented();
    });

    return App.bindEvents();
  },

  bindEvents: function() 
  {
    $(document).on('click', '.btn-adopt', App.handleRent);
  },

  markRented: function() 
  {
    var salesInstance;

    App.contracts.Sales.deployed().then(function(instance) 
    {
      salesInstance = instance;
    
      return salesInstance.getRenters.call();
    }).then(function(renters) {
      for (i = 0; i < renters.length; i++) 
      {
        if (renters[i] !== '0x0000000000000000000000000000000000000000') 
        {
          $('.panel-bike').eq(i).find('button').text('Rented').attr('disabled', true).css("background-color", "#CDCDCD");;
        }
      }
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  handleRent: function(event) 
  {
    event.preventDefault();

    var bikeId = parseInt($(event.target).data('id'));

    var salesInstance;

    web3.eth.getAccounts(function(error, accounts) 
    {
      if (error) 
      {
        console.log(error);
      }
    
      var account = accounts[0];
    
      App.contracts.Sales.deployed().then(function(instance) 
      {
        salesInstance = instance;
    
        // Execute rent as a transaction by sending account
        return salesInstance.rent(bikeId, {from: account});
      }).then(function(result) {
        return App.markRented();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

};

$(function() 
{
  $(window).load(function() 
  {
    App.init();
  });
});
