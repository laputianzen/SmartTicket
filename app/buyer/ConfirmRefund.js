if (Meteor.isClient) {
Template.ConfirmRefund.helpers({

});

Template.ConfirmRefund.events({
	'click .no': function(event){
		event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "Buyer"});

	},
});

}