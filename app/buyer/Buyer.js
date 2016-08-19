if (Meteor.isClient) {
// Mumin hack
Template.Buyer.helpers({
	ConcertName: function() {return buyContractInstance.name()},
	Host: function(){return 'No Stored in Smart Contract';},
	Place: function(){return buyContractInstance.place()},
	WithDrawalDeadline: function(){return buyContractInstance.withDrawalDeadline()},
	StartTime: function(){return buyContractInstance.startTime()},
	EndTime: function(){return buyContractInstance.endTime()},
	TicketPrice: function(){return buyContractInstance.ticketPrice()},
	TicketAvailable: function(){return buyContractInstance.ticketSupply()},

})

Template.Buyer.events({
	'click .back': function(event){
			console.log(event)
	    	event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "PlayerOption"});

	    },
	'click .useTicket': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "ConfirmUseTicket"});

	    },   
	'click .refund': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "ConfirmRefund"});

	    },   
    	    	       
	'submit form':function(event){
		event.preventDefault();
		//session set a lot of things, not done
		Session.set('TicketNumber', event.target.ticketNumber.value);

		Session.set('Host',buyContractInstance.name());
		Session.set('Place',buyContractInstance.place());
		Session.set('StartTime',buyContractInstance.startTime().toString());
		Session.set('EndTime',buyContractInstance.endTime().toString());
		Session.set('TicketPrice',buyContractInstance.ticketPrice().toString());
		Session.set('TicketAvailable', buyContractInstance.ticketSupply().toString());
		BlazeLayout.render('mainLayout', {main: "ConfirmBuy"});
	},
});

}