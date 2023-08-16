import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
  description: { type: String, required: true }, // Alteração feita aqui
  date: { type: String, required: false },
  hours: { type: String, required: false },
});

const List = mongoose.model("List", listSchema); // Renomeado para "List" (singular)

export default List;
