import { useEffect, useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personsService from './services/persons'




const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')

	const [searchName, setSearchName] = useState('')

	const handleNewNameChange = (event) => {
		setNewName(event.target.value)
	}
	const handleNewNumberChange = (event) => {
		setNewNumber(event.target.value)
	}
	const handleSearchNameChange = (event) => {
		setSearchName(event.target.value)
	}

	const personsToShow = () => {
		if (searchName === "") return persons;
		else return persons.filter((person) => person.name.toLowerCase().includes(searchName.toLowerCase()))
	}

	const addPerson = (event) => {
		event.preventDefault()

		const personObject = {
			name: newName
			, number: newNumber
		}

		// Check if the person name already exists
		if (persons.find((person) => person.name === newName) !== undefined) {
			let userInput = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

			userInput ?
				personObject.id = persons.find((person) => person.name === newName).id &&
				personsService.update(persons.find((person) => person.name === newName).id, personObject)
					.then((response) => {
						console.log(response)
						let copyPersonsArray = persons.map(person => person.name === newName ? personObject : person)
						setPersons(copyPersonsArray)
					})
				: ""
			return
		}

		personObject.id = (persons.length + 1).toString()


		// Sending data to server

		personsService
			.create(personObject)
			.then((response) => {
				console.log(response)
				let copyPersonsArray = [...persons, personObject];
				setPersons(copyPersonsArray)
			})



	}

	const handleDelete = (id) => {

		let person = persons.find(person => person.id === id)
		let userInput = window.confirm(`Delete ${person.name} ?`)

		userInput ?
			personsService
				.remove(id)
				.then((response) => {
					console.log(response)
					setPersons(persons.filter(person => person.id !== id))
				})
			: ""

	}

	useEffect(() => {
		personsService
			.getAll()
			.then((response) => {
				setPersons(response.data)
			})
	}, [])


	return (
		<div>
			<h2>Phonebook</h2>
			<Filter searchName={searchName} handleFunction={handleSearchNameChange}></Filter>

			<h3>Add a new</h3>
			<PersonForm newName={newName} newNameHandleFunction={handleNewNameChange} newNumber={newNumber} newNumberHandleFunction={handleNewNumberChange} addPersonFunction={addPerson}></PersonForm>

			<h3>Numbers</h3>

			<Persons persons={personsToShow()} deleteFunction={handleDelete}></Persons>
		</div>
	)
}

export default App