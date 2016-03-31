var Works = function(){

	this.id = 'works';

	//Current Work
	this.currentWork = {

		projectId : 1,
		projectName : 'gamersorigin',
		projectColor : "#C60407",
		projectCover : "url('../assets/img/work_go.png')",
		projectBG : "url('../assets/img/bg_gamersorigin.png')",
		nextProject: "4ltrophy",
		previousProject : ""

	}

	View.apply(this, arguments);
	
};

Works.prototype = Object.create(View.prototype);

// Set selectors
Works.prototype.setSelectors = function() {
	
	View.prototype.setSelectors.call(this);

	//Selectors
	this.window = $(window);
	this.nav = $('.nav');
	this.navWorks = $('[data-selector]');
	this.navWorksSpan = $('[data-selector] span');
	this.mainContainer = $('main');
	this.menuItems = $( ".links" );
	this.menuItem = $( "[works]" );
	this.borderMenuPosition = 'middle';
	this.headerItem = $( ".header_wrapper" );
	this.coverItem = $('.project_cover');
	this.titleItem = $('.project_title');
	this.closeItem = $('.project_close');

};

// Bind view events
Works.prototype.bind = function(){

	var self = this;

	View.prototype.bind.call(this);

	// Bind navigation between works
	this.navWorks.on('click', function(e){

		var nextWork = $(e.currentTarget).attr('data-selector');
		self.switchWorks(nextWork);

	});

	// Bind navigation by keyboard between works
	this.window.on('keyup', function(e) {
		e.preventDefault();		
		self.nextWorkKeyboard(e.which);
	});

};

// Unbind view events
Works.prototype.unbind = function() {

	View.prototype.unbind.call(this);

	// Unbind onKeyup
	$(window).unbind("keyup");

	// Unbind click
	this.navWorks.unbind('click');


};

Works.prototype.animateInFromMenu = function() {
	View.prototype.animateIn.call(this);

	var self = this;

	this.toggleMenu();
	this.initWorks();

	if ( !this.loaded ) return;

	this.coverItem.velocity("finish");
	this.coverItem.velocity({
		opacity: 1
	}, {
		duration: 1,
		delay: 300,
		display: "block",
		complete: function(){
			self.domElem.fadeIn(function(){
				self.onAnimateIn();
			});
		}
	});

	

};

Works.prototype.animateIn = function() {
	
	View.prototype.animateIn.call(this);

	var self = this;

	this.toggleMenu();
	this.initWorks();

	if ( !this.loaded ) return;

	this.domElem.velocity({
		opacity: [1,0]
	}, {
		duration: 0,
		delay: 0,
		display: "block",
		complete: function(){
			self.domElem.fadeIn(function(){
				self.onAnimateIn();
				self.animationInVelocity();
			});

		}
	});

};

Works.prototype.animationInVelocity = function() {

	var self = this;

	this.headerItem.velocity({
		opacity: 1,
		translateY: [0, -200]
	}, {
		duration: 1000,
		delay: 1850,
		easing: [300, 40],
		display: "block"
	});

	this.coverItem.velocity("finish");
	this.coverItem.velocity({
		opacity: 0
	}, {
		duration: 0,
		delay: 0,
		display: "block",
		complete: function(){
			self.coverItem.velocity({
				opacity: [1, 0] 
			}, {
				duration: 1000,
				delay: 1850,
				display: "block",
				easing: [300, 30]
			});
		}
	});

	this.nav.velocity("finish");
	this.nav.velocity({
		opacity: 0
	}, {
		duration: 0,
		delay: 0,
		display: "block",
		complete: function(){
			self.nav.velocity({
				opacity: [1, 0] 
			}, {
				duration: 1000,
				delay: 1850,
				display: "block",
				easing: [300, 30]
			});
		}
	});

};

Works.prototype.animateOutToMenu = function() {

	View.prototype.animateOut.call(this);
	self = this;

	this.domElem.fadeOut(function(){
		self.onAnimateOut();
	});
};

