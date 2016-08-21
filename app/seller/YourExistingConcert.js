if (Meteor.isClient) {

Template.YourExistingConcert.helpers({
	ConcertName: function() {return sellContractInstance.name()},
	Host: function(){return sellContractInstance.host();},
	Place: function(){return sellContractInstance.place()},
	WithDrawalDeadline: function(){return sellContractInstance.withDrawalDeadline()},
	StartTime: function(){return sellContractInstance.startTime()},
	EndTime: function(){return sellContractInstance.endTime()},
	TicketPrice: function(){return sellContractInstance.ticketPrice()},
	TicketAvailable: function(){return sellContractInstance.ticketSupply()},

});		
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
	'click .cancelConcert': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "CancelConcert"});

	    },	  	         	    

	});
}