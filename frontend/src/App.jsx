import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import AddContact from "./components/AddContact.jsx";
import AuthPanel from "./components/AuthPanel.jsx";
import SearchContact from "./components/SearchContact.jsx";
import ContactList from "./components/ContactList.jsx";

const LEGACY_CONTACTS_API = import.meta.env.VITE_API_BASE_URL;
const API_ROOT =
  import.meta.env.VITE_API_ROOT ||
  (LEGACY_CONTACTS_API
    ? LEGACY_CONTACTS_API.replace(/\/contacts\/?$/, "")
    : "http://localhost:5000/api");
const CONTACTS_API = LEGACY_CONTACTS_API || `${API_ROOT}/contacts`;
const AUTH_API = `${API_ROOT}/auth`;
const TOKEN_KEY = "contact_manager_token";
const USER_KEY = "contact_manager_user";

function App() {
  const [contacts, setContacts] = useState([]);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || "");
  const [currentUser, setCurrentUser] = useState(() => {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;

    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  });

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

  const authConfig = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    : {};

  const persistSession = (sessionToken, user) => {
    localStorage.setItem(TOKEN_KEY, sessionToken);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    setToken(sessionToken);
    setCurrentUser(user);
  };

  const clearSession = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken("");
    setCurrentUser(null);
    setContacts([]);
    setSuggestions([]);
    setQuery("");
    setEditingContact(null);
  };

  const fetchContacts = async () => {
    if (!token) return;

    setLoading(true);
    try {
      const response = await axios.get(CONTACTS_API, authConfig);
      setContacts(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        clearSession();
        setError("Session expired. Please login again.");
      } else {
        setError(error.response?.data?.message || "Could not fetch contacts");
      }
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
      const response = await axios.get(
        `${CONTACTS_API}/suggest?q=${encodeURIComponent(value)}`,
        authConfig
      );
      setSuggestions(response.data);
    } catch {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchContacts();
  }, [token]);

  useEffect(() => {
    if (!token) return;

    const timer = setTimeout(() => {
      fetchSuggestions(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, token]);

  const handleRegister = async (payload) => {
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await axios.post(`${AUTH_API}/register`, payload);
      persistSession(response.data.token, response.data.user);
      setSuccess("Account created successfully");
    } catch (error) {
      setError(error.response?.data?.message || "Could not create account");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (payload) => {
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await axios.post(`${AUTH_API}/login`, payload);
      persistSession(response.data.token, response.data.user);
      setSuccess("Logged in successfully");
    } catch (error) {
      setError(error.response?.data?.message || "Could not login");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (payload) => {
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      await axios.post(CONTACTS_API, payload, authConfig);
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
      await axios.put(`${CONTACTS_API}/${id}`, payload, authConfig);
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
      await axios.delete(`${CONTACTS_API}/${id}`, authConfig);
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

  if (!token || !currentUser) {
    return (
      <>
        {status.message && <p className={`status ${status.type}`}>{status.message}</p>}
        <AuthPanel onLogin={handleLogin} onRegister={handleRegister} loading={loading} />
      </>
    );
  }

  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">Modern Contact Book</p>
        <h1>Contact Manager</h1>
        <p>Welcome, {currentUser.name}</p>
        <button type="button" className="ghost" onClick={clearSession}>
          Logout
        </button>
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
