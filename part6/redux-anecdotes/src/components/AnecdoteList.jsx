import { useDispatch, useSelector } from "react-redux"
import { setAndClearNotification } from "../reducers/notificationReducer"
import { voteAnecdote } from "../reducers/anecdoteReducer"

// eslint-disable-next-line react/prop-types
const AnecdoteList = () => {

	const dispatch = useDispatch()
	const anecdotes = useSelector((state) => {
		if (state.filter === "ALL") return [...state.anecdotes].sort((anecdote1, anecdote2) => anecdote2.votes - anecdote1.votes)
		else {
			return state.anecdotes.filter((anecdote) => {
				return anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
			})
		}
	})

	const handleVote = (anecdote) => {
		dispatch(voteAnecdote(anecdote.id))
		
		dispatch(setAndClearNotification(`you voted '${anecdote.content}'`, 5))

	}

	return (
		<>
			{
				anecdotes.map(anecdote =>
					<div key={anecdote.id}>
						<div>
							{anecdote.content}
						</div>
						<div>
							has {anecdote.votes}
							<button onClick={() => handleVote(anecdote)}>vote</button>
						</div>
					</div>
				)
			}
		</>
	)
}


export default AnecdoteList