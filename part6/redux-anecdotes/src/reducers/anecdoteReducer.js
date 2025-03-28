import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'


export const initializeAnecdotes = () => {
	return (async (dispatch) => {
		const anecdotes = await anecdoteService.getAll()
		dispatch(setAnecdotes(anecdotes))
	})
}

const setAnecdotes = (content) => {
	return {
		type: 'anecdotes/set',
		payload: content
	}
}

export const createAnecdote = (content) => {
	return (async (dispatch) => {
		const newAnecdote = await anecdoteService.createNew(content)
		dispatch(appendAnecdote(newAnecdote))
	})
}

const appendAnecdote = (content) => {
	return {
		type: 'anecdotes/append',
		payload: {
			content
		}
	}
}

export const voteAnecdote = (id) => {
	return (async (dispatch) => {
		const anecdote = await anecdoteService.vote(id)
		dispatch(addVoteAnecdote(anecdote.id))
	})
}

const addVoteAnecdote = (id) => {
	return {
		type: 'anecdotes/vote',
		payload: id

	}
}


const anecdoteSlice = createSlice({
	name: "anecdotes",
	initialState: [],
	reducers: {
		set(state, action) {
			return action.payload
		},
		append(state, action) {
			const anecdote = action.payload.content
			console.log(anecdote)
			state.push(anecdote)
		},
		vote(state, action) {
			const id = action.payload

			const anecdoteToVote = state.find(anecdote => anecdote.id === id)

			anecdoteToVote.votes++
		}
	}
})

export default anecdoteSlice.reducer