import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useContext } from "react"
import NotificationContext from "./NotificationContext"

const AnecdoteForm = () => {
	const queryClient = useQueryClient()
	const [notification, notificationDispatch] = useContext(NotificationContext)

	const newAnecdoteMutation = useMutation({
		mutationFn: createAnecdote,
		onSuccess: (newAnecdote) => {
			console.log(newAnecdote)
			const anecdotes = queryClient.getQueryData(["anecdotes"])
			queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote))

			notificationDispatch({ type: "CREATE_ANECDOTE", payload: newAnecdote.content })
			setTimeout(() => {
				notificationDispatch({ type: "CLEAR" })
			}, 5000)
		},
		onError: (error) => {
			notificationDispatch({ type: "ERROR", payload: error.response.data.error })
			setTimeout(() => {
				notificationDispatch({ type: "CLEAR" })
			}, 5000)
		}
	})

	const onCreate = (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''

		newAnecdoteMutation.mutate(content)

	}


	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name='anecdote' />
				<button type="submit">create</button>
			</form>
		</div>
	)
}


export default AnecdoteForm
