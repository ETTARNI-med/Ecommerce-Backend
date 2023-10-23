import express from "express";
import {
  updateCustomer,
  validateCustomer,
  removeCustomer,
  getCustomerProfile,
  updateCustomerProfile,
} from "./controllers/customersController";
import { login } from "./controllers/authController";
import { virifyToken } from "/middleware/authMiddleware";

const router = express.Router();

//Customers Routes
router
  .route("/")
  .post("/login", login)
  .put("/validate/:id", virifyToken, validateCustomer)
  .put("/:id", virifyToken, updateCustomer)
  .get("/profile", virifyToken, getCustomerProfile)
  .patch("/profile/update", virifyToken, updateCustomerProfile)
  .delete("/delete", virifyToken, removeCustomer);

export default router;
