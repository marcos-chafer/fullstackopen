import { useState } from "react"
import axios from "axios"
import { useEffect } from "react"

const App = () => {
	const [countryList, setCountryList] = useState([])
	const [searchCountry, setSearchCountry] = useState("")
	const [countriesToShow, setCountriesToShow] = useState([])
	const [weather, setWeather] = useState({})
	const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all"


	const handleSearchCountry = (event) => {

		const countrySearchName = event.target.value;
		setSearchCountry(countrySearchName)

		const filteredCountries = countryList.filter(country => country.name.common.toLowerCase().includes(countrySearchName.toLowerCase()))

		setCountriesToShow(filteredCountries)
	}

	const handleShowCountry = (countryCca2) => {

		const countryToShow = countriesToShow.filter(country => country.cca2 === countryCca2);
		setCountriesToShow(countryToShow)

	}

	const content = () => {

		if (countriesToShow.length > 10) {
			return <p>Too many matches, specify another filter</p>
		}
		// If there's only one country, show info
		else if (countriesToShow.length === 1) {
			var uniqueCountry = countriesToShow[0]

			return (
				<div>
					<h1>{uniqueCountry.name.common}</h1>
					<p>Capital {uniqueCountry.capital[0]}</p>
					<p>Area {uniqueCountry.area}</p>
					<h2>Languages</h2>
					<ul>
						{Object.entries(uniqueCountry.languages).map(([langCode, langName]) => {
							return <li key={langCode}>{langName}</li>
						})}
					</ul>
					<img src={uniqueCountry.flags.png} alt={uniqueCountry.name.common} width="200px" />
					{}
					<h2>Weather in {uniqueCountry.capital[0]}</h2>
					<p>Temperature: {weather.temperature_2m} Celsius</p>
					<p>Wind: {weather.wind_speed_10m} m/s</p>
				</div>
			)
		}
		else {
			return (
				countriesToShow.map((country) => {
					return (
						<p key={country.cca2}>
							{country.name.common}
							<button key={country.cca2} onClick={() => handleShowCountry(country.cca2)}>Show</button>
						</p>
					)
				})
			)
		}
	}

	useEffect(() => {
		if (countriesToShow.length === 1) {
			axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${countriesToShow[0].capitalInfo.latlng[0]}&longitude=${countriesToShow[0].capitalInfo.latlng[1]}&current=temperature_2m,wind_speed_10m`)
			.then(response => {
				setWeather(response.data.current)
			})
		}
	}, [countriesToShow])

	useEffect(() => {
		axios.get(baseUrl)
			.then(response => {
				setCountryList(response.data)
			})

	}
		, [])

	return (
		<>
			<p>
				find countries
				<input value={searchCountry} onChange={handleSearchCountry} />
			</p>
			{content()}
		</>
	)
}

export default App