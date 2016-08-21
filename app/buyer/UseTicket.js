if (Meteor.isClient) {

Template.UseTicket.helpers({
	ConcertName: function () {return buyContractInstance.name();},
});

Template.UseTicket.events({
	'click .no': function(event){
		event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "SelectConcert"});
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

		buyContractInstance.useTicket({},{from: account, gas: 100000});
		buyContractInstance.TicketVerified({},{address:account}).watch(function(error, log){
	    	if (!error) {
	    		alert("You have " + buyContractInstance.balanceOfTickets(account) + " ticket left. \n");
	    	}
	    });
	},
});

}