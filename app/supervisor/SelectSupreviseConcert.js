if (Meteor.isClient) {
	
	Template.SelectSuperviseConcert.events({
	'click .back': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "PlayerOption"});

	    },
	'submit form': function(event){
			event.preventDefault();
			 var ConcertAddress = event.target.selectSuperviseConcert.value;
			Session.set('ConcertInstance',ConcertAddress);
			console.log(ConcertAddress);
			superviseContractObject = web3.eth.contract(abi)
			superviseContractInstance = superviseContractObject.at(ConcertAddress);
	        BlazeLayout.render('mainLayout', {main: "Supervise"});


	}   
});

}