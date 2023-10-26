import express from "express";
import {
  updateCustomer,
  validateCustomer,
  removeCustomer,
  getCustomerProfile,
  updateCustomerProfile,
  login,
} from "../controllers/customersController";
import { virifyToken } from "../middleware/customersMiddleware";

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
