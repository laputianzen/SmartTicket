if (Meteor.isClient) {

Session.setDefault('latestBlock',{});
//Starting Screen
BlazeLayout.render('mainLayout', {main: "Home"});

//No.1 template
Template.Home.events({

		'click .start': function(event){
	    	event.preventDefault();
	    	////insert All Session to ''
	        BlazeLayout.render('mainLayout', {main: "BuySell"});

	    }
	});

//need Mumin's Web3 heack to finish
 Template.UserInfo.helpers({
 	Account: function(){
 		return web3.eth.accounts[0];
 	},
 	AccountBalance: function(){
		var user = web3.eth.accounts[0];
		return web3.fromWei(web3.eth.getBalance(user),"ether").round("2");

	},
	/////Not Done
 	TicketsOwn: function(){},
 	ContractsOwn: function(){},
 });

//Copied from Simple dapp example
Template.BlockInfo.helpers({
	currentBlock: function () {
        return JSON.stringify(Session.get('latestBlock'), null, 2);
    }
})

Template.BuySell.events({
	'click .buy': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "SelectConcert"});

	    },
	'click .sell': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "Sell"});

	    },
	'click .back': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "Home"});

	    },  
	'click .supervise': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "SuperConcert"});

	    }, 
});

Template.SelectSuperviseConcert.events({
	'click .back': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "BuySell"});

	    },
	'submit form': function(event){
			event.preventDefault();
			 var ConcertAddress = event.target.selectSuperviseConcert.value;
			Session.set('ConcertInstance',ConcertAddress);
			console.log(ConcertAddress);
			buyContractInstance = buyContract.at(ConcertAddress);
	        BlazeLayout.render('mainLayout', {main: "Supervise"});


	}   
});
Template.Supervise.events({
	'click .back': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "SuperConcert"});

	    },
	'click .yes':function(event){
		BlazeLayout.render('mainLayout', {main: "Home"});
	},
	'click .no': function(event){
		BlazeLayout.render('mainLayout', {main: "Home"});
	}
})

////////BUY SECTION/////////////
Template.SelectConcert.events({
	'click .back': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "BuySell"});

	    },
	'submit form': function(event){
			event.preventDefault();
			 var ConcertAddress = event.target.concertName.value;
			Session.set('ConcertInstance',ConcertAddress);
			console.log(ConcertAddress);
			selectedBuyContractObject = web3.eth.contract(abi);
			buyContractInstance = selectedBuyContractObject.at(ConcertAddress);
	        BlazeLayout.render('mainLayout', {main: "Buy"});


	}   
});

// Mumin hack
Template.Buy.helpers({
	Host: function(){},
	Place: function(){},
	StartTime: function(){},
	EndTime: function(){},
	TicketPrice: function(){},
	TicketAvailable: function(){},

})

Template.Buy.events({
	'click .back': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "SelectConcert"});

	    },   
	'click .buy':function(event){
		event.preventDefault();
		//session set a lot of things, not done
		Session.set('Host',SmartContractIntance.name());
		Session.set('Place',SmartContractInstance.place());
		Session.set('StartTime',SmartContractIntance.startTime());
		Session.set('EndTime',SmartContractInstance.endTime());
		Session.set('TicketPrice',SmartContractIntance.endTime());
		Session.set('TicketAvailable', SmartContractInstance.ticketPrice());
		BlazeLayout.render('mainLayout', {main: "ConfirmBuy"});
	}
});

Template.ConfirmBuy.helpers({
	AccountBalance: function(){
		var user = web3.eth.accounts[0];
		return web3.fromWei(web3.eth.getBalance(user),"ether").round("2");

	},
	TicketCost: function(){

	},
});

	Template.ConfirmBuy.events({
	    'click .no': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "Buy"});

	    },
	    'submit form': function(event){
	    	event.preventDefault();
	    	/////its two in this case 
	    	var price = event.target.yes.value*2;
	    	console.log(price);
	    	//starting transcation, alert when transaction finished
	    	var Cost = web3.toWei(price, "ether");
	    	web3.eth.sendTransaction({from: web3.eth.accounts[0], to: Session.get('ConcertInstance'), value: Cost});
	    	//buyContractInstance.buyTicket(template.find('input').value, {from: web3.eth.accounts[0], gas: 100000});
	    	
	        alert("Buy success!");
      	     BlazeLayout.render('mainLayout', {main: "Home"});}

	    
	});

