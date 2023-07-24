import Router from 'express';
import List from "../models/lists.js";

const router = Router();

// router.get("/", function (req, res) {
//     res.status(200).send({
//         title: "Hello World! Bem vindas ao To Do List!",
//         version: "1.0.0"
//     })
// })


// GET all lists
router.get('/', async (req, res) => {
    try {
        const lists = await List.find();
        res.json(lists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new task
router.post('/', async (req, res) => {
    const list = new List({
        description: req.body.description
    });

    try {
        const newList = await list.save();
        res.status(201).json(newList);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

export default router;
