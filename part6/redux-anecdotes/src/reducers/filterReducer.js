import { createSlice } from "@reduxjs/toolkit"

export const filterChange = filter => {
	return {
		type: 'filter/set',
		payload: filter.toLowerCase(),
	}
}

const filterSlice = createSlice({
	name: "filter",
	initialState: "ALL",
	reducers: {
		set(state, action) {
			return action.payload
		}
	}
})

export default filterSlice.reducer