Works.prototype.animateOut = function() {
	
	View.prototype.animateOut.call(this);
	var self = this;
	this.loadingBar = $('.loading_bar');
	this.span = $('[data-selector="' + this.currentWork.projectName + '"] span');

	this.span.velocity({
		backgroundColor: '#fff',
		backgroundColorAlpha: 0.1
	},{ 
		easing: "ease",
		duration: 40
	});

	this.loadingBar.velocity({
		width: [806, 0],
		left: ["18.5%","18.5%"],
		backgroundColor: [this.currentWork.projectColor, this.currentWork.projectColor]
	}, {
		duration: 2000,
		delay: 0,
		easing: [200, 40],
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

	this.headerItem.velocity({
		opacity: 0,
		translateY: [-100, 0]
	}, {
		duration: 2000,
		delay: 1650,
		easing: [200, 40],
		display: "none"
	});

	this.coverItem.velocity({
		translateX: ["-50%", "-50%"],
		scaleY: [0.6, 1],
		scaleX: [0.6, 1],
		opacity: [0, 1] 
	}, {
		duration: 1000,
		delay: 0,
		display: "none",
		easing: [800, 10]
	});


};

Works.prototype.initWorks = function(){

	this.setBG();
	this.setWorkCover();
	this.setWorkColor();

	this.workToShow = $( "." + this.currentWork.projectName );
	this.workToShow.velocity({ opacity: 1 }, { display: "block", duration: 1000});
};

//Retrieve the project to switch with and launch switch works ( Event Keyboard )
Works.prototype.nextWorkKeyboard = function(key) {
	this.key = key;

	switch(key){
		// Arrow left
		case 37:
			if(this.currentWork.previousProject != ""){
				this.nextWork = this.currentWork.previousProject;
				this.switchWorks(this.nextWork);
			}
		break;
		// Arrow right
		case 39:
			if(this.currentWork.nextProject != ""){
				this.nextWork = this.currentWork.nextProject;
				this.switchWorks(this.nextWork);
			}
		break;
	}

};

//Retrieve the project to switch with and launch switch works ( Event click )
Works.prototype.nextWork = function(e) {
	var nextWork = $(e.currentTarget).attr('data-selector');
	this.switchWorks(nextWork);

};

// Switch between works
Works.prototype.switchWorks = function(nextWork) {

	// We memorise the previous project Id
	var prevProjectId = this.currentWork.projectId;

	// We retrieve the project to switch with
	this.nextWork = nextWork;
	
	// Select the works to switch between
	this.workToHide = $( "." + this.currentWork.projectName );
	this.workToShow = $( "." + this.nextWork );

	// Set the properties of the new current work
	this.setPropertiesCurrentWork(nextWork);

	// Set the positions of the work to display
	if(this.currentWork.projectId > prevProjectId){
		this.workToShow.velocity({
			opacity: 0,
			left: "50%",
			translateX: "45%"
		}, {
			display: "none",
			duration: 0
		});
	}
	else{
		this.workToShow.velocity({
			opacity: 0,
			left: "50%",
			translateX: "-145%"
		}, {
			display: "none",
			duration: 0
		});
	}

	// Display works with velocity
	this.workToHide.velocity("finish");
	this.workToShow.velocity("finish");

	if(this.currentWork.projectId > prevProjectId){
		this.workToHide.velocity({
			opacity: 0,
			left: "50%",
			translateX: "-145%",
		},{ 
			display: "none",
			duration: 1000,
			easing: [300, 40],
			queue: false
		});
	}
	else{
		this.workToHide.velocity({
			opacity: 0,
			left: "50%",
			translateX: "45%",
		},{ 
			display: "none",
			duration: 800,
			easing: [300, 40],
			queue: false
		});
	}

	this.workToShow.velocity({
		opacity: 1,
		left: "50%",
		translateX: "-50%"
	}, {
		display: "block",
		duration: 1000,
		easing: [300, 40],
		delay: 200
	});

	// Change cover, color and background
	this.setWorkCover();
	this.setWorkColor();
	this.setBG();

};

// Set properties of the current work
Works.prototype.setPropertiesCurrentWork = function(nextWork) {

	this.currentWork.projectName = nextWork;

	switch (this.currentWork.projectName) {
	  case "gamersorigin":
	  	this.currentWork.projectId = 1;
	    this.currentWork.projectColor = '#C60407';
	    this.currentWork.projectCover = "url('../assets/img/work_go.png')";
	    this.currentWork.projectBG = "url('../assets/img/bg_gamersorigin.png')";
	    this.currentWork.nextProject = "4ltrophy";
	    this.currentWork.previousProject = "";
	    break;
	  case "4ltrophy":
	  	this.currentWork.projectId = 2;
	    this.currentWork.projectColor = '#FA9E0D';
	    this.currentWork.projectCover = "url('../assets/img/work_4ltrophy.png')";
	    this.currentWork.projectBG = "url('../assets/img/bg_4ltrophy.png')";
	    this.currentWork.nextProject = "tesla";
	    this.currentWork.previousProject = "gamersorigin";
	    break;
	  case "tesla":
	  	this.currentWork.projectId = 3;
	    this.currentWork.projectColor = '#58B171';
	    this.currentWork.projectCover = "url('../assets/img/work_tesla.png')";
	    this.currentWork.projectBG = "url('../assets/img/bg_tesla.png')";
	    this.currentWork.nextProject = "geekart";
	    this.currentWork.previousProject = "4ltrophy";
	    break;
	  case "geekart":
	  	this.currentWork.projectId = 4;
	    this.currentWork.projectColor = '#5174CB';
	    this.currentWork.projectCover = "url('../assets/img/work_geekart.png')";
	    this.currentWork.projectBG = "url('../assets/img/bg_geekart.png')";
	    this.currentWork.nextProject = "newmeta";
	    this.currentWork.previousProject = "tesla";
	    break;
	  case "newmeta":
	  	this.currentWork.projectId = 5;
	    this.currentWork.projectColor = '#8329AF';
	    this.currentWork.projectCover = "url('../assets/img/work_newmeta.png')";
	    this.currentWork.projectBG = "url('../assets/img/bg_newmeta.png')";
	    this.currentWork.nextProject = "";
	    this.currentWork.previousProject = "geekart";
	    break;

}

};

// Set work's color
Works.prototype.setWorkColor = function() {

	this.span = $('[data-selector="' + this.currentWork.projectName + '"] span');

	this.navWorksSpan.velocity("stop");
	this.span.velocity("stop");
	this.navWorksSpan.velocity({
		backgroundColor: '#fff',
		backgroundColorAlpha: 0.1
	},{ 
		easing: "ease",
		duration: 200
	});
	this.span.velocity({
		backgroundColor: this.currentWork.projectColor,
		backgroundColorAlpha: 1
	},{ 
		easing: "ease",
		duration: 200
	});
};

// Set work's cover
Works.prototype.setWorkCover = function() {

	$( "." + this.currentWork.projectName + " .project_cover").css({
      "background-image": this.currentWork.projectCover
    });

};

// Set background's view
Works.prototype.setBG = function() {

	$(this.mainContainer).css({
      "background-image": this.currentWork.projectBG,
      "background-position": "50% 50%"
    });

};


