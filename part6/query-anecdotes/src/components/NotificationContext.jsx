import { useReducer, createContext } from 'react'

const notificationReducer = (state, action) => {
	switch (action.type) {
		case "CREATE_ANECDOTE":
			return `anecdote '${action.payload}' created`
		case "VOTE_ANECDOTE":
			return `anecdote '${action.payload}' voted`
		case "ERROR":
			return `han error has ocurred: ${action.payload}`
		case "CLEAR":
			return ""
		default:
			return state
	}
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
	const [notification, notificationDispatch] = useReducer(notificationReducer, "")

	return (
		<NotificationContext.Provider value={[notification, notificationDispatch]}>
			{props.children}
		</NotificationContext.Provider>
	)
}

export default NotificationContext