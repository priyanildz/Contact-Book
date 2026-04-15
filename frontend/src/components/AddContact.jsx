import { useEffect, useState } from "react";

const initialForm = {
  name: "",
  phone: "",
  email: ""
};

function AddContact({ onCreate, onUpdate, editingContact, clearEditing, loading }) {
  const [formData, setFormData] = useState(initialForm);
  const isEditing = Boolean(editingContact);

  useEffect(() => {
    if (editingContact) {
      setFormData({
        name: editingContact.name || "",
        phone: editingContact.phone || "",
        email: editingContact.email || ""
      });
    } else {
      setFormData(initialForm);
    }
  }, [editingContact]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: digitsOnly }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isEditing) {
      await onUpdate(editingContact._id, formData);
      return;
    }

    await onCreate(formData);
    setFormData(initialForm);
  };

  const handleCancel = () => {
    setFormData(initialForm);
    clearEditing();
  };

  return (
    <section className="panel add-panel">
      <h2>{isEditing ? "Update Contact" : "Add New Contact"}</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full name"
          required
        />
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="10-digit phone"
          type="tel"
          inputMode="numeric"
          maxLength={10}
          required
          pattern="[0-9]{10}"
          title="Phone must be exactly 10 digits"
        />
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          required
        />
        <div className="actions">
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : isEditing ? "Update" : "Add"}
          </button>
          {isEditing && (
            <button type="button" className="ghost" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default AddContact;
