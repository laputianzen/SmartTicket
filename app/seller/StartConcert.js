if (Meteor.isClient) {

Template.StartConcert.helpers({
	ConcertName: function () {return sellContractInstance.name();},
});

Template.StartConcert.events({
	'click .back': function(event){
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

		sellContractInstance.startConcert({},{from: account, gas: 100000});
		sellContractInstance.StartConcert({},{address:account}).watch(function(error, log){
	    	if (!error) {
	    		alert("You concert is " + log.args.stateName + " \n");
	    	}
	    });
	},
});

}