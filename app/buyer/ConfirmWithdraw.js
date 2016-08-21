if (Meteor.isClient) {
Template.ConfirmWithdraw.helpers({
	ConcertName: function () {return buyContractInstance.name();},
	AccountBalance: function(userIdx){
		var user = web3.eth.accounts[userIdx];
		console.log(user);
		return web3.fromWei(web3.eth.getBalance(user),"ether").round("2");

	},
	TicketPrice: function(){ return buyContractInstance.ticketPrice();},
	TicketWithraw: function(){ return Session.get('TicketNumber');},
	TicketLeft: function(userIdx) {
		var user = web3.eth.accounts[userIdx];
		return  buyContractInstance.balanceOfTickets(user) - Session.get('TicketNumber');
	},
	WithdrawMoney: function(){  return  buyContractInstance.ticketPrice() * Session.get('TicketNumber');},
	RemainingBalance: function(userIdx) { 
		var numberToEther = 1000000000000000000;
		var user = web3.eth.accounts[userIdx];
		var originalBalance = web3.eth.getBalance(user).toNumber();
		var ticketWithdraw = web3.toWei(buyContractInstance.ticketPrice() * Session.get('TicketNumber'),'ether');
		//console.log(originalBalance);
		//console.log(ticketWithdraw);
		var BalanceAfterWithdraw = parseInt(originalBalance) + parseInt(ticketWithdraw);
		//console.log(BalanceAfterWithdraw);
		return web3.fromWei(BalanceAfterWithdraw,"ether");
	},	
	
});

Template.ConfirmWithdraw.events({
	'click .no': function(event){
		event.preventDefault();
	    BlazeLayout.render('mainLayout', {main: "Buyer"});

	},
	'submit form': function(event){
		event.preventDefault();
		var account = web3.eth.accounts[0];
		var password = event.target.password.value;

		if(! web3.personal.unlockAccount(account,password)){
			alert('Account ' + account + 'cannot unlock');
		} else {
			alert('Account unlock!!!');
		}
		buyContractInstance.safeWithdraw(Session.get('TicketNumber'),{from: account, gas: 100000});

		buyContractInstance.MoneyTransfer({},{address:account}).watch(function(error, log){
	    	if (!error) {
	    		var ticketBuyed = buyContractInstance.balanceOfTickets(account);
	    		//console.log(log.args.backer);

	    		//alert("buyer " log.args.backer " buy " + ticketBuyed + " ticket!\n");
	    		alert("You withdrawed " + Session.get('TicketNumber') + 
	    			" ticket!\n You still have " + ticktetBuyed + " ticket! \n Get " + log.args.amount + " ether withdrawal\n");
	    	}
	    });
		BazeLayout.render('mainLayout', {main: "Buyer"});
	},
});

}