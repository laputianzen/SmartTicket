if (Meteor.isClient) {
Template.ConfirmUseTicket.helpers({

});

Template.ConfirmUseTicket.events({
	'click .no': function(event){
		event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "Buyer"});

	},
});

}