import express, { Router } from "express";
import User from "../models/User";

const router: Router = express.Router();

// POST:http://localhost:3000/api/auth/register
// body:raw, json
// {
//   "username": "testtest",
//   "email": "test@co.jp",
//   "password": "testtest"
// }
router.post(
  "/register",
  async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

export default router;
