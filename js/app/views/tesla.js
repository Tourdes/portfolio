var Tesla = function(){

	this.id = 'tesla';
	this.mainContainer = $('main');

	this.menuItems = $( ".links" );
	this.menuItem = $( "[works]" );
	this.borderMenuPosition = 'middle';


	View.apply(this, arguments);
	
};


Tesla.prototype = Object.create(View.prototype);

// Set selectors
Tesla.prototype.setSelectors = function() {
	
	View.prototype.setSelectors.call(this);

	//Selectors
	this.headerItem = $( ".header_wrapper" );
	this.coverItem = $('.project_cover');
	this.titleItem = $('.project_title');
	this.projectDescription = $('.project_description');
	this.projectColor = $('.project_color');
	this.closeItem = $('.project_close');
	this.closeTopStroke = $('.project_close .topStroke');
	this.closeBottomStroke = $('.project_close .bottomStroke');

};

// Bind view events
Tesla.prototype.bind = function(){

	var self = this;

	View.prototype.bind.call(this);	

};

Tesla.prototype.animateIn = function() {
	
	View.prototype.animateIn.call(this);

	this.setBG();

	this.headerItem.velocity({
		opacity: 0
	}, {
		duration: 0,
		delay: 0,
		display: "none"
	});

	var self = this;

	if ( !this.loaded ) return;

	this.domElem.velocity({
		opacity: 1
	}, {
		duration: 0,
		delay: 0,
		display: "block",
		complete: function(){
			self.onAnimateIn();
			self.animationInVelocity();
		}
	});


};

Tesla.prototype.animationInVelocity = function() {
	this.titleItem.velocity({
		top: ["160px", "484px"]
	}, {
		duration: 2200,
		delay: 1600,
		display: "block",
		easing: [600, 50]
	});

	this.projectDescription.velocity({
		top: ["260px", "600px"],
		opacity: [1,0]
	}, {
		duration: 2200,
		delay: 1760,
		display: "block",
		easing: [600, 50]
	});

	this.projectColor.velocity({
		height: ["100%", "0%"]
	}, {
		duration: 4000,
		display: "block",
		delay: 1760,
		easing: [600, 40]
	});

	this.closeTopStroke.velocity({
		backgroundColor: "#58B171"
	}, {
		duration: 0,
		delay: 0
	});

	this.closeBottomStroke.velocity({
		backgroundColor: "#58B171"
	}, {
		duration: 0,
		delay: 0
	});

	this.closeItem.velocity({
		opacity: 1,
		translateY: ["0%", "-50%"],
		translateX: ["-50%", "-50%"]
	}, {
		duration: 1000,
		delay: 2200,
		easing: [300, 40],
		display: "block"
	});
};

Tesla.prototype.animateOut = function() {
	
	View.prototype.animateOut.call(this);

	this.closeItem.velocity({
		opacity: 0,
		translateY: ["-50%", "0%"]
	}, {
		duration: 1000,
		delay: 0,
		easing: [300, 40],
		display: "none"
	});	

	var self = this;

	this.domElem.fadeOut(function(){
		self.onAnimateOut();
	});

};

// Set background's view
Tesla.prototype.setBG = function() {

	$(this.mainContainer).css({
      "background-image": "url('../assets/img/bg_tesla.png')",
      "background-position": "50% 50%"
    });

};


