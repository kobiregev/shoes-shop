import express from "express";
import requireUser from "../../middleware/requireUser";
import { getCartHandler } from "./cart.controller";

const router = express.Router();
// get cart ? , add to cart, modify cart, delete from cart
router.get("/", requireUser, getCartHandler);

export default router;
