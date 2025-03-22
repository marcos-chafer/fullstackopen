const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
		.populate("user", { username: 1, name: 1 })
	response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
	const blog = new Blog(request.body)

	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token invalid' })
	}
	const user = await User.findById(decodedToken.id)


	blog.user = user.id

	if (blog.title === undefined || blog.title === null ||
		blog.url === undefined || blog.url === null) {
		return response.status(400)
	}

	const savedBlog = await blog.save()

	// Update user
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
	const id = request.params.id
	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token invalid' })
	}

	const blogToDelete = await Blod.findById(id)

	if (decodedToken.id.toString() != blogToDelete.user.id.toString()) {
		return response.status(401).json({ error: 'token invalid' })
	}


	const deletedBlog = await Blog.findByIdAndDelete(id)

	if (!deletedBlog) return response.status(404)

	response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
	const id = request.params.id

	const body = request.body

	const result = await Blog.updateOne({ "_id": id }, body)

	if (result) response.status(204).end()
})


module.exports = blogsRouter