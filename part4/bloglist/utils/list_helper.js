const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	if (typeof (blogs) != "object") return false

	let likeCounter = 0
	blogs.forEach(blog => {
		likeCounter += blog.likes
	})

	return likeCounter
}

const favoriteBlog = (blogs) => {
	// Return the blog with most likes
	if (typeof (blogs) != "object") return false
	if (blogs.length === 0) return false

	// Initialize the saved blog with a dummy one
	let savedBlog = {
		"_id": "1",
		"likes": "0"
	};

	blogs.forEach(blog => {
		if (blog.likes > savedBlog.likes) savedBlog = blog
	})

	return savedBlog;
}

const mostBlogs = (blogs) => {
	// Return the author with most blogs and the total number of its blogs
	if (typeof (blogs) != "object") return false
	if (blogs.length === 0) return false

	const lodash = require("lodash")

	let authors = []

	blogs.forEach(blog =>
		authors.push(blog.author)
	)

	authors = lodash.countBy(authors)

	const authorWithMostBlogs = lodash.maxBy(Object.keys(authors), (author) => { return authors[author] })
	const result = {
		"author": authorWithMostBlogs,
		"blogs": authors[authorWithMostBlogs]
	}

	return result
}

const mostLikes = (blogs) => {
	// Return the author with most likes and the total number of its likes
	if (typeof (blogs) != "object") return false
	if (blogs.length === 0) return false

	const lodash = require("lodash")

	let authorsAndLikes = []

	blogs.forEach((blog) => {
		let author = blog.author
		let likes = blog.likes
		let obj = {}

		obj[author] = likes

		authorsAndLikes.push(obj)
	})


	authorsAndLikes = authorsAndLikes.reduce((aux, author) => {
		if (aux[Object.keys(author)]) {
			aux[Object.keys(author)] += Number(Object.values(author));
		} else {
			aux[Object.keys(author)] = Number(Object.values(author));
		}
		return aux
	}, {})

	authorsAndLikes = Object.entries(authorsAndLikes).reduce((result, [author, likes]) => {
			if (likes > result.likes) {
				return { author, likes };
			}
			return result;
	}, {author:"", likes:0})

	return authorsAndLikes
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}