import axios from 'axios'

export const getAnecdotes = () =>
	axios.get('http://localhost:3001/anecdotes').then(res => res.data)

export const createAnecdote = (content) => {
	return axios.post("http://localhost:3001/anecdotes", { content, votes: 0 }).then(response => response.data)
}

export const updateAnecdote = (updatedAnecdote) => {
	return axios.put(`http://localhost:3001/anecdotes/${updatedAnecdote.id}`, updatedAnecdote).then(res => res.data)
}