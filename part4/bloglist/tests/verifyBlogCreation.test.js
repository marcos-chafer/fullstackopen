const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blog is created', async () => {

	let blogCountBeforeCreation = await api.get("/api/blogs")
	blogCountBeforeCreation = blogCountBeforeCreation.body.length

	await api.post("/api/blogs")

	let blogCountAfterCreation = await api.get("/api/blogs")
	blogCountAfterCreation = blogCountAfterCreation.body.length

	if (blogCountBeforeCreation === blogCountAfterCreation) throw new Error("Blog wasn't created")

})

test('if "title" or "url" params are missing, respond status 400', async () => {

	await api.post("/api/blogs")
		.expect(400)

})

after(async () => {
	await mongoose.connection.close()
})