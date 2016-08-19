if (Meteor.isClient) {
	
	Template.SelectSuperviseConcert.events({
	'click .back': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "BuySell"});

	    },
	'submit form': function(event){
			event.preventDefault();
			 var ConcertAddress = event.target.selectSuperviseConcert.value;
			Session.set('ConcertInstance',ConcertAddress);
			console.log(ConcertAddress);
			buyContractInstance = buyContract.at(ConcertAddress);
	        BlazeLayout.render('mainLayout', {main: "Supervise"});


	}   
});

}