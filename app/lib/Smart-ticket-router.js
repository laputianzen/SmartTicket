FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "Home"});
  }
});

FlowRouter.route('/:postId', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "BuySell"});
  }
});

FlowRouter.route('/:postId', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "Buy"});
  }
});


FlowRouter.route('/:postId', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "Sell"});
  }
});


FlowRouter.route('/:postId', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "SelectConcert"});
  }
});


FlowRouter.route('/:postId', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "ConfirmBuy"});
  }
});


FlowRouter.route('/:postId', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "ConfirmSell"});
  }
});
