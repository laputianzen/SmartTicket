if (Meteor.isClient) {

////////BUY SECTION/////////////
Template.SellerManagement.events({
	'click .back': function(event){
			console.log(event)
	    	event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "PlayerOption"});
	    },    
	'click .sell': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "Sell"});

	    },	    
	'submit form': function(event){
			event.preventDefault();
			 var ConcertAddress = event.target.concertAddress.value;
			Session.set('ConcertInstance',ConcertAddress);
			console.log(ConcertAddress);
			sellContractObject = web3.eth.contract(abi);
			sellContractInstance = sellContractObject.at(ConcertAddress);
	        BlazeLayout.render('mainLayout', {main: "YourExistingConcert"});
	}   
});

}