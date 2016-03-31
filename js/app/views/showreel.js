var Showreel = function(){

	this.id = 'showreel';
	this.mainContainer = $('main');

	this.menuItems = $( ".links" );
	this.menuItem = $( "[showreel]" );
	this.borderMenuPosition = 'left';


	View.apply(this, arguments);
	
};


Showreel.prototype = Object.create(View.prototype);

Showreel.prototype.animateIn = function() {
	
	View.prototype.animateIn.call(this);

	this.toggleMenu();
	this.setBG();

	var self = this;

	if ( !this.loaded ) return;

	this.domElem.fadeIn(function(){
		self.onAnimateIn();
	});

};

Showreel.prototype.animateOut = function() {
	
	View.prototype.animateOut.call(this);

	var self = this;

	this.domElem.fadeOut(function(){
		self.onAnimateOut();
	});

};

// Set background's view
Showreel.prototype.setBG = function() {

	$(this.mainContainer).css({
      "background-image": "url('../assets/img/bg_showreel.png')",
      "background-position": "50% 50%"
    });

};


