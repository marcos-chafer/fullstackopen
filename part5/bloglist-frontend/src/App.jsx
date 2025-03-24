import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [notificationMessage, setNotificationMessage] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const [blogs, setBlogs] = useState([])
  const blogFormRef = useRef()
  // User login form
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // Add blog form

  useEffect(() => {
    (async () => {
      const responseBlogs = await blogService.getAll()

      responseBlogs.sort((blog1,blog2) => blog1.likes<blog2.likes)

      setBlogs(responseBlogs)
    })()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    }
    catch (error) {
      setNotificationMessage('wrong username or password')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setBlogs([])
    setUser(null)
  }

  const loginForm = () => (
    <div>
      <h2>Login</h2>

      <span>{notificationMessage}</span>

      <form onSubmit={handleLogin}>
        <div>
					username
          <input
            value={username}
			placeholder='username'
            onChange={event => setUsername(event.target.value)}
          />
        </div>
        <div>
					password
          <input
            type="password"
			placeholder='password'
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const addBlog = async (blogObject) => {
    // blogFormRef.current.toggleVisibility()

    try {
      const response = await blogService.create(blogObject)
      setBlogs(([...blogs]).concat(response))

      setNotificationMessage(`a new blog ${response.title} by ${response.author} added`)

      setTimeout(() => {
        setNotificationMessage('')
      }, 5000)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {user === null
        ? loginForm()
        :	// If have an user...
        <div>
          <h2>blogs</h2>

          <span>{notificationMessage}</span>

          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>


          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm
              createBlog={addBlog}
            />
          </Togglable>


          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} user={user}/>
          )}

        </div>
      }





    </div >
  )
}

export default App