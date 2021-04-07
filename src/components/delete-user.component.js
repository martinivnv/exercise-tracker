import React, { useState, useEffect } from "react";
import axios from "axios";

function DeleteUser() {
	const [pageState, setPageState] = useState({
		users: [],
		username: "",
		ids: [],
		id: "",
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
						ids: res.data.map((user) => user._id),
						id: res.data[0]._id,
					});
				}
			})
			.catch((err) => console.log(err));
	}, []);

	function onSubmit(e) {
		e.preventDefault();
		axios
			.delete("http://localhost:5000/users/" + pageState.id)
			.then((res) => console.log(res.data))
			.catch((err) => console.log(err));
		window.location = "/";
	}

	return (
		<div>
			<h3>Delete User</h3>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label>Username: </label>
					<select
						required
						className="form-control"
						value={pageState.username}
						onChange={(e) =>
							setPageState({
								...pageState,
								username: e.target.value,
								id: pageState.ids[pageState.users.indexOf(e.target.value)],
							})
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
					<input
						type="submit"
						value="Delete User"
						className="btn btn-primary"
					/>
				</div>
			</form>
		</div>
	);
}

export default DeleteUser;
