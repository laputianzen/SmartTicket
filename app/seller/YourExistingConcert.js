if (Meteor.isClient) {
////////BUY SECTION/////////////
Template.YourExistingConcert.events({
	'click .back': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "SellerManagement"});

	    },
	'click .startConcert': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "StartConcert"});

	    },
	'click .closeConcert': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "CloseConcert"});

	    },	 
	'click .getIncome': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "GetIncome"});

	    },	     	    

	});
}