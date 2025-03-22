const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blog param id exists', async () => {
	const blogs = await api
		.get('/api/blogs')


	blogs.body.forEach((blog, index) => {
		if (!blog.id) {
			throw new Error(`Blog nº${index} doesn't have an id parameter!`)
		}
	})



})

after(async () => {
	await mongoose.connection.close()
})