import React, { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";

const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
		"X-RapidAPI-Host": "mmo-games.p.rapidapi.com",
	},
};

function App() {
	let [games, setGames] = useState([]);
	let [searchCategory, setSearchCategory] = useState("");
	let [error, setError] = useState(false);

	let getData = async () => {
		let response = await fetch(
			"https://mmo-games.p.rapidapi.com/games",
			options
		);
		let data = await response.json();
		setGames(data);
	};

	const filterByCategory = async (e) => {
		e.preventDefault();

		if (searchCategory === "") return getData();

		// Making the fetch request by adding the searchCategory to the URL
		try {
			let response = await fetch(
				`https://mmo-games.p.rapidapi.com/games?category=${searchCategory}`,
				options
			);
			let data = await response.json();
			console.log(data);

			if (data?.status == 0 || data?.message) {
				setGames([]);
				setError(
					"No category found, please enter valid category like 'Shooter', 'Strategy', etc."
				);
				return;
			}

			setGames(data);
			setError("");
		} catch (error) {
			setGames([]);
			setError(error);
		}
	};

	useEffect(() => {
		getData();
		setError("");
	}, []);

	return (
		<div className="App">
			<h1 className="header">MMO Games Library</h1>
			<div className="form">
				<form onSubmit={(e) => filterByCategory(e)}>
					<input
						className="searchBar"
						type="text"
						placeholder="Category (Shooter, etc.)"
						name="search"
						onChange={(e) => {
							setSearchCategory(e.target.value);
						}}
					/>
					<input className="submitBtn" type="submit" value="Filter" />
				</form>
			</div>
			{error && <div className="error">{error}</div>}
			<div className="library">
				{games &&
					games.length > 0 &&
					games.map((game, index) => {
						return <Card game={game} key={index} />;
					})}
			</div>
		</div>
	);
}

export default App;
