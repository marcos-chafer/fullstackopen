import Header from './Header'
import Part from './Part'

const Course = (props) => {

	const totalExercises = props.course.parts.reduce((total, part) => {
		return total + part.exercises;
	}, 0)

	
	return(
		<>
			<Header course={props.course.name} />
			{props.course.parts.map(part => 
				<Part key={part.id} name={part.name} exercises={part.exercises} />
			)}
			<p><strong>total of {totalExercises} exercises</strong></p>
		</>
	)
}

export default Course