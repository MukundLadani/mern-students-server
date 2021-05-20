const { Schema, model } = require("mongoose");

const studentSchema = new Schema({
	name: String,
	rollNo: Number,
	marks: Number,
	city: String,
});

const studentModel = model("Student", studentSchema);

module.exports = { studentModel };
