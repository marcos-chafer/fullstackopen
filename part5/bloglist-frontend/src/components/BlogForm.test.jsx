import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
	const createBlog = vi.fn()
	const user = userEvent.setup()

	render(<BlogForm createBlog={createBlog} />)

	const titleInput = screen.getByPlaceholderText('title')
	const authorInput = screen.getByPlaceholderText('author')
	const urlInput = screen.getByPlaceholderText('url')
	const sendButton = screen.getByText('create')


	await user.type(titleInput, 'Test Title')
	await user.type(authorInput, 'Test Author')
	await user.type(urlInput, 'http://test.com')

	await user.click(sendButton)

	expect(createBlog).toHaveBeenCalledTimes(1)


	expect(createBlog).toHaveBeenCalledWith({
		title: 'Test Title',
		author: 'Test Author',
		url: 'http://test.com'
	})
})