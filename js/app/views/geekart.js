var Geekart = function(){

	this.id = 'geekart';
	this.mainContainer = $('main');

	this.menuItems = $( ".links" );
	this.menuItem = $( "[works]" );
	this.borderMenuPosition = 'middle';


	View.apply(this, arguments);
	
};


Geekart.prototype = Object.create(View.prototype);

Geekart.prototype.animateIn = function() {
	
	View.prototype.animateIn.call(this);

	this.toggleMenu();
	this.setBG();

	var self = this;

	if ( !this.loaded ) return;

	this.domElem.fadeIn(function(){
		self.onAnimateIn();
	});

};

Geekart.prototype.animateOut = function() {
	
	View.prototype.animateOut.call(this);

	var self = this;

	this.domElem.fadeOut(function(){
		self.onAnimateOut();
	});

};

// Set background's view
Geekart.prototype.setBG = function() {

	$(this.mainContainer).css({
      "background-image": "url('../assets/img/bg_gamersorigin.png')",
      "background-position": "50% 50%"
    });

};


