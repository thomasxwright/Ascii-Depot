/*
ASCIIs Model binding to MongoDB
*/


// Use mongoose for schema building:
const mongoose = require('mongoose');

// create model schema:
const AsciiSchema = new mongoose.Schema({
	ascii: {
		type: String,
		required: true,
	},
	public: {
		type: Boolean,
		required: false,
	},
	userId: {
		type: String,
		required: true
	}
})


// export schema
module.exports = mongoose.model('Ascii', AsciiSchema);
