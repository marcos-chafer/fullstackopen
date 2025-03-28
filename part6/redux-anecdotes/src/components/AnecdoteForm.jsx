import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setAndClearNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {

	const dispatch = useDispatch()

	const handleCreateAnecdote = async (event) => {
		event.preventDefault()

		dispatch(createAnecdote(event.target.anecdote.value))

		dispatch(setAndClearNotification(`you created '${event.target.anecdote.value}'`, 5))

	}



	return (
		<>
			<h2>create new</h2>
			<form onSubmit={handleCreateAnecdote}>
				<div><input name='anecdote' /></div>
				<button type='submit'>create</button>
			</form>
		</>
	)
}

export default AnecdoteForm