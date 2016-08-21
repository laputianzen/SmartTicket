if (Meteor.isClient) {
Template.ConfirmRefund.helpers({

});

Template.ConfirmRefund.events({
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

		buyContractInstance.refund({},{from: account, gas: 100000});
		buyContractInstance.Refund({},{address:account}).watch(function(error, log){
	    	if (!error) {
	    		alert("You got " + log.args.refundAmount + "ether refund! \n");
	    	}
	    });
	},
});

}