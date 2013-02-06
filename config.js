//-- based on this tut:  http://benedmunds.com/2012/04/19/simple-nodejs-express-mvr-template/


module.exports = function(app, express){

  var config = this;

  //-- generic config
	app.configure(function(){
	  app.set('port', process.env.PORT || 3001);
	  app.set('views', __dirname + '/views');
	  app.set('view engine', 'jade');
	  app.use(express.favicon());
	  app.use(express.logger('dev'));
	  app.use(express.bodyParser());
	  app.use(express.methodOverride());
	  app.use(app.router);
	  app.use(express.static(app.path.join(__dirname, 'public')));
	});

	app.configure('development', function(){
		app.set('AuthRequired', true);  //-- allow quick override of the auth header check
		app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	  	//app.use(express.errorHandler());

	  app.mongoose.connect('mongodb://localhost/widget_database');
	});

  app.configure('production', function(){
  	app.set('AuthRequired', true);  //-- allow quick override of the auth header check
    app.use(express.errorHandler());

    //app.mongoose.connect('mongodb://[SERVER]:[PORT]/widget_database');
  });


    app.isAuth = function(req, res, next) {
    	if (!app.get('AuthRequired')) return next();  //-- allow quick override of the auth header check

	                var hash = app.crypto.createHash('md5').update('secretstuff').digest('hex');
	                //--secretstuff hashes to: 4015e83f57840b5f9ab22f80cee6e686
	                //--need it on the Authorization header to make calls
	                //--just one way to do custom authZ.  client would need to know 'secretstuff'
	                //--to create their own md5 hash to place in the header
	                //--still pretty static though, this isn't enough. combine with other attribs to change it up:
	                //--fullpath + 'secretstuff' + userid perhaps.  idk, it's hard. need ssl.
	                var authHeader = req.headers['authorization'];

	                console.log(hash);

	                if (authHeader == hash) { return next(); }

	                res.send('auth header invalid', 403)
	};


  return config;

};

