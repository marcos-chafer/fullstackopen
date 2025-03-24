import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, handleLike }) => {
	const [detailsVisible, setDetailsVisible] = useState(false)

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const toogleDetailsVisibility = (blog) => {
		setDetailsVisible(!detailsVisible)
	}

	const handleLikeButton = async (blog) => {
		const updatedLikes = blog.likes + 1
		blog.likes = updatedLikes

		await blogService.update(blog.id, blog)
	}

	const handleRemoveButton = async ({ title, author, id }) => {
		const userInput = window.confirm(`Remove blog ${title} by ${author}`)
		const response = blogService.remove(id)

	}

	const showRemoveButton = (blog) => {
		if (!blog.user) return

		if (user.username === blog.user.username) {
			return <>
				<br /><button onClick={() => handleRemoveButton(blog)}>remove</button>
			</>
		}
	}


	return (
		<div style={blogStyle}>

			<div>
				<p className='title'>{blog.title}</p>
				<p className='author'>{blog.author}</p>
				<button onClick={() => toogleDetailsVisibility(blog)}>{detailsVisible ? 'close' : 'view'}</button>
				<br />
				<div style={{ display: detailsVisible ? '' : 'none' }} className='details'>
					<p className='url'>{blog.url}</p>
					<p className='likes'>likes: {blog.likes}</p>

					<button onClick={() => handleLikeButton(blog)}>like</button><br />
					{blog.user ? blog.user.name : ''}
					{showRemoveButton(blog)}
				</div>
			</div >
		</div>
	)
}

export default Blog