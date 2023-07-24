import express from "express";
import ListController from "../controllers/listController.js";

const router = express.Router();

router
  .get("/", ListController.getAllLists)
  .post("/", ListController.createLists)
  .put("/:id", ListController.updateLists)
  .get("/:id", ListController.getByIdLists)
  .delete("/:id", ListController.deleteLists)
  .delete("/", ListController.deleteAllLists);

export default router;
