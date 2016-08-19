if (Meteor.isClient) {
Template.ConfirmWithdraw.helpers({
	
});

Template.ConfirmWithdraw.events({
	'click .no': function(event){
		event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "Buyer"});

	},
});

}