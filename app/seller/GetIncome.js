if (Meteor.isClient) {

Template.GetIncome.helpers({
	ConcertName: function () {return sellContractInstance.name();},
});

Template.GetIncome.events({
	'click .no': function(event){
		event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "YourExistingConcert"});
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

		sellContractInstance.getIncome({},{from: account, gas: 100000});
		sellContractInstance.GetIncome({},{address:account}).watch(function(error, log){
	    	if (!error) {
	    		var sellContractAddress = sellContractInstnace.address
	    		alert("You sold " + log.args.ticketSold + " tickets \n" +
	    		"Total " + log.args.totalTicketUsed + "tickets is used!\n" +
	    		"Claim " + log.args.contractBalance + " ether \n" +
	    		"Your event is Inactive now.\n");
	    	}
	    });
	},
});

}