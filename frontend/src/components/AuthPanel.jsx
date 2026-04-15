import { useState } from "react";

const initialState = {
  name: "",
  email: "",
  password: ""
};

function AuthPanel({ onLogin, onRegister, loading }) {
  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState(initialState);

  const isRegister = mode === "register";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isRegister) {
      await onRegister(formData);
      return;
    }

    await onLogin({ email: formData.email, password: formData.password });
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setFormData(initialState);
  };

  return (
    <main className="app-shell">
      <section className="hero auth-hero">
        <p className="eyebrow">Private Contact Space</p>
        <h1>Sign in to manage your contacts</h1>
      </section>

      <section className="panel auth-panel">
        <div className="auth-switch">
          <button
            type="button"
            className={mode === "login" ? "active" : "ghost"}
            onClick={() => switchMode("login")}
          >
            Login
          </button>
          <button
            type="button"
            className={mode === "register" ? "active" : "ghost"}
            onClick={() => switchMode("register")}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          {isRegister && (
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          )}
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            required
          />
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            type="password"
            minLength={6}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Please wait..." : isRegister ? "Create account" : "Login"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default AuthPanel;
