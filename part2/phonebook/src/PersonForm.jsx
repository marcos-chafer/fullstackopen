const PersonForm = ({newName,newNameHandleFunction, newNumber, newNumberHandleFunction, addPersonFunction}) => {
	return(
		<>
		<form onSubmit={addPersonFunction}>
				<div>
					name: <input value={newName} onChange={newNameHandleFunction} />
				</div>
				<div>
					number: <input value={newNumber} onChange={newNumberHandleFunction} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
		</>
	)
}


export default PersonForm;