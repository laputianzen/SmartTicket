if (Meteor.isClient) {

Template.ConfirmEvent.helpers({
	Confirmation: function () {
		var confirmSignal = Session.get('confirmSignal');
		console.log(typeof confirmSignal);
		console.log(confirmSignal);
		if (confirmSignal){
			return 'Confrimation';
		} else {
			return 'Denial';
		}
	},
});

Template.ConfirmEvent.events({
	'click .back': function(event){
		event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "Supervise"});
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
		var confirmSignal = Session.get('confirmSignal');
		superviseContractInstance.confirmEvent(confirmSignal,{from: account, gas: 100000});
		superviseContractInstance.ConfirmEvent({},{address:account}).watch(function(error, log){
	    	if (!error) {
	    		var superviseContractAddress = superviseContractInstnace.address
	    		if (logs.arg.confirmSignal) {
	    			alert("Event " + superviseContractAddress + ' accepts your "Confrimation"!');
	    		}
	    		else {
	    			alert("Event " + superviseContractAddress + ' accepts your "Denial!"');
	    		}
	    	}
	    });
	},
});

}