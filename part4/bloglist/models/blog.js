const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: {type: Number, default: 0},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}
})

blogSchema.set('toJSON', {	// Transforms the returned object to delete __v and turn _id to id
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		if (returnedObject.likes===undefined) returnedObject.likes = 0
		delete returnedObject._id
		delete returnedObject.__v
	}
})

const Blog = mongoose.model("Blog", blogSchema, "bloglist");

module.exports = Blog