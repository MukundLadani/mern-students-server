const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { studentModel } = require("./models/student");

const server = express();

server.use(express.json());
server.use(cors());

// GET
server.get("/students", async (req, res) => {
	const students = await studentModel.find();

	if (students) {
		res
			.status(200)
			.json({ data: students, message: "Students fetched successfully" });
	} else {
		res
			.status(200)
			.json({ message: "No students" });
	}
});

//POST
server.post("/student", async (req, res) => {
	const studentData = req.body;

	if (
		studentData.name &&
		studentData.rollNo &&
		studentData.marks &&
		studentData.city
	) {
		const createdPromise = await studentModel.create({ ...studentData });

		if (createdPromise) {
			res.status(200).json({ message: "Student created successfully" });
		} else {
			res.status(500).json({ message: "Some error occurred: " + error });
		}
	} else {
		res.status(400).json({ message: "Bad Request" });
	}

	// 200 - SUCCESS
	// 500 - ERROR
	// 404 - UNAUTHENTICATED
	// 400 - BAD REQUEST
});

const connectionStr = "mongodb://localhost:27017/student-database";

mongoose
	.connect(connectionStr, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		server.listen(5000, () => {
			console.log("Server running on port 5000");
		});
	})
	.catch((error) => {
		console.log("Some error occured" + error);
	});
