if (Meteor.isClient) {
Template.ConfirmBuy.helpers({
	ConcertName: function () {return buyContractInstance.name();},
	AccountBalance: function(){
		var user = web3.eth.accounts[0];
		return web3.fromWei(web3.eth.getBalance(user),"ether").round("2");

	},
	TicketPrice: function(){ return Session.get('TicketPrice');},
	TicketAmount: function(){ return Session.get('TicketNumber');},
	TicketCost: function(){  return Math.floor(Session.get('TicketPrice')) * Session.get('TicketNumber');},
	RemainingBalance: function() { 
		var user = web3.eth.accounts[0];
		var originalBalance = web3.fromWei(web3.eth.getBalance(user),"ether")
		var ticketCost = Math.floor(Session.get('TicketPrice')) * Session.get('TicketNumber');
		return originalBalance - ticketCost;
	},
});

Template.ConfirmBuy.events({
	'click .no': function(event){
		event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "Buyer"});

	},
	'submit form': function(event){
	    event.preventDefault();
	    var account = web3.eth.accounts[0];
	    var password = event.target.password.value;
	    //console.log(password);
	    /////its two in this case 
	    var ticketWant = parseInt(Session.get('TicketNumber'));
	    var ticketPrice = parseInt(Session.get('TicketPrice'));
	    //console.log(ticketWant);
	    //starting transcation, alert when transaction finished
	    //web3.eth.sendTransaction({from: web3.eth.accounts[0], to: Session.get('ConcertInstance'), value: Cost});
	    if(! web3.personal.unlockAccount(account,password)){
			alert('Account ' + account + 'cannot unlock');
		} else {
			alert('Account unlock!!!');
		}
	    buyContractInstance.buyTicket(ticketWant, {from: account, value: web3.toWei(ticketWant*ticketPrice,"ether"), gas: 100000});
	    buyContractInstance.MoneyTransfer({},{address:account}).watch(function(error, log){
	    	if (!error) {
	    		var ticketBuyed = buyContractInstance.balanceOfTickets(account);
	    		//console.log(log.args.backer);

	    		//alert("buyer " log.args.backer " buy " + ticketBuyed + " ticket!\n");
	    		alert("You buyed " + ticketBuyed + " ticket!\n");
	    	}
	    });
	    //alert(buyContractInstance.balanceOfTickets(web3.eth.accounts[0]));


      	BlazeLayout.render('mainLayout', {main: "Home"});}

});

}