if (Meteor.isClient) {
	Template.CancelConcert.events({
	'submit form': function(event){
	    	event.preventDefault();
			var account = web3.eth.accounts[0];
			var password = event.target.password.value;
	    	if(! web3.personal.unlockAccount(account,password)){
				alert('Account ' + account + 'cannot unlock');
			} else {
				alert('Account unlock!!!');
			}			

	    	sellContractInstance.cancelConcert({},{from: account, gas: 100000});
	        
	        sellContractInstance.CancelConcert({},{address:account}).watch(function(error, log){
	    		if (!error) {
	    			alert("Contract " + log.args.thisConcert + "is " + log.args.stateName + " \n");
	    		}
	    	});
	        BlazeLayout.render('mainLayout', {main: "Home"});

	    },
	'click .back': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "YourExistingConcert"});

	    },		
	});
}