if (Meteor.isClient) {

Session.setDefault('latestBlock',{});
//Starting Screen
BlazeLayout.render('mainLayout', {main: "Home"});

//No.1 template
Template.Home.events({

		'click .start': function(event){
	    	event.preventDefault();
	    	////insert All Session to ''
	        BlazeLayout.render('mainLayout', {main: "PlayerOption"});

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









}




