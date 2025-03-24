const { test, expect, beforeEach, describe } = require('@playwright/test')


describe('Blog app', () => {
	beforeEach(async ({ page, request }) => {
		await page.goto('http://localhost:5173')

	})

	const user = {
		username: "mchafer",
		password: "Diamante2488"
	}

	const badUser = {
		username: "bad",
		password: "user"
	}


	test('Login form is shown', async ({ page }) => {

		const locator = await page.getByText('username')
		await expect(locator).toBeVisible()
		await expect(page.getByText('password')).toBeVisible()
	})

	describe('Login', () => {
		test('succeeds with correct credentials', async ({ page }) => {

			await page.getByPlaceholder('username').fill(user.username)
			await page.getByPlaceholder('password').fill(user.password)

			await page.getByRole('button', { name: 'login' }).click()

			await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
		})

		test('fails with wrong credentials', async ({ page }) => {

			await page.getByPlaceholder('username').fill(badUser.username)
			await page.getByPlaceholder('password').fill(badUser.password)

			await page.getByRole('button', { name: 'login' }).click()

			const errorMessage = await page.getByText("wrong username or password")
			await expect(errorMessage).toBeVisible()

			// Verificar que el usuario no está logueado
			await expect(page.getByRole('button', { name: 'logout' })).not.toBeVisible()
		})
	})

	describe('When logged in', () => {
		beforeEach(async ({ page }) => {
			// ...
		})

		test('a new blog can be created', async ({ page }) => {
			
			await page.getByRole('button', { name: 'new blog' }).click()

			const blog = {
				title: "Test title",
				author: "mchaferrrrr",
				url: "www.www.com",
			}

			await page.getByPlaceholder("title").fill(blog.title)
			await page.getByPlaceholder("author").fill(blog.author)
			await page.getByPlaceholder("url").fill(blog.url)

			await page.getByRole('button', { name: 'create' }).click()


		})
	})


})