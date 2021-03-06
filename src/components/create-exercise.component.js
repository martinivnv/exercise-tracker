import axios from "axios";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateExercises() {
	const [pageState, setPageState] = useState({
		username: "test user",
		description: "",
		duration: 0,
		date: new Date(),
		users: ["test user"],
	});

	useEffect(() => {
		axios
			.get("http://localhost:5000/users/")
			.then((res) => {
				if (res.data.length > 0) {
					setPageState({
						...pageState,
						users: res.data.map((user) => user.username),
						username: res.data[0].username,
					});
				}
			})
			.catch((err) => console.log(err));
	}, []);

	function onSubmit(e) {
		e.preventDefault();
		axios
			.post("http://localhost:5000/exercises/add", pageState)
			.then((res) => console.log(res.data));

		window.location = "/";
	}

	return (
		<div>
			<h3>Create New Exercise Log</h3>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label>Username: </label>
					<select
						required
						className="form-control"
						value={pageState.username}
						onChange={(e) =>
							setPageState({ ...pageState, username: e.target.value })
						}
					>
						{pageState.users.map((user) => {
							return (
								<option key={user} value={user}>
									{user}
								</option>
							);
						})}
					</select>
				</div>
				<div className="form-group">
					<label>Description: </label>
					<input
						type="text"
						required
						className="form-control"
						value={pageState.description}
						onChange={(e) =>
							setPageState({ ...pageState, description: e.target.value })
						}
					/>
				</div>
				<div className="form-group">
					<label>Duration (in minutes): </label>
					<input
						type="text"
						className="form-control"
						value={pageState.duration}
						onChange={(e) =>
							setPageState({ ...pageState, duration: e.target.value })
						}
					/>
				</div>
				<div className="form-group">
					<label>Date: </label>
					<div>
						<DatePicker
							selected={pageState.date}
							onChange={(date) => setPageState({ ...pageState, date: date })}
						/>
					</div>
				</div>

				<div className="form-group">
					<input
						type="submit"
						value="Create Exercise Log"
						className="btn btn-primary"
					/>
				</div>
			</form>
		</div>
	);
}

export default CreateExercises;
