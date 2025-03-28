import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer"

const VisibilityFilter = () => {
	const dispatch = useDispatch()

	return(
		<div>
			filter <input onChange={()=>dispatch(filterChange(event.target.value))}></input>
			<br/>
		</div>
	)
}

export default VisibilityFilter