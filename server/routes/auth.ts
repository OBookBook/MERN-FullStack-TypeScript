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

// login
// POST:http://localhost:3000/api/auth/login
// body:raw, json
// {
//   "email": "test@co.jp",
//   "password": "testtest"
// }
router.post("/login", async (req: express.Request, res: express.Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) res.status(404).json("user not found");

    const valiedPassword = req.body.password === user?.password;
    if (!valiedPassword) res.status(400).json("wrong password");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
