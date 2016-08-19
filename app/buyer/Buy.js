if (Meteor.isClient) {
// Mumin hack
Template.Buy.helpers({
	Host: function(){},
	Place: function(){},
	StartTime: function(){},
	EndTime: function(){},
	TicketPrice: function(){},
	TicketAvailable: function(){},

})

Template.Buy.events({
	'click .back': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "SelectConcert"});

	    },   
	'click .buy':function(event){
		event.preventDefault();
		//session set a lot of things, not done
		Session.set('Host',SmartContractIntance.name());
		Session.set('Place',SmartContractInstance.place());
		Session.set('StartTime',SmartContractIntance.startTime());
		Session.set('EndTime',SmartContractInstance.endTime());
		Session.set('TicketPrice',SmartContractIntance.endTime());
		Session.set('TicketAvailable', SmartContractInstance.ticketPrice());
		BlazeLayout.render('mainLayout', {main: "ConfirmBuy"});
	}
});

}