import express, { Router } from "express";
import User from "../models/User";

const router: Router = express.Router();

// PUT:http://localhost:3000/api/users/:id
// example:http://localhost:3000/api/users/682498654d9a38897d7fdf6e
// body:raw, json
// {
//   "userId": "682498654d9a38897d7fdf6e",
//   "username": "testtest-2"
// }
router.put("/:id", async (req: express.Request, res: express.Response) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("updated user");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("you can update only your account");
  }
});

// DELETE:http://localhost:3000/api/users/:id
// example:http://localhost:3000/api/users/682498654d9a38897d7fdf6e
// body:raw, json
// {
//   "userId": "682498654d9a38897d7fdf6e",
// }
router.delete("/:id", async (req: express.Request, res: express.Response) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("deleted user");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("you can delete only your account");
  }
});

export default router;
