const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blog is deleted', async () => {

	let blogCountBeforeOperation = await api.get("/api/blogs")
	blogCountBeforeOperation = blogCountBeforeOperation.body.length

	await api.delete("/api/blogs/67dd5908bffe029904238c3e")

	let blogCountAfterOperation = await api.get("/api/blogs")
	blogCountAfterOperation = blogCountAfterOperation.body.length

	if (blogCountBeforeOperation === blogCountAfterOperation) throw new Error("Blog wasn't deleted")

})

after(async () => {
	await mongoose.connection.close()
})