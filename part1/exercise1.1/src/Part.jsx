const Part = (props) => {
	console.log(props)
	return(
		<>
			<p>{props.part} {props.exercisesNumber}</p>
		</>
	)
}

export default Part