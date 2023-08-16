import lists from "../models/lists.js";

class ListController {
  static getAllLists = (req, res) => {
    lists.find((err, lists) => {
      res.status(200).json(lists);
    });
  };

  static createLists = (req, res) => {
    let list = new lists(req.body);

    list.save((err) => {
      if (err) {
        res
          .status(500)
          .send({ message: `${err.message} - falha ao cadastrar lista` });
      } else {
        res.status(201).send(list.toJSON());
      }
    });
  };

  static getAllLists = (req, res) => {
    lists.find((err, lists) => {
      res.status(200).json(lists);
    });
  };

  static getByIdLists = (req, res) => {
    const id = req.params.id;

    lists.findById(id, (err, lists) => {
      if (err) {
        res
          .status(400)
          .send({ mensage: `${err.message} - Id da lista não localizado` });
      } else {
        res.status(200).send(lists);
      }
    });
  };

  static updateLists = (req, res) => {
    const id = req.params.id;

    lists.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).send({ message: "lista atualizado com sucesso" });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };

  static deleteLists = (req, res) => {
    const id = req.params.id;

    lists.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: "lista removido com sucesso" });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };

  static deleteAllLists = async (req, res) => {
    try {
      await lists.deleteMany({});
      res
        .status(200)
        .send({ message: "Todos as lists foram removidas com sucesso" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
}

export default ListController;
