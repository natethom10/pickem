import { useState } from "react";

function Login({ StoreLogin }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await StoreLogin(fullName, email, password);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="login-card">
      <h1>Sign Up</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          autoComplete="name"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          disabled={isSubmitting}
          required
        />

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

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          disabled={isSubmitting}
          required
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </section>
  );
}

export default Login;
