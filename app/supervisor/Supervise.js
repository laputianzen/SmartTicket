if (Meteor.isClient) {

Template.Supervise.helpers({
	ConcertName: function () {return superviseContractInstance.name();},
});	

Template.Supervise.events({
	'click .back': function(event){
	    event.preventDefault();
	    BlazeLayout.render('mainLayout', {main: "SelectSuperviseConcert"});

	    },
	'click .yes':function(event){
		event.preventDefault();
		Session.set('confirmSignal',true);
		BlazeLayout.render('mainLayout', {main: "ConfirmEvent"});
	},
	'click .no': function(event){
		event.preventDefault();
		Session.set('confirmSignal',false);
		BlazeLayout.render('mainLayout', {main: "ConfirmEvent"});
	}
});

}