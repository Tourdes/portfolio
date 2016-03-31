var Trophy = function(){

	this.id = 'trophy';
	this.mainContainer = $('main');

	this.menuItems = $( ".links" );
	this.menuItem = $( "[works]" );
	this.borderMenuPosition = 'middle';


	View.apply(this, arguments);
	
};


Trophy.prototype = Object.create(View.prototype);

// Set selectors
Trophy.prototype.setSelectors = function() {
	
	View.prototype.setSelectors.call(this);

	//Selectors
	this.headerItem = $( ".header_wrapper" );
	this.titleItem = $('.project_title');
	this.projectDescription = $('.project_description');
	this.projectColor = $('.project_color');
	this.closeItem = $('.project_close');
	this.closeTopStroke = $('.project_close .topStroke');
	this.closeBottomStroke = $('.project_close .bottomStroke');

};

// Bind view events
Trophy.prototype.bind = function(){

	var self = this;

	View.prototype.bind.call(this);	

};

Trophy.prototype.animateIn = function() {
	
	View.prototype.animateIn.call(this);

	this.setBG();

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

Trophy.prototype.animationInVelocity = function() {
	this.titleItem.velocity({
		top: [160, 561]
	}, {
		duration: 2200,
		delay: 1600,
		display: "block",
		easing: [600, 50]
	});

	this.projectDescription.velocity({
		top: [260, 640],
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
		backgroundColor: "#FA9E0D"
	}, {
		duration: 0,
		delay: 0
	});

	this.closeBottomStroke.velocity({
		backgroundColor: "#FA9E0D"
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

Trophy.prototype.animateOut = function() {
	
	View.prototype.animateOut.call(this);
	var self = this;

	this.projectColor.velocity("finish");
	this.projectColor.velocity({
		translateX: [-10, 0],
		opacity: [0,1]
	}, {
		duration: 1000,
		delay: 0,
		easing: [200, 40]
	});

	this.closeItem.velocity({
		opacity: 0,
		translateY: ["-50%", "0%"]
	}, {
		duration: 1000,
		delay: 0,
		easing: [300, 40],
		display: "none"
	});	

	this.titleItem.velocity({
		top: [561, 160]
	}, {
		duration: 2000,
		delay: 100,
		easing: [600, 50]
	});

	this.projectDescription.velocity({
		top: [640, 260],
		opacity: [0,1]
	}, {
		duration: 1650,
		delay: 0,
		easing: [600, 50],
		complete: function(){
			self.domElem.velocity({
				opacity: 0
			}, {
				duration: 0,
				delay: 0,
				display: "none"
			});

			self.domElem.fadeOut(function(){
				self.onAnimateOut();
				
			});
		}
	});

};

// Set background's view
Trophy.prototype.setBG = function() {

	$(this.mainContainer).css({
      "background-image": "url('../assets/img/bg_4ltrophy.png')",
      "background-position": "50% 50%"
    });

};


