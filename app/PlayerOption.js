if (Meteor.isClient) {
	
Template.PlayerOption.events({
	'click .buyer': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "SelectConcert"});

	    },
	'click .seller': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "SellerManagement"});

	    },
	'click .supervisor': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "SelectSuperviseConcert"});

	    }, 
	'click .back': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "Home"});

	    },  

});

}