const Persons = ({ persons, deleteFunction }) => {
	return (
		<>
			{persons.map(person =>
				<p key={person.id}>
					{person.name} {person.number}
					<button key={person.id} onClick={()=>deleteFunction(person.id)}>delete</button>
				</p>
			)}
		</>
	)
}


export default Persons