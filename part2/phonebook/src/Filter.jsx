const Filter = ({searchName, handleFunction}) => {
	return (
		<p>filter shown with
			<input value={searchName} onChange={handleFunction} />
		</p>
	)
}

export default Filter