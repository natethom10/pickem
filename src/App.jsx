import { useState } from "react";
import Login from "./login/Login";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [sheetCredentials, setSheetCredentials] = useState([]);

  async function StoreLogin(fullName, password) {
    try {
      const loginResponse = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, password }),
      });

      if (!loginResponse.ok) {
        throw new Error("Login request failed");
      }

      const usersResponse = await fetch(`/api/users?t=${Date.now()}`);
      if (!usersResponse.ok) {
        throw new Error("Users request failed");
      }

      const data = await usersResponse.json();
      const users = Array.isArray(data) ? data : data.users || [];

      const credentials = users
        .map((user) => ({
          fullName: user.fullName ?? "",
          password: user.password ?? "",
        }))
        .filter((entry) => entry.fullName || entry.password);

      setSheetCredentials(credentials);
      console.table(credentials);
      setLoggedIn(true);
    } catch (error) {
      console.error("Login flow failed:", error);
    }
  }

  return (
    <main>
      {!loggedIn && <Login StoreLogin={StoreLogin} />}
      {loggedIn && (
        <>
          <h1>Logged in!</h1>
          {sheetCredentials.length > 0 && (
            <pre>{JSON.stringify(sheetCredentials, null, 2)}</pre>
          )}
        </>
      )}
    </main>
  );
}

export default App;