/////////SELL SECTION/////////////
Template.Sell.events({
	'click .back': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "BuySell"});

	    },   
	'submit form': function(event){
			event.preventDefault();
			var concertName = event.target.concertName.value;
			var concertPlace = event.target.concertPlace.value;
			var startTime = event.target.startTime.value;
			var endTime = event.target.endTime.value;
			var withdrawDeadline = event.target.withdrawDeadline.value;
			var ticketAmount = event.target.ticketAmount.value;
			var ticketPrice = event.target.ticketPrice.value;
			var supervisor = event.target.supervisor.value;
			var intro = event.target.intro.value;
			//session.set a shit load of things
			//Not fini

			Session.set('concertName',concertName);
			Session.set('concertPlace',concertPlace);
			Session.set('startTime',startTime);
			Session.set('endTime', endTime);
			Session.set('withdrawDeadline',withdrawDeadline);
			Session.set('ticketAmount',ticketAmount);
			Session.set('ticketPrice',ticketPrice);
			Session.set('supervisor',supervisor);
			Session.set('intro',intro);

		    BlazeLayout.render('mainLayout', {main: "ConfirmSell"});

		}
});

///apply seesion.get to get these infos
Template.ConfirmSell.helpers({
	concertName: function(){return Session.get('concertName')},
	concertPlace: function() {return Session.get('concertPlace')},
	startTime: function(){return Session.get('startTime')},
	endTime: function(){return Session.get('endTime')},
	withdrawDeadline: function(){return Session.get('withdrawDeadline')},
	ticketPrice: function(){return Session.get('ticketPrice')},
	ticketAmount: function(){return Session.get('ticketAmount')},
	supervisor: function(){return Session.get('supervisor')},
	intro: function(){return Session.get('intro')},
})

Template.ConfirmSell.events({
	    'click .no': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "Sell"});

	    },
	    'click .yes': function(event){
	    	event.preventDefault();
	    	//starting transcation, alert when transaction finished

	    	buyContract1Object = web3.eth.contract(abi);
	    	/*var currentTime = new Date();
	    	var timeBeforeWithdrawDeadLineInMilliSeconds = Math.abs(Session.get('withdrawDeadline')-currentTime);

	    	var timeBeforeWithdrawDeadLineInMinutes = Math.floor(timeBeforeWithdrawDeadLineInMilliSeconds/60000);
	    	alert(timeBeforeWithdrawDeadLineInMinutes);
			var timeBeforeStartTimeInMilliSeconds = Math.abs(Session.get('startTime')-currentTime);
	    	var timeBeforeStartTimeInMinutes = Math.floor(timeBeforeWithdrawDeadLineInMilliSeconds/60000);
			var timeBeforeEndTimeInMilliSeconds = Math.abs(currentTime-Session.get('endTime'));
	    	var timeBeforeEndTimeInMinutes = Math.floor(timeBeforeEndTimeInMilliSeconds/60000);
			*/
			var gasEstimate = web3.eth.estimateGas({data: contractCode});
			alert(gasEstimate);

			var param1 = {} 

	    	buyContract1Instance = buyContract1Object.new(Session.get('concertName'),Session.get('concertPlace'),
	    		parseInt(Session.get('ticketPrice')),parseInt(Session.get('ticketAmount')),
	    		
	    		//timeBeforeWithdrawDeadlineInMinutes, timeBeforeStartTimeInMinutes, timeBeforeEndTimeInMinutes,
	    		parseInt(Session.get('withdrawDeadline')), parseInt(Session.get('startTime')), parseInt(Session.get('endTime')),
	    		Session.get('supervisor'),	

			//buyContract1Instance = buyContract1Object.new(['Test Contract','NTU',
	    	//	2,50,500,1000,2000],
	    		{from:web3.eth.accounts[0], data: contractCode, gas: gasEstimate+100000},function(error,contract){
	    			if(!error) {
	    				if(!contract.address) {
	    					alert("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");

      					} else {
        					alert("Contract mined! Address: " + contract.address);
        					console.log(contract);
      					}
	    			} else {
	    				alert(error);
	    			}
	    		});

	    	    /*function buyContract1(
        string _name,string _place,uint _ticketPrice,uint _ticketSupply,
        uint timeBeforeWithdrawDeadline,uint timeBeforestartTime,
        uint timeBeforeconcertEndTime) */
	        //alert("Sell success!");
	        
	        BlazeLayout.render('mainLayout', {main: "Home"});
	    }

});

}




