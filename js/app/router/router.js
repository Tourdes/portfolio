var Router = function(){

	// Create navigate event
	this._onNavigate = new signals.Signal();

	// Create routes
	this.createRoutes();

};

// Init router
Router.prototype.init = function() {

	var self = this;

	// Bind HistoryJS state change
	History.Adapter.bind(window, "statechange", function(e){

		self.onStateChange(e);

	});

	// Parse first token
	this.onStateChange();

};

// On state change
Router.prototype.onStateChange = function(e) {
	
	// Get token
	var token = this.getToken();

	// Parse token - test if it matches a route
	crossroads.parse( token );

};

// Create routes
Router.prototype.createRoutes = function() {

	var self = this;

	// Homepage
	crossroads.addRoute( '', function(){

		// Dispatch navigate event
		self._onNavigate.dispatch({
			view: 'showreel'
		});

		console.log( '## Navigate view home/showreel' );

	});


	// About
	crossroads.addRoute( '/about' , function(){

		self._onNavigate.dispatch({
			view: 'about'
		});

		console.log( '## Navigate view about' );

	});

	// Works
	crossroads.addRoute( '/works' , function(){

		self._onNavigate.dispatch({
			view: 'works'
		});

		console.log( '## Navigate view works' );

	});

	// Gamersorigin
	crossroads.addRoute( '/gamersorigin' , function(){

		self._onNavigate.dispatch({
			view: 'gamersorigin'
		});

		console.log( '## Navigate view gamersorigin' );

	});

	// 4l trophy
	crossroads.addRoute( '/4ltrophy' , function(){

		self._onNavigate.dispatch({
			view: 'trophy'
		});

		console.log( '## Navigate view 4l trophy' );

	});

	// Tesla
	crossroads.addRoute( '/tesla' , function(){

		self._onNavigate.dispatch({
			view: 'tesla'
		});

		console.log( '## Navigate view tesla' );

	});

	// Geek-art
	crossroads.addRoute( '/geekart' , function(){

		self._onNavigate.dispatch({
			view: 'geekart'
		});

		console.log( '## Navigate view geek-art' );

	});

	// Newmeta
	crossroads.addRoute( '/newmeta' , function(){

		self._onNavigate.dispatch({
			view: 'newmeta'
		});

		console.log( '## Navigate view newmeta' );

	});

};

// Navigate
Router.prototype.navigate = function( href ) {
	
	History.pushState(null, null, href);

};

// Get token from History hash
Router.prototype.getToken = function() {
	
	var token = History.getState().hash;

	if ( token.indexOf('?') != -1 ){

		var tokenSplit = token.split('?');
		return tokenSplit[0];

	} else {

		return token;

	}

};