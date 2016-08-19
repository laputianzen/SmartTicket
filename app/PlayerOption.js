if (Meteor.isClient) {
	
Template.PlayerOption.events({
	'click .buyer': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "SelectConcert"});

	    },
	'click .seller': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "Sell"});

	    },
	'click .supervisor': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "SuperConcert"});

	    }, 
	'click .back': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "Home"});

	    },  

});

}