import { useEffect, useState } from "react";
import Login from "./login/Login";

function App() {
  const [loggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem("pickem_logged_in") === "true";
  });
  const [sheetCredentials, setSheetCredentials] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentUserName, setCurrentUserName] = useState(() => {
    return localStorage.getItem("pickem_user_name") || "";
  });

  useEffect(() => {
    localStorage.setItem("pickem_logged_in", String(loggedIn));
    if (currentUserName) {
      localStorage.setItem("pickem_user_name", currentUserName);
    } else {
      localStorage.removeItem("pickem_user_name");
    }
  }, [loggedIn, currentUserName]);

  function handleLogout() {
    setLoggedIn(false);
    setCurrentUserName("");
    setSheetCredentials([]);
    setErrorMessage("");
  }

  async function StoreLogin(fullName, email, password) {
    setErrorMessage("");

    try {
      const loginResponse = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      if (!loginResponse.ok) {
        const loginBody = await loginResponse.text();
        throw new Error(
          `Login request failed (${loginResponse.status}): ${loginBody || "No response body"}`
        );
      }

      const usersResponse = await fetch(`/api/users?t=${Date.now()}`);
      if (!usersResponse.ok) {
        const usersBody = await usersResponse.text();
        throw new Error(
          `Users request failed (${usersResponse.status}): ${usersBody || "No response body"}`
        );
      }

      const data = await usersResponse.json();
      const users = Array.isArray(data) ? data : data.users || [];

      const credentials = users
        .map((user) => ({
          fullName: user.fullName ?? "",
          email: user.email ?? "",
          password: user.password ?? "",
        }))
        .filter((entry) => entry.fullName || entry.email || entry.password);

      setSheetCredentials(credentials);
      console.table(credentials);
      setCurrentUserName(fullName);
      setLoggedIn(true);
    } catch (error) {
      console.error("Login flow failed:", error);
      setErrorMessage(String(error.message || error));
    }
  }

  return (
    <main className={loggedIn ? "home-shell" : ""}>
      {!loggedIn && <Login StoreLogin={StoreLogin} />}
      {!loggedIn && errorMessage && <p>{errorMessage}</p>}
      {loggedIn && (
        <section className="home-page">
          <header className="home-header">
            <div className="header-left">
              <span className="brand">PickEm</span>
              <span className="brand-divider" aria-hidden="true" />
              <span className="current-user">{currentUserName}</span>
            </div>
            <button className="logout-button" onClick={handleLogout} type="button">
              Log Out
            </button>
          </header>
        </section>
      )}
    </main>
  );
}

export default App;
