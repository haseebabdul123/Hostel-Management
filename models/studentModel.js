import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    first: String,
    last: String,
  },
  gender: { String },
  contact: {
    email: String,
    phone: String,
  },
  address: {
    type: String,
  },
  room: {
    type: String,
  },
  checkInDate: Date,
  checkOutDate: Date,
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String,
  },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
