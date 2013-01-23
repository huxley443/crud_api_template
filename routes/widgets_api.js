


module.exports = function(app, dataModel){

	//--  GETS  [reads]  -----------------------------------------
	app.get('/api', function(req, res){
		res.send('API is running');
	});

	app.get('/api/widgets', app.isAuth, function(req, res){
		return dataModel.find(function (err, widgets) {
		    if (!err) {
		      return res.send(widgets);
		    } else {
		      return console.log(err);
		    }
	  	});
	});

	app.get('/api/widgets/:id', app.isAuth, function (req, res){
      return dataModel.findById(req.params.id, function (err, widget) {
        if (!err) {
          return res.send(widget);
        } else {
          return console.log(err);
        }
      });
    });


    //--  POSTS  [inserts]  -----------------------------------------
    app.post('/api/widgets', app.isAuth, function (req, res){
        var widget;
        console.log("POST: ");
        console.log(req.body);
        widget = new dataModel({
            item: req.body.item,
            name: req.body.name,
            description: req.body.description,
            images: req.body.images
            , categories: req.body.categories
        });
        widget.save(function (err) {
            if (!err) {
              return console.log("created");
            } else {
              return console.log(err);
            }
        });
        return res.send(widget);
    });


    //--  PUTS  [updates]  -----------------------------------------
    app.put('/api/widgets/:id', app.isAuth, function (req, res){
      return dataModel.findById(req.params.id, function (err, widget) {
        widget.item = req.body.item;
        widget.name = req.body.name;
        widget.description = req.body.description;
        widget.images = req.body.images;
        widget.categories = req.body.categories;
        return widget.save(function (err) {
          if (!err) {
            console.log("updated");
          } else {
            console.log(err);
          }
          return res.send(widget);
        });
      });
    });

    //--  DELETES  [delete]  -----------------------------------------
    app.delete('/api/widgets/:id', app.isAuth, function (req, res){
          return dataModel.findById(req.params.id, function (err, widget) {
            return widget.remove(function (err) {
              if (!err) {
                console.log("removed");
                return res.send('');
              } else {
                console.log(err);
              }
            });
          });
    });
};








