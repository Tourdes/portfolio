var Gamersorigin = function(){

	this.id = 'gamersorigin';

	this.currentScreenshot = {

		screenshotId : 0,
		maxScreenshots : 7
		
	}

	View.apply(this, arguments);
	
};


Gamersorigin.prototype = Object.create(View.prototype);

// Set selectors
Gamersorigin.prototype.setSelectors = function() {
	
	View.prototype.setSelectors.call(this);

	//Selectors
	this.headerItem = $( ".header_wrapper" );
	this.mainContainer = $('main');
	this.borderMenuPosition = 'middle';
	this.titleItem = $('.project_title');
	this.projectDescription = $('.project_description');
	this.projectColor = $('.project_color');
	this.closeItem = $('.project_close');
	this.closeTopStroke = $('.project_close .topStroke');
	this.closeBottomStroke = $('.project_close .bottomStroke');
	this.projectScreenshots = $('.project_screenshots');
	this.navScreenshots = $('[nb-selector]');
	this.navNumberScreenshots = $('[img-selector]');
	this.nextScreen = $('.bt_next');
	this.prevScreen = $('.bt_prev');
	this.projectWrapper = $('[wrapper-selector]');


};

// Bind view events
Gamersorigin.prototype.bind = function(){

	var self = this;

	View.prototype.bind.call(this);	

	// Bind scroll event
	var isAlive = true;
	this.projectWrapper.on('scroll', function(){

		if(self.projectWrapper.scrollTop() > 100 && isAlive == true){
			self.closeItem.velocity({
				opacity: 0,
			}, {
				duration: 500,
				delay: 0,
				easing: [300, 40],
				display: "none"
			});

			isAlive = false;
		}
		else if(isAlive == false && self.projectWrapper.scrollTop() < 80){
			self.closeItem.velocity({
				opacity: 1,
			}, {
				duration: 500,
				delay: 0,
				easing: [300, 40],
				display: "block"
			});

			isAlive = true;
		}
	});

	// Bind navigation between screenshots by img
	this.nextScreen.on('click', function(){

		self.nextElem = parseInt(self.currentScreenshot.screenshotId)+1;
		if(self.nextElem < self.currentScreenshot.maxScreenshots){
			self.switchScreenshots(self.nextElem);
		}

	});

	// Bind navigation between screenshots by img
	this.prevScreen.on('click', function(){

		self.prevElem = parseInt(self.currentScreenshot.screenshotId)-1;
		if(self.prevElem > -1){
			self.switchScreenshots(self.prevElem);
		}

	});

	// Bind navigation between screenshots by number
	this.navNumberScreenshots.on('click', function(e){

		var nextScreenshot = $(e.currentTarget).attr('img-selector');
		var diff = Math.abs(nextScreenshot - self.currentScreenshot.screenshotId);

		if(nextScreenshot != self.currentScreenshot.screenshotId && diff < 2){
			self.switchScreenshots(nextScreenshot);
		}
		else if(nextScreenshot != self.currentScreenshot.screenshotId){
			self.switchFarScreenshots(nextScreenshot);
		}

	});

};

// Unbind view events
Gamersorigin.prototype.unbind = function() {

	View.prototype.unbind.call(this);

	// Unbind onKeyup
	$('.project').unbind("scroll");

	// Unbind click
	this.nextScreen.unbind('click');
	this.prevScreen.unbind('click');
	this.navNumberScreenshots.unbind('click');


};

Gamersorigin.prototype.animateInFromNull = function() {
	View.prototype.animateIn.call(this);

	this.setBG();
	this.headerItem.velocity({
		opacity: 0,
		translateY: [0, 0]
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
			self.initScreenshots();
		}
	});
};

Gamersorigin.prototype.animateIn = function() {
	
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
			self.initScreenshots();
		}
	});


};

