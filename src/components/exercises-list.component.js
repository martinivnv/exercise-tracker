import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Exercise = (props) => (
	<tr>
		<td>{props.exercise.username}</td>
		<td>{props.exercise.description}</td>
		<td>{props.exercise.duration}</td>
		<td>{props.exercise.date.substring(0, 10)}</td>
		<td>
			<Link to={"/edit/" + props.exercise._id}>Edit</Link> |{" "}
			<a
				href="#"
				onClick={() => {
					props.deleteExercise(props.exercise._id);
				}}
			>
				Delete
			</a>
		</td>
	</tr>
);

function ExercisesList() {
	const [list, setList] = useState({
		exercises: [],
	});

	useEffect(() => {
		axios
			.get("http://localhost:5000/exercises/")
			.then((res) => {
				if (res.data.length > 0) {
					setList({ exercises: res.data });
				}
			})
			.catch((err) => console.log(err));
	}, []);

	function deleteExercise(id) {
		axios
			.delete("http://localhost:5000/exercises/" + id)
			.then((res) => console.log(res.data))
			.catch((err) => console.log(err));

		setList({
			exercises: list.exercises.filter((ex) => ex._id !== id),
		});
	}

	function displayList() {
		return list.exercises.map((currentExercise) => {
			return (
				<Exercise
					exercise={currentExercise}
					deleteExercise={deleteExercise}
					key={currentExercise._id}
				/>
			);
		});
	}

	return (
		<div>
			<h3>Logged Exercises</h3>
			<table className="table">
				<thead className="thead-light">
					<tr>
						<th>Username</th>
						<th>Description</th>
						<th>Duration</th>
						<th>Date</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>{displayList()}</tbody>
			</table>
		</div>
	);
}

export default ExercisesList;
