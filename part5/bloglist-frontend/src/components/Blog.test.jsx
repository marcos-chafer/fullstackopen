import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { test, expect } from 'vitest'

test('renders title and author but doesnt render url nor likes by default', () => {
	const blog = {
		title: 'Component testing is done with react-testing-library',
		author: 'Marcos Chafer',
		url: "http://www.mchafer.com",
		likes: 3000
	}

	render(<Blog blog={blog} />)

	screen.debug()

	const titleElement = screen.getByText(blog.title);
	const authorElement = screen.getByText(blog.author);

	expect(titleElement).toBeInTheDocument();
	expect(authorElement).toBeDefined();

	const urlElement = screen.queryByText(blog.url);
	const likesElement = screen.queryByText(`Likes: ${blog.likes}`);

	expect(urlElement).not.toBeInTheDocument();
	expect(likesElement).not.toBeInTheDocument();
})

test('URL and likes are shown when the button is clicked', async () => {
	const blog = {
		title: 'Component testing is done with react-testing-library',
		author: 'Marcos Chafer',
		url: "http://www.mchafer.com",
		likes: 3000
	}

	render(
		<Blog blog={blog} />)

	const user = userEvent.setup();
	const button = screen.getByText('view');
	await user.click(button);

	const urlElementAfterClick = screen.getByText(blog.url);
	const likesElementAfterClick = screen.getByText(`likes: ${blog.likes}`);

	expect(urlElementAfterClick).toBeInTheDocument();
	expect(likesElementAfterClick).toBeInTheDocument();
})

test('clicking the like button twice calls the event handler twice', async () => {
	const blog = {
		title: 'Component testing is done with react-testing-library',
		author: 'Marcos Chafer',
		url: 'http://www.mchafer.com',
		likes: 3000,
	};

	// Crear un mock function para el controlador de eventos
	const handleLikeMock = vi.fn();

	render(<Blog blog={blog} handleLike={handleLikeMock} />);

	// Simular dos clics en el botón "like"
	const user = userEvent.setup();
	const likeButton = screen.getByText('like');
	await user.click(likeButton);
	await user.click(likeButton);

	// Verificar que el controlador de eventos se haya llamado exactamente dos veces
	expect(handleLikeMock).toHaveBeenCalledTimes(2);
});