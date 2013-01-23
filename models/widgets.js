



module.exports = function(mongoose) {
  var collection = 'Widgets';
  var Schema = mongoose.Schema;

    var Images = new Schema({
        kind: {
            type: String,
            enum: ['thumbnail', 'med', 'high', 'zoom'],
            required: true
        },
        url: { type: String, required: true }
    });

    var Categories = new Schema({
        name: String
    });

	var widgetSchema = new Schema({
	    item: { type: String, unique: true },
        name: { type: String, required: true },
	    description: { type: String, required: true },
	    images: [Images],
	    categories: [Categories],
	    modified: { type: Date, default: Date.now }
	});


  this.model = mongoose.model(collection, widgetSchema);

  return this;
};

//----- Sample payload ------------------------------------------------
/* sample for insert (change item number as it's unique)
{
  "item": "123",
  "name": "Awesome Widget 33",
  "description": "It's the coolest widget in the thirties",
  "images": [
    {
      "kind": "thumbnail",
      "url": "images/widgets/123/widg.jpg"
    }
  ],
  "categories": [
      { "name": "cool" },
      { "name": "cooler" }
  ]
}

//-- sample for update (get a valid id number for the url)
{
  "name": "updated!  Awesome Widget 33",
  "description": "updated!  It's the coolest widget in the thirties",
  "images": [
    {
      "kind": "med",
      "url": "images/widgets/123/widg_med.jpg"
    }
  ]
}

*/



