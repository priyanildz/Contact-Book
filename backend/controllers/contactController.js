import Contact from "../models/contactModel.js";

const normalizeName = (name = "") => name.trim().toLowerCase();

export const getContacts = async (req, res) => {
  try {
    const { q } = req.query;
    const filter = q
      ? {
          $or: [
            { name: { $regex: q, $options: "i" } },
            { email: { $regex: q, $options: "i" } },
            { phone: { $regex: q, $options: "i" } }
          ]
        }
      : {};

    const contacts = await Contact.find(filter).sort({ name: 1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contacts", error: error.message });
  }
};

export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contact", error: error.message });
  }
};

export const createContact = async (req, res) => {
  try {
    const payload = {
      name: normalizeName(req.body.name),
      phone: (req.body.phone || "").trim(),
      email: (req.body.email || "").trim().toLowerCase()
    };

    const existingContact = await Contact.findOne({
      $or: [{ name: payload.name }, { phone: payload.phone }, { email: payload.email }]
    });

    if (existingContact) {
      return res.status(409).json({ message: "Name, phone, or email already exists" });
    }

    const created = await Contact.create(payload);
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ message: "Failed to create contact", error: error.message });
  }
};

export const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    const updatedData = {
      name: req.body.name ? normalizeName(req.body.name) : contact.name,
      phone: req.body.phone ? req.body.phone.trim() : contact.phone,
      email: req.body.email ? req.body.email.trim().toLowerCase() : contact.email
    };

    const conflict = await Contact.findOne({
      _id: { $ne: contact._id },
      $or: [{ name: updatedData.name }, { phone: updatedData.phone }, { email: updatedData.email }]
    });

    if (conflict) {
      return res.status(409).json({ message: "Name, phone, or email already exists" });
    }

    const updated = await Contact.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
      runValidators: true
    });

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: "Failed to update contact", error: error.message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete contact", error: error.message });
  }
};

export const suggestContacts = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || !q.trim()) {
      return res.status(200).json([]);
    }

    const suggestions = await Contact.find({
      name: { $regex: q.trim(), $options: "i" }
    })
      .sort({ name: 1 })
      .limit(5)
      .select("name phone email");

    res.status(200).json(suggestions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch suggestions", error: error.message });
  }
};