Gamersorigin.prototype.animationInVelocity = function() {
	this.titleItem.velocity({
		top: [160, "77%"]
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
		backgroundColor: "#C60407"
	}, {
		duration: 0,
		delay: 0
	});

	this.closeBottomStroke.velocity({
		backgroundColor: "#C60407"
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

Gamersorigin.prototype.animateOut = function() {
	
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

// Init the screenshots
Gamersorigin.prototype.initScreenshots = function() {

	var screenshotIsAliveBefore = parseInt(this.currentScreenshot.screenshotId)-1;
	var screenshotIsAliveAfter = parseInt(this.currentScreenshot.screenshotId)+1;


	this.screenshotToShow = $('[nb-selector="'+ this.currentScreenshot.screenshotId +'"]');
	this.screenshotToShow.velocity({
		opacity: 1,
		translateX: ["-50%","-50%"],
		scaleX: [1,1],
		scaleY: [1,1]
	},{
		display: "block",
		duration: 1000
	});


	if(screenshotIsAliveAfter <= parseInt(this.currentScreenshot.maxScreenshots)){
		this.screenshotToShowAfter = $('[nb-selector="'+ screenshotIsAliveAfter +'"]');
		this.screenshotToShowAfter.velocity({
			opacity: 1,
			translateX: ["50%","50%"],
			scaleX: [0.85,0.85],
			scaleY: [0.85,0.85]
		},{
			display: "block",
			duration: 1000
		});
	}
	if(screenshotIsAliveBefore > -1){
		this.screenshotToShowBefore = $('[nb-selector="'+ screenshotIsAliveBefore +'"]');
		this.screenshotToShowBefore.velocity({
			opacity: 1,
			translateX: ["-150%","-150%"],
			scaleX: [0.85,0.85],
			scaleY: [0.85,0.85]
		},{
			display: "block",
			duration: 1000
		});
	}

	this.toggleNavScreenshots(this.currentScreenshot.screenshotId);
};

// Switch between screenshots far away from the current one
Gamersorigin.prototype.switchFarScreenshots = function(nextScreenshot) {

	var self = this;

	// We memorise the previous screenshot Id
	var prevScreenshotId = this.currentScreenshot.screenshotId;
	var	after = parseInt(prevScreenshotId)+1;
	var	before = parseInt(prevScreenshotId)-1;
	var nextAfter = parseInt(nextScreenshot)+1;
	var nextBefore = parseInt(nextScreenshot)-1;

	// We select the screenshots to hide
	this.screenshot = $('[nb-selector="'+ prevScreenshotId +'"]');
	this.screenshotAfter = $('[nb-selector="'+ after +'"]');
	this.screenshotBefore = $('[nb-selector="'+ before +'"]');


	// We select the screenshots to show
	this.nextScreenshot = $('[nb-selector="'+ nextScreenshot +'"]');
	this.nextScreenshotAfter = $('[nb-selector="'+ nextAfter +'"]');
	this.nextScreenshotBefore = $('[nb-selector="'+ nextBefore +'"]');

	//Set properties of the new screenshot
	this.setPropertiesCurrentScreenshot(nextScreenshot);

	// Display screenshots with velocity
	this.nextScreenshot.velocity("finish");
	this.nextScreenshotBefore.velocity("finish");
	this.nextScreenshotAfter.velocity("finish");
	this.screenshot.velocity("finish");
	this.screenshotAfter.velocity("finish");
	this.screenshotBefore.velocity("finish");

	// Set the positions
	this.nextScreenshot.velocity({
		translateX: ["-50%","-50%"],
		scaleX: [0.6,0.6],
		scaleY: [0.6,0.6],
		opacity: 0
	},{ 
		duration: 0,
		display: "none"
	});

	this.nextScreenshotAfter.velocity({
		translateX: ["150%","150%"],
		scaleX: [0.85,0.85],
		scaleY: [0.85,0.85],
		opacity: 0
	},{ 
		duration: 0,
		display: "none"
	});

	this.nextScreenshotBefore.velocity({
		translateX: ["-250%","-250%"],
		scaleX: [0.85,0.85],
		scaleY: [0.85,0.85],
		opacity: 0
	},{ 
		duration: 0,
		display: "none"
	});


	// Display screenshots
	this.screenshot.velocity({
		scaleX: [0.8,1],
		scaleY: [0.8,1],
		opacity: [0, 1]
	},{ 
		duration: 600,
		easing: [100, 20],
		display: "none",
		complete: function(){
			self.nextScreenshot.velocity({
				translateX: ["-50%","-50%"],
				scaleX: [1,0.8],
				scaleY: [1,0.8],
				opacity: [1, 0]
			},{ 
				duration: 600,
				easing: [300, 40],
				display: "block"
			});
		}
	});

	if(after < this.currentScreenshot.maxScreenshots){
		self.screenshotAfter.velocity({
			translateX: ["150%","50%"],
			opacity: [0, 1]
		},{ 
			duration: 600,
			easing: [300, 40],
			display: "none",
			complete: function(){
				self.nextScreenshotAfter.velocity({
					translateX: ["50%","150%"],
					scaleX: [0.85,0.85],
					scaleY: [0.85,0.85],
					opacity: [1, 0]
				},{ 
					duration: 1000,
					easing: [300, 40],
					display: "block"
				});
			}
		});
	}
	else{
		self.nextScreenshotAfter.velocity({
			translateX: ["50%","150%"],
			scaleX: [0.85,0.85],
			scaleY: [0.85,0.85],
			opacity: [1, 0]
		},{ 
			duration: 1000,
			easing: [300, 40],
			display: "block",
			delay: 600
		});
	}
	
	if(before > -1){
		self.screenshotBefore.velocity({
			translateX: ["-250%","-150%"],
			opacity: [0, 1]
		},{ 
			duration: 600,
			easing: [300, 40],
			display: "none",
			complete: function(){
				self.nextScreenshotBefore.velocity({
					translateX: ["-150%","-250%"],
					scaleX: [0.85,0.85],
					scaleY: [0.85,0.85],
					opacity: [1, 0]
				},{ 
					duration: 1000,
					easing: [300, 40],
					display: "block"
				});
			}
		});
	}
	else{
		self.nextScreenshotBefore.velocity({
			translateX: ["-150%","-250%"],
			scaleX: [0.85,0.85],
			scaleY: [0.85,0.85],
			opacity: [1, 0]
		},{ 
			duration: 1000,
			easing: [300, 40],
			display: "block",
			delay: 600
		});
	}

	// Change current nav number
	this.toggleNavScreenshots(nextScreenshot);

};

// Switch between screenshots
Gamersorigin.prototype.switchScreenshots = function(nextScreenshot) {

	// We memorise the previous screenshot Id
	var prevScreenshotId = this.currentScreenshot.screenshotId;
	var	after = parseInt(nextScreenshot)+1;
	var	before = parseInt(nextScreenshot)-1;

	// We select the screenshots to switch between
	this.nextScreenshot = $('[nb-selector="'+ nextScreenshot +'"]');
	this.nextScreenshotAfter = $('[nb-selector="'+ after +'"]');
	this.nextScreenshotBefore = $('[nb-selector="'+ before +'"]');
	this.screenshotToGetRid = null;


	//Set properties of the new screenshot
	this.setPropertiesCurrentScreenshot(nextScreenshot);

	// We set the screenshot to get rid which depends of the next screenshot asked
	if (this.currentScreenshot.screenshotId > prevScreenshotId){
		this.screenshotToGetRid = $('[nb-selector="'+ (parseInt(prevScreenshotId)-1) +'"]')
	}
	else{
		this.screenshotToGetRid = $('[nb-selector="'+ (parseInt(prevScreenshotId)+1) +'"]')
	}

	// Display screenshots with velocity
	this.nextScreenshot.velocity("finish");
	this.nextScreenshotBefore.velocity("finish");
	this.nextScreenshotAfter.velocity("finish");
	this.screenshotToGetRid.velocity("finish");

	if (this.currentScreenshot.screenshotId > prevScreenshotId) {

		// Set positions
		this.nextScreenshotAfter.velocity({
			translateX: ["150%","150%"],
			scaleX: [0.85,0.85],
			scaleY: [0.85,0.85]
		},{ 
			duration: 0,
			display: "none"
		});

		// Display screenshots
		this.nextScreenshotBefore.velocity({
			translateX: ["-150%","-50%"],
			scaleX: [0.85,1],
			scaleY: [0.85,1],
			opacity: [1,1]
		},{ 
			duration: 1500,
			easing: [300, 40],
			display: "block"
		});
		this.nextScreenshotAfter.velocity({
			translateX: ["50%","150%"],
			scaleX: [0.85,0.85],
			scaleY: [0.85,0.85],
			opacity: [1,1]
		},{ 
			duration: 1500,
			easing: [300, 40],
			display: "block"
		});
		this.nextScreenshot.velocity({
			translateX: ["-50%","50%"],
			scaleX: [1,0.85],
			scaleY: [1,0.85],
			opacity: [1,1]
		},{ 
			duration: 1500,
			easing: [300, 40],
			display: "block"
		});
		this.screenshotToGetRid.velocity({
			translateX: ["-250%","-150%"],
			scaleX: [0.85,0.85],
			scaleY: [0.85,0.85]
		},{ 
			duration: 1500,
			easing: [300, 40],
			display: "none"
		});
	}
	else{
		// Set positions
		this.nextScreenshotBefore.velocity({
			translateX: ["-250%","-250%"],
			scaleX: [0.85,0.85],
			scaleY: [0.85,0.85]
		},{ 
			duration: 0,
			display: "block"
		});

		// Display works
		this.nextScreenshotBefore.velocity({
			translateX: ["-150%","-250%"],
			scaleX: [0.85,0.85],
			scaleY: [0.85,0.85],
			opacity: [1,1]
		},{ 
			duration: 1500,
			easing: [300, 40],
			display: "block"
		});
		this.nextScreenshotAfter.velocity({
			translateX: ["50%","-50%"],
			scaleX: [0.85,1],
			scaleY: [0.85,1],
			opacity: [1,1]
		},{ 
			duration: 1500,
			easing: [300, 40],
			display: "block"
		});
		this.nextScreenshot.velocity({
			translateX: ["-50%","-150%"],
			scaleX: [1,0.85],
			scaleY: [1,0.85],
			opacity: [1,1]
		},{ 
			duration: 1500,
			easing: [300, 40],
			display: "block"
		});
		this.screenshotToGetRid.velocity({
			translateX: ["150%","50%"],
			scaleX: [0.85,0.85],
			scaleY: [0.85,0.85]
		},{ 
			duration: 1500,
			easing: [300, 40],
			display: "none"
		});
	}

	// Change current nav number
	this.toggleNavScreenshots(nextScreenshot);
};

// Set properties of the current screenshot
Gamersorigin.prototype.setPropertiesCurrentScreenshot = function(nextScreenshot) {

	this.currentScreenshot.screenshotId = nextScreenshot;

	switch (this.currentScreenshot.screenshotId) {
	  case 0:
	  	this.currentScreenshot.screenshotId = 0;
	    break;
	  case 1:
	  	this.currentScreenshot.screenshotId = 1;
	    break;
	  case 2:
	  	this.currentScreenshot.screenshotId = 2;
	    break;
	  case 3:
	  	this.currentScreenshot.screenshotId = 3;
	    break;
	  case 4:
	  	this.currentScreenshot.screenshotId = 4;
	    break;
	  case 5:
	  	this.currentScreenshot.screenshotId = 5;
	    break;
	  case 6:
	  	this.currentScreenshot.screenshotId = 6;
	    break;

}

};

// Set background's view
Gamersorigin.prototype.setBG = function() {

	$(this.mainContainer).css({
      "background-image": "url('../assets/img/bg_gamersorigin.png')",
      "background-position": "50% 50%"
    });

};

// Toggle nav screenshots
Gamersorigin.prototype.toggleNavScreenshots = function(nextScreenshot) {

	this.navNumberActif = $('[img-selector="'+ nextScreenshot +'"');

	this.navNumberScreenshots.removeClass('actif');
	this.navNumberActif.addClass('actif');

};


