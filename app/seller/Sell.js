if (Meteor.isClient) {
/////////SELL SECTION/////////////
Template.Sell.events({
	'click .back': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "PlayerOption"});

	    },   
	'submit form': function(event){
			event.preventDefault();
			var concertName = event.target.concertName.value;
			var concertPlace = event.target.concertPlace.value;
			var startTime = event.target.startTime.value;
			var endTime = event.target.endTime.value;
			var withdrawDeadline = event.target.withdrawDeadline.value;
			var ticketAmount = event.target.ticketAmount.value;
			var ticketPrice = event.target.ticketPrice.value;
			var supervisor = event.target.supervisor.value;
			var intro = event.target.intro.value;
			//session.set a shit load of things
			//Not fini

			Session.set('concertName',concertName);
			Session.set('concertPlace',concertPlace);
			Session.set('startTime',startTime);
			Session.set('endTime', endTime);
			Session.set('withdrawDeadline',withdrawDeadline);
			Session.set('ticketAmount',ticketAmount);
			Session.set('ticketPrice',ticketPrice);
			Session.set('supervisor',supervisor);
			Session.set('intro',intro);

		    BlazeLayout.render('mainLayout', {main: "ConfirmSell"});

		}
});
}