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

	const sortGames = async (e) => {
		e.preventDefault();

		// Making the fetch request by adding the searchCategory to the URL
		try {
			let response = await fetch(
				`https://mmo-games.p.rapidapi.com/games?sort-by=alphabetical`,
				options
			);
			let data = await response.json();

			if (data?.status == 0 || data?.message) {
				setGames([]);
				setError("Error sorting games, please try again later.");
				return;
			}

			setGames(data);
			setError("");
		} catch (error) {
			setGames([]);
			setError(error);
		}
	};

	const filterByPC = async (e) => {
		e.preventDefault();

		try {
			let response = await fetch(
				`https://mmo-games.p.rapidapi.com/games?platform=pc`,
				options
			);
			let data = await response.json();

			if (data?.status == 0 || data?.message) {
				setGames([]);
				setError("Error filtering PC games, please try again later.");
				return;
			}

			setGames(data);
			setError("");
		} catch (error) {
			setGames([]);
			setError(error);
		}
	};

	const filterByBrowser = async (e) => {
		e.preventDefault();

		try {
			let response = await fetch(
				`https://mmo-games.p.rapidapi.com/games?platform=browser`,
				options
			);
			let data = await response.json();

			if (data?.status == 0 || data?.message) {
				setGames([]);
				setError(
					"Error filtering browser games, please try again later."
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

	const resetFilters = async (e) => {
		e.preventDefault();
		getData();
		setSearchCategory("");
		setError("");
		document.getElementsByClassName("searchBar")[0].value = "";
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
					<div className="mainInput">
						<input
							className="searchBar"
							type="text"
							placeholder="Category (Shooter, etc.)"
							name="search"
							onChange={(e) => {
								setSearchCategory(e.target.value);
							}}
						/>
						<input
							className="submitBtn"
							type="submit"
							value="Filter"
						/>
					</div>
					<div className="extraOptions">
						<button
							className="sortBtn"
							onClick={(e) => sortGames(e)}>
							Sort Alphabetically
						</button>
						<button
							className="pcBtn"
							onClick={(e) => filterByPC(e)}
							value="Reset All Filters">
							PC (Windows)
						</button>
						<button
							className="browserBtn"
							onClick={(e) => filterByBrowser(e)}
							value="Reset All Filters">
							Browser
						</button>
						<button
							className="resetBtn"
							onClick={(e) => resetFilters(e)}
							value="Reset All Filters">
							Reset
						</button>
					</div>
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
