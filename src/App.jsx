import { useEffect, useRef, useState } from "react";
import Login from "./login/Login";

function App() {
  const [loggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem("pickem_logged_in") === "true";
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [currentUserName, setCurrentUserName] = useState(() => {
    return localStorage.getItem("pickem_user_name") || "";
  });
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isEntriesSheetOpen, setIsEntriesSheetOpen] = useState(false);
  const [entryPendingDelete, setEntryPendingDelete] = useState(null);
  const [entriesLocked, setEntriesLocked] = useState(false);
  const [mobileCreateNotice, setMobileCreateNotice] = useState("");
  const mobileNoticeTimerRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("pickem_logged_in", String(loggedIn));
    if (currentUserName) {
      localStorage.setItem("pickem_user_name", currentUserName);
    } else {
      localStorage.removeItem("pickem_user_name");
    }
  }, [loggedIn, currentUserName]);

  useEffect(() => {
    if (!loggedIn || !currentUserName) return;
    loadEntries(currentUserName);
  }, [loggedIn, currentUserName]);

  useEffect(() => {
    if (!loggedIn) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [loggedIn]);

  function handleLogout() {
    setLoggedIn(false);
    setCurrentUserName("");
    setEntries([]);
    setSelectedEntry(null);
    setIsEntriesSheetOpen(false);
    setEntryPendingDelete(null);
    setEntriesLocked(false);
    setMobileCreateNotice("");
    setErrorMessage("");
  }

  useEffect(() => {
    return () => {
      if (mobileNoticeTimerRef.current) {
        clearTimeout(mobileNoticeTimerRef.current);
      }
    };
  }, []);

  async function loadEntries(username, preferredSelectedId = null) {
    try {
      const response = await fetch(
        `/api/entries?username=${encodeURIComponent(username)}&t=${Date.now()}`
      );

      if (!response.ok) {
        const body = await response.text();
        throw new Error(`Entries fetch failed (${response.status}): ${body || "No response body"}`);
      }

      const data = await response.json();
      const nextEntries = Array.isArray(data.entries) ? data.entries : [];
      setEntriesLocked(Boolean(data.entriesLocked));

      setEntries(nextEntries);
      setSelectedEntry((previousSelected) => {
        const desired = preferredSelectedId ?? previousSelected;
        if (desired && nextEntries.some((entry) => entry.id === desired)) {
          return desired;
        }

        return nextEntries[0]?.id ?? null;
      });
    } catch (error) {
      console.error("Load entries failed:", error);
      setErrorMessage(String(error.message || error));
    }
  }

  async function handleNewEntry() {
    if (!currentUserName) return;
    if (entriesLocked) {
      setErrorMessage("Entries are locked.");
      return;
    }

    setErrorMessage("");

    try {
      const response = await fetch("/api/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: currentUserName }),
      });

      if (!response.ok) {
        if (response.status === 403) {
          setErrorMessage("Entries are locked.");
          await loadEntries(currentUserName, selectedEntry);
          return;
        }
        const body = await response.text();
        throw new Error(`Create entry failed (${response.status}): ${body || "No response body"}`);
      }

      const data = await response.json();
      const created = data.entry;

      if (!created?.id) {
        throw new Error("Create entry failed: invalid response payload");
      }

      setEntries((prevEntries) =>
        [...prevEntries, created].sort((a, b) => a.entryNumber - b.entryNumber)
      );
      setSelectedEntry(created.id);
      setMobileCreateNotice(`${currentUserName} ${created.entryNumber} created`);
      if (mobileNoticeTimerRef.current) {
        clearTimeout(mobileNoticeTimerRef.current);
      }
      mobileNoticeTimerRef.current = setTimeout(() => {
        setMobileCreateNotice("");
      }, 1800);
    } catch (error) {
      console.error("Create entry failed:", error);
      setErrorMessage(String(error.message || error));
    }
  }

  async function confirmDeleteEntry(entry) {
    if (!entry?.id || !currentUserName) {
      setEntryPendingDelete(null);
      return;
    }

    if (entriesLocked || entry.isLocked) {
      setErrorMessage("Entries are locked.");
      setEntryPendingDelete(null);
      return;
    }

    try {
      const response = await fetch(
        `/api/entries?id=${encodeURIComponent(entry.id)}&username=${encodeURIComponent(currentUserName)}`,
        { method: "DELETE" }
      );

      if (response.status === 403) {
        setErrorMessage("Entries are locked.");
        await loadEntries(currentUserName, selectedEntry);
        return;
      }

      if (!response.ok) {
        const body = await response.text();
        throw new Error(`Delete entry failed (${response.status}): ${body || "No response body"}`);
      }

      setEntries((prevEntries) => {
        const nextEntries = prevEntries.filter((candidate) => candidate.id !== entry.id);

        if (selectedEntry === entry.id) {
          const fallback = nextEntries[nextEntries.length - 1]?.id ?? null;
          setSelectedEntry(fallback);
        }

        return nextEntries;
      });
    } catch (error) {
      console.error("Delete entry failed:", error);
      setErrorMessage(String(error.message || error));
    } finally {
      setEntryPendingDelete(null);
    }
  }

  function handleSelectEntry(entryId, closeSheet = false) {
    setSelectedEntry(entryId);
    if (closeSheet) {
      setIsEntriesSheetOpen(false);
    }
  }

  function renderEntries(closeSheetOnSelect = false, extraClassName = "") {
    return (
      <div className={`entry-list ${extraClassName}`.trim()}>
        {entries.map((entry) => (
          <div
            className={`entry-box ${selectedEntry === entry.id ? "selected" : ""}`}
            key={entry.id}
            role="button"
            tabIndex={0}
            onClick={() => handleSelectEntry(entry.id, closeSheetOnSelect)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleSelectEntry(entry.id, closeSheetOnSelect);
              }
            }}
          >
            <span className="entry-label">
              {currentUserName} {entry.entryNumber}
            </span>
            {!entriesLocked && !entry.isLocked && (
              <button
                className="entry-delete"
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setEntryPendingDelete(entry);
                }}
                aria-label={`Delete ${currentUserName} ${entry.entryNumber}`}
              >
                x
              </button>
            )}
          </div>
        ))}
      </div>
    );
  }

  async function handleSignUp(username, email, password) {
    setErrorMessage("");

    try {
      const loginResponse = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!loginResponse.ok) {
        const loginBody = await loginResponse.text();
        throw new Error(
          `Login request failed (${loginResponse.status}): ${loginBody || "No response body"}`
        );
      }

      setCurrentUserName(username);
      setLoggedIn(true);
    } catch (error) {
      console.error("Sign up failed:", error);
      setErrorMessage(String(error.message || error));
    }
  }

  async function handleLogIn(username, password) {
    setErrorMessage("");

    try {
      const loginResponse = await fetch("/api/auth-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!loginResponse.ok) {
        const loginBody = await loginResponse.text();
        throw new Error(
          `Login request failed (${loginResponse.status}): ${loginBody || "No response body"}`
        );
      }

      const data = await loginResponse.json();
      setCurrentUserName(data.username || username);
      setLoggedIn(true);
    } catch (error) {
      console.error("Login flow failed:", error);
      setErrorMessage(String(error.message || error));
    }
  }

  const selectedEntryObject = entries.find((entry) => entry.id === selectedEntry) || null;

  return (
    <main className={loggedIn ? "home-shell" : ""}>
      {!loggedIn && (
        <section className="signup-page">
          <h1 className="signup-brand">PickEm</h1>
          <Login onSignUp={handleSignUp} onLogIn={handleLogIn} />
        </section>
      )}
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
          <section className="home-layout">
            <aside className="left-sidebar">
              {!entriesLocked && (
                <button className="sidebar-button" type="button" onClick={handleNewEntry}>
                  New Entry
                </button>
              )}
              <button
                className="entries-launch"
                type="button"
                onClick={() => setIsEntriesSheetOpen(true)}
                aria-expanded={isEntriesSheetOpen}
                aria-label="Toggle entries"
              >
                Entries ({entries.length})
              </button>
              {mobileCreateNotice && <p className="mobile-create-notice">{mobileCreateNotice}</p>}
              {renderEntries(false, "desktop-entry-list")}
            </aside>
            <section className="home-main">
              <div className="selected-entry-card">
                <p className="selected-entry-label">Selected Entry</p>
                <p className="selected-entry-value">
                  {selectedEntryObject
                    ? `${currentUserName} ${selectedEntryObject.entryNumber}`
                    : "None selected"}
                </p>
              </div>
            </section>
          </section>
          {isEntriesSheetOpen && (
            <div className="entries-sheet-backdrop" onClick={() => setIsEntriesSheetOpen(false)}>
              <section className="entries-sheet" onClick={(event) => event.stopPropagation()}>
                <header className="entries-sheet-header">
                  <strong>Entries</strong>
                  <button
                    className="entries-close"
                    type="button"
                    onClick={() => setIsEntriesSheetOpen(false)}
                  >
                    Close
                  </button>
                </header>
                {renderEntries(true, "mobile-entry-list")}
              </section>
            </div>
          )}
        </section>
      )}
      {entryPendingDelete !== null && (
        <div className="confirm-backdrop" onClick={() => setEntryPendingDelete(null)}>
          <section className="confirm-modal" onClick={(event) => event.stopPropagation()}>
            <h2>Delete Entry</h2>
            <p>
              Delete "{currentUserName} {entryPendingDelete.entryNumber}"?
            </p>
            <div className="confirm-actions">
              <button
                type="button"
                className="confirm-cancel"
                onClick={() => setEntryPendingDelete(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="confirm-delete"
                onClick={() => confirmDeleteEntry(entryPendingDelete)}
              >
                Delete
              </button>
            </div>
          </section>
        </div>
      )}
      {loggedIn && errorMessage && <p>{errorMessage}</p>}
    </main>
  );
}

export default App;
