var About = function(){

	this.id = 'about';
	this.menuId = $('[about-menu]');
	this.mainContainer = $('main');

	View.apply(this, arguments);
	
};


About.prototype = Object.create(View.prototype);

About.prototype.animateIn = function() {
	
	View.prototype.animateIn.call(this);

	this.toggleMenu();

	var self = this;

	if ( !this.loaded ) return;

	this.domElem.fadeIn(function(){
		self.onAnimateIn();
	});

	this.setBG();

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
