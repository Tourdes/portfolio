var ViewController = function(){

	this.views = {};

	this.isBusy = false;

	this._onViewLoadComplete = new signals.Signal();

	this._onNavigate = new signals.Signal();

	this.prevView = null;
	this.currentView = null;
	this.nextView = null;

	this.init();

};

// Init views
ViewController.prototype.init = function() {
	
	// Create all views
	this.views = {
		'showreel': new Showreel(),
		'about': new About(),
		'works': new Works(),
		'gamersorigin': new Gamersorigin(),
		'trophy': new Trophy(),
		'tesla': new Tesla(),
		'geekart': new Geekart(),
		'newmeta': new Newmeta()

	};

};

// Bind
ViewController.prototype.bind = function() {
	
	// Listen to the router for navigate event
	app.router._onNavigate.add( this.onNavigate, this );

};

// On navigate
ViewController.prototype.onNavigate = function(e) {
	
	var view = e.view;

	console.log('## VC Navigate >> ', e);

	// Go to next view
	this.goTo( this.views[ view ] );

};

// Go to a view
ViewController.prototype.goTo = function( nextView ) {

	// If same view as current, stop it
	if ( nextView == this.currentView ){
		this.isBusy = false;
		return;
	}

	// Set busy state
	this.isBusy = true;

	// Save next view
	this.nextView = nextView;

	// If next view is not loaded yet
	if ( !this.nextView.loaded ){

		// Listen to on view load complete event
		this.nextView._onViewLoadComplete.add( this.onViewLoadComplete, this );

		// Load next view
		this.nextView.load();

		return;

	}

	// Remove on view load complete listener
	this.nextView._onViewLoadComplete.remove( this.onViewLoadComplete, this );

	// If it's the first view to be shown
	if ( this.currentView == null ){

		// Listen to onAnimateIn event
		this.nextView._onAnimateIn.add(this.onViewAnimateIn, this);

		if(this.nextView == this.views.gamersorigin || this.nextView == this.views.trophy || this.nextView == this.views.tesla || this.nextView == this.views.geekart || this.nextView == this.views.newmeta){
			this.nextView.animateInFromNull();
		}
		else{

			// Animate next view in
			this.nextView.animateIn();
		}
		
		// Dispatch navigation event
		this._onNavigate.dispatch({
			from: null,
			to: this.nextView
		});

		// Save prev view
		this.prevView = this.currentView;

		// Save new current view
		this.currentView = this.nextView;

		// Reset next view
		this.nextView = null;

		return;

	} else {
		
		// If nextView is about or showreel we call an other method to animate them out
		if(this.currentView == this.views.works){

			switch(this.nextView){
				// About
				case this.views.about:
					this.currentView.animateOutToMenu( this.nextView );
				break;
				// Showreel
				case this.views.showreel:
					this.currentView.animateOutToMenu( this.nextView );
				break;
				// Gamersorigin
				case this.views.gamersorigin:
					this.currentView.animateOut( this.nextView );
				break;
				// 4l trophy
				case this.views.trophy:
					this.currentView.animateOut( this.nextView );
				break;
				// Tesla
				case this.views.tesla:
					this.currentView.animateOut( this.nextView );
				break;
				// Tesla
				case this.views.tesla:
					this.currentView.animateOut( this.nextView );
				break;
				// Geek art
				case this.views.geekart:
					this.currentView.animateOut( this.nextView );
				break;
				// Newmeta
				case this.views.newmeta:
					this.currentView.animateOut( this.nextView );
				break;
			}

		}
		else{
			// Animate out current view
			this.currentView.animateOut( this.nextView );
		}

		// Listen to onAnimateIn event
		this.nextView._onAnimateIn.add( this.onViewAnimateIn, this );

		// If currentView is about/showreel/works we call an other method to animate view works in
		if(this.nextView == this.views.works){

			switch(this.currentView){
				// About
				case this.views.about:
					this.nextView.animateInFromMenu( this.currentView );
				break;
				// Showreel
				case this.views.showreel:
					this.nextView.animateInFromMenu( this.currentView );
				break;
				// Gamersorigin
				case this.views.gamersorigin:
					this.nextView.animateIn( this.currentView );
				break;
				// 4l trophy
				case this.views.trophy:
					this.nextView.animateIn( this.currentView );
				break;
				// Tesla
				case this.views.tesla:
					this.nextView.animateIn( this.currentView );
				break;
				// Tesla
				case this.views.tesla:
					this.nextView.animateIn( this.currentView );
				break;
				// Geek art
				case this.views.geekart:
					this.nextView.animateIn( this.currentView );
				break;
				// Newmeta
				case this.views.newmeta:
					this.nextView.animateIn( this.currentView );
				break;
			}

		}
		else{
			// Animate in next view
			this.nextView.animateIn( this.currentView );
		}
		
		// Dispatch navigation event
		this._onNavigate.dispatch({
			from: this.currentView,
			to: this.nextView
		});

		// Save prev view
		this.prevView = this.currentView;

		// Save new current view
		this.currentView = this.nextView;

		// Reset next view
		this.nextView = null;

	}

};

ViewController.prototype.onViewLoadComplete = function(e) {
	
	this.nextView._onViewLoadComplete.remove( this.onViewLoadComplete );

	this._onViewLoadComplete.dispatch(e);

	if ( this.currentView == null ){

		app.mainLoader.animateOut();

	}

	this.goTo( this.nextView );	
	
};

// Once next view has been animated in
ViewController.prototype.onViewAnimateIn = function() {

	// Remove listener
	this.currentView._onAnimateIn.remove( this.onViewAnimateIn, this );

	// Set not busy anymore
	this.isBusy = false;

	// Bind navigation links again in case of new ones
	this.bindNavLinks();

};

// Bind navigation links
ViewController.prototype.bindNavLinks = function() {
	
	$('a').not('[target="_blank"]').off('click').on('click', $.proxy(this.onNavLinkClick, this));

};

// On nav link click
ViewController.prototype.onNavLinkClick = function(e) {

	// Prevent default link behavior
	e.preventDefault();

	// Get url of clicked link
	var url = $(e.currentTarget).attr('href');

	// If navigation is not busy and url is a valid link
	if ( !this.isBusy && url != '#' ){
	
		// Navigate to the new url		
		app.router.navigate( url );

	}

};
