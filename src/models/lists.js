import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
  descricao: { type: String, required: true }, // Alteração feita aqui
  data: { type: String, required: false },
  hora: { type: String, required: false },
});

const List = mongoose.model("List", listSchema); // Renomeado para "List" (singular)

export default List;
