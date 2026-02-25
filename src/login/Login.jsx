import { useState } from "react";

function Login({ onSignUp, onLogIn }) {
  const [mode, setMode] = useState("signup");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      if (mode === "signup") {
        await onSignUp(username, email, password);
      } else {
        await onLogIn(username, password);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="login-card">
      <div className="auth-toggle" role="tablist" aria-label="Authentication Mode">
        <button
          type="button"
          className={mode === "signup" ? "active" : ""}
          onClick={() => setMode("signup")}
        >
          Sign Up
        </button>
        <button
          type="button"
          className={mode === "login" ? "active" : ""}
          onClick={() => setMode("login")}
        >
          Log In
        </button>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          disabled={isSubmitting}
          required
        />

        {mode === "signup" && (
          <>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={isSubmitting}
              required
            />
          </>
        )}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          disabled={isSubmitting}
          required
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? mode === "signup"
              ? "Signing Up..."
              : "Logging In..."
            : mode === "signup"
              ? "Sign Up"
              : "Log In"}
        </button>
      </form>
    </section>
  );
}

export default Login;
