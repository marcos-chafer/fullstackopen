import Part from "./Part";

const Content = (props) => {

	return (
		<div>
			<Part part={props.parts[0]} exercisesNumber= {props.exercises[0]}></Part>
			<Part part={props.parts[1]} exercisesNumber= {props.exercises[1]}></Part>
			<Part part={props.parts[2]} exercisesNumber= {props.exercises[2]}></Part>
		</div>
	)


}

export default Content