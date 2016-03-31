var About = function(){

	this.id = 'about';
	

	View.apply(this, arguments);
	
};


About.prototype = Object.create(View.prototype);

// Set selectors
About.prototype.setSelectors = function() {
	
	View.prototype.setSelectors.call(this);

	//Selectors
	this.mainContainer = $('main');
	this.menuItems = $( ".links" );
	this.menuItem = $( "[abouta]" );
	this.borderMenuPosition = 'right';
	this.aboutContainer = $('.about_container');

};

About.prototype.animateIn = function() {
	
	View.prototype.animateIn.call(this);

	this.toggleMenu();
	this.setBG();

	var self = this;

	if ( !this.loaded ) return;

	this.domElem.velocity({
		opacity: [1,0]
	}, {
		duration: 500,
		delay: 350,
		display: "block",
		complete: function(){
			self.onAnimateIn();
		}
	});

};

About.prototype.animateOut = function() {
	
	View.prototype.animateOut.call(this);

	var self = this;

	this.domElem.fadeOut(function(){
		self.onAnimateOut();
	});

};

// Set background's view
About.prototype.setBG = function() {

	$(this.mainContainer).css({
      "background-image": "url('../assets/img/bg_about.png')",
      "background-position": "50% 50%"
    });

};

