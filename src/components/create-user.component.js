import React, { useState } from "react";
import axios from "axios";

function CreateUser() {
	const [user, setUser] = useState({
		username: "",
	});

	function onSubmit(e) {
		e.preventDefault();
		setUser({ username: "" });
		axios
			.post("http://localhost:5000/users/add", user)
			.then((res) => console.log(res.data))
			.catch((err) => console.log(err));
	}

	return (
		<div>
			<h3>Create New User</h3>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label>Username: </label>
					<input
						type="text"
						required
						className="form-control"
						value={user.username}
						onChange={(e) => setUser({ username: e.target.value })}
					/>
				</div>
				<div className="form-group">
					<input
						type="submit"
						value="Create User"
						className="btn btn-primary"
					/>
				</div>
			</form>
		</div>
	);
}

export default CreateUser;
