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

// GET:http://localhost:3000/api/users/:id
// example:http://localhost:3000/api/users/6824978b87324240baccd640
// body:raw, json
// {
//   "userId": "6824978b87324240baccd640"
// }
router.get("/:id", async (req: express.Request, res: express.Response) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user?.toObject() || {};
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
});

// PUT:http://localhost:3000/api/users/:id/follow
// example:http://localhost:3000/api/users/6824978b87324240baccd640/follow
// body:raw, json
// {
//   "userId": "6824984c4d9a38897d7fdf6c",
// }
router.put(
  "/:id/follow",
  async (req: express.Request, res: express.Response) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (!user?.followers.includes(req.body.userId)) {
          await user?.updateOne({
            $push: {
              followers: req.body.userId,
            },
          });
          await currentUser?.updateOne({
            $push: {
              followings: req.params.id,
            },
          });
          res.status(200).json("user has been followed");
        } else {
          res.status(403).json("you already follow this user");
        }
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(500).json("can't follow yourself");
    }
  }
);

// PUT:http://localhost:3000/api/users/:id/unfollow
// example:http://localhost:3000/api/users/6824978b87324240baccd640/unfollow
// body:raw, json
// {
//   "userId": "6824984c4d9a38897d7fdf6c",
// }
router.put(
  "/:id/unfollow",
  async (req: express.Request, res: express.Response) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (user?.followers.includes(req.body.userId)) {
          await user?.updateOne({
            $pull: {
              followers: req.body.userId,
            },
          });
          await currentUser?.updateOne({
            $pull: {
              followings: req.params.id,
            },
          });
          res.status(200).json("user has been unfollowed");
        } else {
          res.status(403).json("you don't follow this user");
        }
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(500).json("can't unfollow yourself");
    }
  }
);
export default router;
