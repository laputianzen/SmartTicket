if (Meteor.isClient) {
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

}