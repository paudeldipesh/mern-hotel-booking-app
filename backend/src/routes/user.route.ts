import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import { User } from "../models/user.model";
import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();

// User registration API: /api/users/me
router.get("/me", verifyToken, async (req: Request, res: Response) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

// User registration API: /api/users/register
router.post(
  "/register",
  [
    check("firstName", "First name is required").isString(),
    check("lastName", "Last name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array(),
      });
    }

    try {
      let user = await User.findOne({
        email: req.body.email,
      });

      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      user = new User(req.body);

      await user.save();

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("auth-token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 86400000,
      });

      return res.status(200).send({
        message: "User registered OK",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Something went wrong",
      });
    }
  }
);

export default router;
