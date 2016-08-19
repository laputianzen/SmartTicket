if (Meteor.isClient) {
////////BUY SECTION/////////////
Template.SelectConcert.events({
	'click .back': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "PlayerOption"});

	    },
	'submit form': function(event){
			event.preventDefault();
			 var ConcertAddress = event.target.concertName.value;
			Session.set('ConcertInstance',ConcertAddress);
			console.log(ConcertAddress);
			selectedBuyContractObject = web3.eth.contract(abi);
			buyContractInstance = selectedBuyContractObject.at(ConcertAddress);
	        BlazeLayout.render('mainLayout', {main: "Buy"});


	}   
});

}