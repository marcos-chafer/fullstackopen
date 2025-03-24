import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [newBlog, setNewBlog] = useState('')

  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')


  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
				title:<input
          value={newBlogTitle}
          onChange={event => setNewBlogTitle(event.target.value)}
			placeholder='title'
		/><br />
				author:<input
          value={newBlogAuthor}
          onChange={event => setNewBlogAuthor(event.target.value)}
		  placeholder='author'
		  /><br />
				url:<input
          value={newBlogUrl}
          onChange={event => setNewBlogUrl(event.target.value)}
		  placeholder='url'
		  /><br />
        <button type="submit">create</button>
      </form><br />
    </div>
  )
}

export default BlogForm