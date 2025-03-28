import { createSlice } from "@reduxjs/toolkit"

export const setAndClearNotification = (content, time) => {

	return async (dispatch) => {
		dispatch(setNotification(content))
		setTimeout(() => {
			dispatch(clearNotification())
		}, (time*1000))
	}

}

const setNotification = (content) => {
	return {
		type: "notification/create",
		payload: content
	}
}

const clearNotification = () => {
	return {
		type: "notification/reset"
	}
}


const notificationSlice = createSlice({
	name: "notification",
	initialState: "",
	reducers: {
		create(state,action){
			return action.payload
		},
		reset(state,action){
			return null
		}
	}
})

export default notificationSlice.reducer