import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import AddContact from "./components/AddContact.jsx";
import SearchContact from "./components/SearchContact.jsx";
import ContactList from "./components/ContactList.jsx";

const API_BASE = "http://localhost:5000/api/contacts";

function App() {
  const [contacts, setContacts] = useState([]);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const visibleContacts = useMemo(() => {
    if (!query.trim()) return contacts;

    const search = query.toLowerCase();
    return contacts.filter((item) =>
      [item.name, item.phone, item.email].some((value) =>
        String(value).toLowerCase().includes(search)
      )
    );
  }, [contacts, query]);

  const setSuccess = (message) => setStatus({ type: "success", message });
  const setError = (message) => setStatus({ type: "error", message });

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_BASE);
      setContacts(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Could not fetch contacts");
    } finally {
      setLoading(false);
    }
  };

  const fetchSuggestions = async (value) => {
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(`${API_BASE}/suggest?q=${encodeURIComponent(value)}`);
      setSuggestions(response.data);
    } catch {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSuggestions(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleCreate = async (payload) => {
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      await axios.post(API_BASE, payload);
      setSuccess("Contact added");
      await fetchContacts();
    } catch (error) {
      setError(error.response?.data?.message || "Could not add contact");
      setLoading(false);
    }
  };

  const handleUpdate = async (id, payload) => {
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      await axios.put(`${API_BASE}/${id}`, payload);
      setEditingContact(null);
      setSuccess("Contact updated");
      await fetchContacts();
    } catch (error) {
      setError(error.response?.data?.message || "Could not update contact");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      await axios.delete(`${API_BASE}/${id}`);
      if (editingContact?._id === id) {
        setEditingContact(null);
      }
      setSuccess("Contact deleted");
      await fetchContacts();
    } catch (error) {
      setError(error.response?.data?.message || "Could not delete contact");
      setLoading(false);
    }
  };

  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">Modern Contact Book</p>
        <h1>Contact Manager</h1>
      </section>

      {status.message && <p className={`status ${status.type}`}>{status.message}</p>}

      <div className="layout">
        <AddContact
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          editingContact={editingContact}
          clearEditing={() => setEditingContact(null)}
          loading={loading}
        />

        <div className="right-column">
          <SearchContact query={query} setQuery={setQuery} suggestions={suggestions} />
          <ContactList
            contacts={visibleContacts}
            onEdit={setEditingContact}
            onDelete={handleDelete}
            loading={loading}
          />
        </div>
      </div>
    </main>
  );
}

export default App;
