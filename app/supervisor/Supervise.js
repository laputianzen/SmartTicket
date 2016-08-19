if (Meteor.isClient) {

Template.Supervise.events({
	'click .back': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "SuperConcert"});

	    },
	'click .yes':function(event){
		BlazeLayout.render('mainLayout', {main: "Home"});
	},
	'click .no': function(event){
		BlazeLayout.render('mainLayout', {main: "Home"});
	}
});

}