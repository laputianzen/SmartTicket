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
	        BlazeLayout.render('mainLayout', {main: "Buy"});

	},
	'submit form': function(event){
	    event.preventDefault();
	    /////its two in this case 
	    var price = event.target.ticketNumber.value * Session.get('TicketPrice');
	    //console.log(price);
	    //starting transcation, alert when transaction finished
	    var Cost = web3.toWei(price, "ether");
	    web3.eth.sendTransaction({from: web3.eth.accounts[0], to: Session.get('ConcertInstance'), value: Cost});
	    //buyContractInstance.buyTicket(template.find('input').value, {from: web3.eth.accounts[0], gas: 100000});
	    	
	    alert("Buy success!");
      	BlazeLayout.render('mainLayout', {main: "Home"});}

});

}