import { useContext } from 'react'
import NotificationContext from './components/NotificationContext'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests'


const App = () => {

	const queryClient = useQueryClient()

	const [notification, notificationDispatch] = useContext(NotificationContext)


	const updateAnecdoteMutation = useMutation({
		mutationFn: updateAnecdote,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
		},
	})

	const result = useQuery({
		queryKey: ["anecdotes"],
		queryFn: getAnecdotes,
		refetchOnWindowFocus: false,
	})

	if (result.isLoading) {
		return <div>Loading data...</div>
	} else if (result.isError) {
		return <div>anecdote service not available due to problems in server</div>
	}

	const handleVote = (anecdote) => {
		const anecdoteToUpdate = { ...anecdote, votes: anecdote.votes + 1 }

		updateAnecdoteMutation.mutate(anecdoteToUpdate)

		notificationDispatch({ type: "VOTE_ANECDOTE", payload: anecdote.content })
		setTimeout(() => {
			notificationDispatch({ type: "CLEAR" })
		}, 5000)
	}


	const anecdotes = result.data

	return (
		<div>
			<h3>Anecdote app</h3>

			<Notification />
			<AnecdoteForm />

			{anecdotes.map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote)}>vote</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default App
