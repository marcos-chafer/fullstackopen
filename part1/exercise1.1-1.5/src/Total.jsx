const Total = (props) => {
	let totalExercises = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises;

	return (
		<>
			<p>Number of exercises {totalExercises}</p>
		</>
	)
}
export default Total