import { Router } from "express";
import {
  createContact,
  deleteContact,
  getContactById,
  getContacts,
  suggestContacts,
  updateContact
} from "../controllers/contactController.js";

const router = Router();

router.get("/", getContacts);
router.get("/suggest", suggestContacts);
router.get("/:id", getContactById);
router.post("/", createContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

export default router;
