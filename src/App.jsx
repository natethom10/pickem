import { useState } from "react";
import Login from "./login/Login";

const SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbzr34rfDKiL1lb4goXwgoXN2_jqsoEzpuVe169m8AAsvClmWy4tRF2f4z7ZpGiwsWRmYQ/exec";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  async function StoreLogin(fullName, password) {
    try {
      await fetch(SHEETS_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, password }),
      });
    } catch (error) {
      console.error("Error sending data:", error);
    }

    setLoggedIn(true);
  }

  return (
    <main>
      {!loggedIn && <Login StoreLogin={StoreLogin} />}
      {loggedIn && <h1>Logged in!</h1>}
    </main>
  );
}

export default App;
