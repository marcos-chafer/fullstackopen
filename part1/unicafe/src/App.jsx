import { useState } from 'react'

const Button = ({text,click}) => {
	return(
		<button onClick={click}>
			{text}
		</button>
	)
}
const StatisticLine = ({text, value}) => {
	return(
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	)
}



const Statistics = ({ good, neutral, bad }) => {
	const totalComments = good + neutral + bad;
	const average = (good - bad) / totalComments;
	const positiveComments = (good / totalComments) * 100 + " %";

	return (
		<>
			<h1>statistics</h1>

			{totalComments == 0 ?	// Si no hay comentarios, mostramos texto, si los hay, renderizamos las estadísticas
				<p>No feedback given</p>
				:
				<table>
					<tbody>
					<StatisticLine text="good" value={good}></StatisticLine>
					<StatisticLine text="bad" value={bad}></StatisticLine>
					<StatisticLine text="all" value={totalComments}></StatisticLine>
					<StatisticLine text="average" value={average}></StatisticLine>
					<StatisticLine text="positiveComments" value={positiveComments}></StatisticLine>
					</tbody>
				</table>}
		</>
	)
}
const App = () => {
	// guarda los clics de cada botón en su propio estado
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	return (
		<div>
			<h1>give feedback</h1>

			<Button text="good" click={() => setGood(good + 1)}></Button>
			<Button text="neutral" click={() => setNeutral(neutral + 1)}></Button>
			<Button text="bad" click={() => setBad(bad + 1)}></Button>

			<Statistics good={good} bad={bad} neutral={neutral}></Statistics>

		</div>
	)
}

export default App