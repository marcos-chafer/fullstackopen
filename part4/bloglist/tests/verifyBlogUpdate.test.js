const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blog is updated', async () => {

	const body = {
		"likes": 12345
	}

	await api.put("/api/blogs/67db1d60dc235cc8dec2db3a").send(body)
		.expect(204)

})

after(async () => {
	await mongoose.connection.close()
})