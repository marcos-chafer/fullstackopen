const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('if blog param "likes" doesnt exist, initialize at 0', async () => {
	const blogs = await api
		.get('/api/blogs')


	blogs.body.forEach((blog, index) => {
		// if (!blog.likes) throw new Error(`Blog nº${index} doesn't have the "likes" param`)
	})



})

after(async () => {
	await mongoose.connection.close()
})