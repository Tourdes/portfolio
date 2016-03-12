module.exports = {
	vhost: "portfolio.dev",
	scripts: {
		app: ['js/app/views/view.js', 'js/app/**/*.js'],
		vendors: ['js/vendor/jquery/jquery.min.js', 'js/vendor/signals/signals.min.js', 'js/vendor/**/*.js'],
		build: 'build/js/',
		dist: 'www/js/'
	},
	styles: {
		sass: 'sass/**/*.scss',
		build: 'build/style/',
		dist: 'www/css/'
	},
	templates: {
		hbs: 'www/templates/**/*',
		dist:'www/js/'
	}
};