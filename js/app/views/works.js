var Works = function(){

	this.id = 'works';

	this.menuId = $('[works-menu]');
	//Current Work
	this.currentWork = 0;

	

	//Selectors
	this.mainContainer = $('main');

	View.apply(this, arguments);
	
};


Works.prototype = Object.create(View.prototype);

Works.prototype.bind = function(){

	View.prototype.bind.call(this);

	this.navWorks = $('[project_selector]');

	this.navWorks.on('click', $.proxy(this.switchWorks, this));
};

Works.prototype.animateIn = function() {
	
	View.prototype.animateIn.call(this);

	this.toggleMenu();

	var self = this;

	if ( !this.loaded ) return;

	this.domElem.fadeIn(function(){
		self.onAnimateIn();
	});

	this.setBG();

};

Works.prototype.animateOut = function() {
	
	View.prototype.animateOut.call(this);

	var self = this;

	this.domElem.fadeOut(function(){
		self.onAnimateOut();
	});

};



// Switch between works
Works.prototype.switchWorks = function(e) {

	var nextWork = $(e.currentTarget).attr('project_selector');
	this.nextWork = nextWork;
	
	// Select the works to switch between and set the new current work
	this.workToHide = $( "." + this.currentWork );
	this.workToShow = $( "." + this.nextWork );
	this.setCurrentWork(nextWork);

	// Display works
	this.workToHide.velocity({ opacity: 0 }, { display: "none" });
	this.workToShow.velocity({ opacity: 1 }, { display: "block" });


};

// Set the current work
Works.prototype.setCurrentWork = function(nextWork) {

	this.nextWork = nextWork;

	switch(this.nextWork){
		case 0:
		this.currentWork = 0;
		break;
		case 1:
		this.currentWork = 1;
		break;
		case 2:
		this.currentWork = 2;
		break;
		case 3:
		this.currentWork = 3;
		break;
		case 4:
		this.currentWork = 4;
		break;
	}

	console.log(this.currentWork);
};

// Set background's view
Works.prototype.setBG = function() {

	$(this.mainContainer).css({
      "background-image": "url('../assets/img/bg_gamersorigin.png')",
      "background-position": "0% 0%"
    });

};
