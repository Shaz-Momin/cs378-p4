import logo from "./logo.svg";
import React, { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";

const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": process.env.RAPID_API_KEY,
		"X-RapidAPI-Host": "mmo-games.p.rapidapi.com",
	},
};

function App() {
	let [games, setGames] = useState([]);

	let getData = async () => {
		let response = await fetch(
			"https://mmo-games.p.rapidapi.com/games",
			options
		);
		let data = await response.json();
		setGames(data);
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="App">
			<h1 className="header">MMO Games Library</h1>
			<div className="form">
				<form>
					<input
						className="searchBar"
						type="text"
						placeholder="Lost Ark, New World, etc."
						name="search"
					/>
					<input className="submitBtn" type="submit" value="Search" />
				</form>
			</div>
			<div className="library">
				{games &&
					games.map((game, index) => {
						return <Card game={game} key={index} />;
					})}
			</div>
		</div>
	);
}

export default App;
