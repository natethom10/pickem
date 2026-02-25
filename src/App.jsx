import { useEffect, useRef, useState } from "react";
import Login from "./login/Login";

const TEAM_LOGOS = {
  "Creighton": "https://a.espncdn.com/i/teamlogos/ncaa/500/156.png",
  "Louisville": "https://a.espncdn.com/i/teamlogos/ncaa/500/97.png",
  "Purdue": "https://a.espncdn.com/i/teamlogos/ncaa/500/2509.png",
  "High Point": "https://a.espncdn.com/i/teamlogos/ncaa/500/2272.png",
  "Wisconsin": "https://a.espncdn.com/i/teamlogos/ncaa/500/275.png",
  "Montana": "https://a.espncdn.com/i/teamlogos/ncaa/500/149.png",
  "Houston": "https://a.espncdn.com/i/teamlogos/ncaa/500/248.png",
  "SIU Edwardsville": "https://a.espncdn.com/i/teamlogos/ncaa/500/2565.png",
  "Auburn": "https://a.espncdn.com/i/teamlogos/ncaa/500/2.png",
  "Alabama State": "https://a.espncdn.com/i/teamlogos/ncaa/500/2011.png",
  "McNeese": "https://a.espncdn.com/i/teamlogos/ncaa/500/2377.png",
  "Clemson": "https://a.espncdn.com/i/teamlogos/ncaa/500/228.png",
  "BYU": "https://a.espncdn.com/i/teamlogos/ncaa/500/252.png",
  "VCU": "https://a.espncdn.com/i/teamlogos/ncaa/500/2670.png",
  "Gonzaga": "https://a.espncdn.com/i/teamlogos/ncaa/500/2250.png",
  "Georgia": "https://a.espncdn.com/i/teamlogos/ncaa/500/61.png",
  "Tennessee": "https://a.espncdn.com/i/teamlogos/ncaa/500/2633.png",
  "Wofford": "https://a.espncdn.com/i/teamlogos/ncaa/500/2747.png",
  "Arkansas": "https://a.espncdn.com/i/teamlogos/ncaa/500/8.png",
  "Kansas": "https://a.espncdn.com/i/teamlogos/ncaa/500/2305.png",
  "Texas A&M": "https://a.espncdn.com/i/teamlogos/ncaa/500/245.png",
  "Yale": "https://a.espncdn.com/i/teamlogos/ncaa/500/43.png",
  "Drake": "https://a.espncdn.com/i/teamlogos/ncaa/500/2181.png",
  "Missouri": "https://a.espncdn.com/i/teamlogos/ncaa/500/142.png",
  "UCLA": "https://a.espncdn.com/i/teamlogos/ncaa/500/26.png",
  "Utah State": "https://a.espncdn.com/i/teamlogos/ncaa/500/328.png",
  "St. John's": "https://a.espncdn.com/i/teamlogos/ncaa/500/2599.png",
  "Omaha": "https://a.espncdn.com/i/teamlogos/ncaa/500/2437.png",
  "Michigan": "https://a.espncdn.com/i/teamlogos/ncaa/500/130.png",
  "UC San Diego": "https://a.espncdn.com/i/teamlogos/ncaa/500/28.png",
  "Texas Tech": "https://a.espncdn.com/i/teamlogos/ncaa/500/2641.png",
  "UNC Wilmington": "https://a.espncdn.com/i/teamlogos/ncaa/500/350.png",
  "Baylor": "https://a.espncdn.com/i/teamlogos/ncaa/500/239.png",
  "Mississippi State": "https://a.espncdn.com/i/teamlogos/ncaa/500/344.png",
  "Alabama": "https://a.espncdn.com/i/teamlogos/ncaa/500/333.png",
  "Robert Morris": "https://a.espncdn.com/i/teamlogos/ncaa/500/2523.png",
  "Iowa State": "https://a.espncdn.com/i/teamlogos/ncaa/500/66.png",
  "Lipscomb": "https://a.espncdn.com/i/teamlogos/ncaa/500/288.png",
  "Colorado State": "https://a.espncdn.com/i/teamlogos/ncaa/500/36.png",
  "Memphis": "https://a.espncdn.com/i/teamlogos/ncaa/500/235.png",
  "Duke": "https://a.espncdn.com/i/teamlogos/ncaa/500/150.png",
  "Mount St. Mary's": "https://a.espncdn.com/i/teamlogos/ncaa/500/116.png",
  "Saint Mary's": "https://a.espncdn.com/i/teamlogos/ncaa/500/2608.png",
  "Vanderbilt": "https://a.espncdn.com/i/teamlogos/ncaa/500/238.png",
  "Ole Miss": "https://a.espncdn.com/i/teamlogos/ncaa/500/145.png",
  "North Carolina": "https://a.espncdn.com/i/teamlogos/ncaa/500/153.png",
  "Maryland": "https://a.espncdn.com/i/teamlogos/ncaa/500/120.png",
  "Grand Canyon": "https://a.espncdn.com/i/teamlogos/ncaa/500/2253.png",
  "Florida": "https://a.espncdn.com/i/teamlogos/ncaa/500/57.png",
  "Norfolk State": "https://a.espncdn.com/i/teamlogos/ncaa/500/2450.png",
  "Kentucky": "https://a.espncdn.com/i/teamlogos/ncaa/500/96.png",
  "Troy": "https://a.espncdn.com/i/teamlogos/ncaa/500/2653.png",
  "New Mexico": "https://a.espncdn.com/i/teamlogos/ncaa/500/167.png",
  "Marquette": "https://a.espncdn.com/i/teamlogos/ncaa/500/269.png",
  "Arizona": "https://a.espncdn.com/i/teamlogos/ncaa/500/12.png",
  "Akron": "https://a.espncdn.com/i/teamlogos/ncaa/500/2006.png",
  "UConn": "https://a.espncdn.com/i/teamlogos/ncaa/500/41.png",
  "Oklahoma": "https://a.espncdn.com/i/teamlogos/ncaa/500/201.png",
  "Illinois": "https://a.espncdn.com/i/teamlogos/ncaa/500/356.png",
  "Xavier": "https://a.espncdn.com/i/teamlogos/ncaa/500/2752.png",
  "Michigan State": "https://a.espncdn.com/i/teamlogos/ncaa/500/127.png",
  "Bryant": "https://a.espncdn.com/i/teamlogos/ncaa/500/2803.png",
  "Oregon": "https://a.espncdn.com/i/teamlogos/ncaa/500/2483.png",
  "Liberty": "https://a.espncdn.com/i/teamlogos/ncaa/500/2335.png",
};

function buildTeam(name, seed) {
  return {
    name,
    seed,
    logo: TEAM_LOGOS[name] || "https://a.espncdn.com/i/teamlogos/ncaa/500/default-team-logo-500.png",
  };
}

const SAMPLE_GAMES = [
  { id: "g1", teamA: buildTeam("Creighton", 9), teamB: buildTeam("Louisville", 8) },
  { id: "g2", teamA: buildTeam("Purdue", 4), teamB: buildTeam("High Point", 13) },
  { id: "g3", teamA: buildTeam("Wisconsin", 3), teamB: buildTeam("Montana", 14) },
  { id: "g4", teamA: buildTeam("Houston", 1), teamB: buildTeam("SIU Edwardsville", 16) },
  { id: "g5", teamA: buildTeam("Auburn", 1), teamB: buildTeam("Alabama State", 16) },
  { id: "g6", teamA: buildTeam("McNeese", 12), teamB: buildTeam("Clemson", 5) },
  { id: "g7", teamA: buildTeam("BYU", 6), teamB: buildTeam("VCU", 11) },
  { id: "g8", teamA: buildTeam("Gonzaga", 8), teamB: buildTeam("Georgia", 9) },
  { id: "g9", teamA: buildTeam("Tennessee", 2), teamB: buildTeam("Wofford", 15) },
  { id: "g10", teamA: buildTeam("Arkansas", 10), teamB: buildTeam("Kansas", 7) },
  { id: "g11", teamA: buildTeam("Texas A&M", 4), teamB: buildTeam("Yale", 13) },
  { id: "g12", teamA: buildTeam("Drake", 11), teamB: buildTeam("Missouri", 6) },
  { id: "g13", teamA: buildTeam("UCLA", 7), teamB: buildTeam("Utah State", 10) },
  { id: "g14", teamA: buildTeam("St. John's", 2), teamB: buildTeam("Omaha", 15) },
  { id: "g15", teamA: buildTeam("Michigan", 5), teamB: buildTeam("UC San Diego", 12) },
  { id: "g16", teamA: buildTeam("Texas Tech", 3), teamB: buildTeam("UNC Wilmington", 14) },
  { id: "g17", teamA: buildTeam("Baylor", 9), teamB: buildTeam("Mississippi State", 8) },
  { id: "g18", teamA: buildTeam("Alabama", 2), teamB: buildTeam("Robert Morris", 15) },
  { id: "g19", teamA: buildTeam("Iowa State", 3), teamB: buildTeam("Lipscomb", 14) },
  { id: "g20", teamA: buildTeam("Colorado State", 12), teamB: buildTeam("Memphis", 5) },
  { id: "g21", teamA: buildTeam("Duke", 1), teamB: buildTeam("Mount St. Mary's", 16) },
  { id: "g22", teamA: buildTeam("Saint Mary's", 7), teamB: buildTeam("Vanderbilt", 10) },
  { id: "g23", teamA: buildTeam("Ole Miss", 6), teamB: buildTeam("North Carolina", 11) },
  { id: "g24", teamA: buildTeam("Maryland", 4), teamB: buildTeam("Grand Canyon", 13) },
  { id: "g25", teamA: buildTeam("Florida", 1), teamB: buildTeam("Norfolk State", 16) },
  { id: "g26", teamA: buildTeam("Kentucky", 3), teamB: buildTeam("Troy", 14) },
  { id: "g27", teamA: buildTeam("New Mexico", 10), teamB: buildTeam("Marquette", 7) },
  { id: "g28", teamA: buildTeam("Arizona", 4), teamB: buildTeam("Akron", 13) },
  { id: "g29", teamA: buildTeam("UConn", 8), teamB: buildTeam("Oklahoma", 9) },
  { id: "g30", teamA: buildTeam("Illinois", 6), teamB: buildTeam("Xavier", 11) },
  { id: "g31", teamA: buildTeam("Michigan State", 2), teamB: buildTeam("Bryant", 15) },
  { id: "g32", teamA: buildTeam("Oregon", 5), teamB: buildTeam("Liberty", 12) },
];
const PICK_SYNC_DELAY_MS = 2000;

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
  const [tournamentStarted, setTournamentStarted] = useState(false);
  const [mobileCreateNotice, setMobileCreateNotice] = useState("");
  const [authPopupMessage, setAuthPopupMessage] = useState("");
  const mobileNoticeTimerRef = useRef(null);
  const pickSyncTimersRef = useRef({});
  const reachedMaxEntries = entries.length >= 5;

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
    Object.values(pickSyncTimersRef.current).forEach((timerId) => clearTimeout(timerId));
    pickSyncTimersRef.current = {};
    setLoggedIn(false);
    setCurrentUserName("");
    setEntries([]);
    setSelectedEntry(null);
    setIsEntriesSheetOpen(false);
    setEntryPendingDelete(null);
    setEntriesLocked(false);
    setTournamentStarted(false);
    setMobileCreateNotice("");
    setErrorMessage("");
  }

  useEffect(() => {
    return () => {
      if (mobileNoticeTimerRef.current) {
        clearTimeout(mobileNoticeTimerRef.current);
      }
      Object.values(pickSyncTimersRef.current).forEach((timerId) => clearTimeout(timerId));
      pickSyncTimersRef.current = {};
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
      setTournamentStarted(Boolean(data.tournamentStarted));

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
    if (tournamentStarted) {
      setErrorMessage("Tournament has started. New entries are disabled.");
      return;
    }
    if (reachedMaxEntries) return;

    setErrorMessage("");

    try {
      const response = await fetch("/api/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: currentUserName }),
      });

      if (!response.ok) {
        if (response.status === 403) {
          const body = await response.text();
          if (body.toLowerCase().includes("maximum")) {
            setErrorMessage("Maximum of 5 entries reached.");
          } else if (body.toLowerCase().includes("tournament")) {
            setErrorMessage("Tournament has started. New entries are disabled.");
          } else {
            setErrorMessage("Entries are locked.");
          }
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

  function handlePickTeam(entryId, team) {
    if (!currentUserName || !entryId || !team?.name) return;
    if (entriesLocked) {
      setErrorMessage("Entries are locked.");
      return;
    }

    const selectedEntryObj = entries.find((entry) => entry.id === entryId);
    if (!selectedEntryObj) return;
    if (selectedEntryObj.isLocked) {
      setErrorMessage("Entries are locked.");
      return;
    }

    const existingPickName =
      typeof selectedEntryObj.currentPick === "string"
        ? selectedEntryObj.currentPick
        : selectedEntryObj.currentPick?.name || "";
    const isSamePick = existingPickName === team.name;
    const nextCurrentPick = isSamePick
      ? null
      : {
          name: team.name,
          logo: team.logo || "",
          seed: Number(team.seed),
        };

    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === entryId
          ? {
              ...entry,
              currentPick: nextCurrentPick,
            }
          : entry
      )
    );

    const existingTimer = pickSyncTimersRef.current[entryId];
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    pickSyncTimersRef.current[entryId] = setTimeout(async () => {
      try {
        const response = await fetch("/api/entries", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: entryId,
            username: currentUserName,
            currentPick: nextCurrentPick,
          }),
        });

        if (response.status === 403) {
          setErrorMessage("Entries are locked.");
          await loadEntries(currentUserName, entryId);
          return;
        }

        if (!response.ok) {
          const body = await response.text();
          throw new Error(`Update pick failed (${response.status}): ${body || "No response body"}`);
        }

        const data = await response.json().catch(() => ({}));
        if (data?.entry) {
          setEntries((prevEntries) =>
            prevEntries.map((entry) =>
              entry.id === entryId
                ? {
                    ...entry,
                    currentPick: data.entry.currentPick ?? null,
                  }
                : entry
            )
          );
        }
      } catch (error) {
        console.error("Update pick failed:", error);
        setErrorMessage(String(error.message || error));
        await loadEntries(currentUserName, entryId);
      } finally {
        delete pickSyncTimersRef.current[entryId];
      }
    }, PICK_SYNC_DELAY_MS);
  }

  function renderEntries(closeSheetOnSelect = false, extraClassName = "") {
    return (
      <div className={`entry-list ${extraClassName}`.trim()}>
        {entries.map((entry) => {
          const isEliminated = entriesLocked && entry.isAlive === false;
          const entryCurrentPickName =
            typeof entry.currentPick === "string"
              ? entry.currentPick
              : entry.currentPick?.name || "";
          const entryCurrentPickLogo =
            typeof entry.currentPick === "object" ? entry.currentPick?.logo || "" : "";

          return (
            <div
              className={`entry-box ${selectedEntry === entry.id ? "selected" : ""} ${
                isEliminated ? "eliminated" : ""
              }`}
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
              <div className="entry-main">
                <div className="entry-label-wrap">
                  <span className="entry-label">
                    {currentUserName} {entry.entryNumber}
                  </span>
                  {isEliminated && (
                    <span className="entry-eliminated-badge" aria-label="Eliminated">
                      x
                    </span>
                  )}
                </div>
                <div className={`entry-pick-inline ${entryCurrentPickName ? "has-pick" : ""}`}>
                  {entryCurrentPickName ? (
                    <>
                      {entryCurrentPickLogo && (
                        <img
                          className="entry-pick-logo"
                          src={entryCurrentPickLogo}
                          alt={`${entryCurrentPickName} logo`}
                          loading="lazy"
                        />
                      )}
                      <span className="entry-pick-name">{entryCurrentPickName}</span>
                    </>
                  ) : (
                    <span className="entry-pick-empty">No team chosen</span>
                  )}
                </div>
              </div>
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
          );
        })}
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
        if (loginResponse.status === 409) {
          const conflict = await loginResponse.json().catch(() => ({}));
          if (conflict?.error === "email already exists") {
            setAuthPopupMessage("Email already exists. Please use another email or log in.");
          } else {
            setAuthPopupMessage("Username already exists. Please choose another username or log in.");
          }
          return;
        }

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
        if (loginResponse.status === 401) {
          setAuthPopupMessage("Invalid username or password.");
          return;
        }

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
  const picksDisabled = Boolean(entriesLocked || selectedEntryObject?.isLocked);
  const currentPickName =
    typeof selectedEntryObject?.currentPick === "string"
      ? selectedEntryObject.currentPick
      : selectedEntryObject?.currentPick?.name || "";
  const currentPickLogo =
    typeof selectedEntryObject?.currentPick === "object"
      ? selectedEntryObject.currentPick?.logo || ""
      : "";
  const selectedEntryEliminated = Boolean(
    selectedEntryObject && entriesLocked && selectedEntryObject.isAlive === false
  );

  return (
    <main className={loggedIn ? "home-shell" : "auth-shell"}>
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
              {!entriesLocked && !tournamentStarted && (
                <button
                  className="sidebar-button"
                  type="button"
                  onClick={handleNewEntry}
                  disabled={reachedMaxEntries}
                >
                  {reachedMaxEntries ? "Max Entries Reached" : "New Entry"}
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
                {selectedEntryObject ? (
                  <div className="entry-dashboard">
                    <section className="pick-section compact">
                      <p className="pick-section-title">Selected Entry</p>
                      <p className="pick-section-content">
                        {currentUserName} {selectedEntryObject.entryNumber}
                      </p>
                    </section>
                    <section className="pick-section compact current-pick-section">
                      <p className="pick-section-title">Current Pick</p>
                      <div className={`current-pick-value ${currentPickName ? "has-pick" : ""}`}>
                        {currentPickName ? (
                          <div className="current-pick-display">
                            {currentPickLogo && (
                              <img
                                className="current-pick-logo"
                                src={currentPickLogo}
                                alt={`${currentPickName} logo`}
                                loading="lazy"
                              />
                            )}
                            <p className="pick-section-content">{currentPickName}</p>
                          </div>
                        ) : (
                          <p className="pick-section-content">
                            No team was chosen.
                            {selectedEntryEliminated && (
                              <span className="current-pick-eliminated"> Eliminated</span>
                            )}
                          </p>
                        )}
                      </div>
                    </section>
                    <section className="pick-section wide">
                      <p className="pick-section-title">Previous Picks</p>
                      {selectedEntryObject.previousPicks?.length ? (
                        <ul className="previous-picks-list">
                          {selectedEntryObject.previousPicks.map((pick, index) => (
                            <li key={`${selectedEntryObject.id}-pick-${index}`}>{pick}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="pick-section-content">No previous picks</p>
                      )}
                    </section>
                  </div>
                ) : (
                  <>
                    <p className="selected-entry-label">Selected Entry</p>
                    <p className="selected-entry-value">None selected</p>
                  </>
                )}
              </div>
              {selectedEntryObject && (
                <section className="sample-games-wrap">
                  <p className="pick-section-title">Round of 64</p>
                  <div className="sample-games-grid">
                    {SAMPLE_GAMES.map((game) => (
                      <article className="sample-game-card" key={game.id}>
                        <div className="sample-game-matchup">
                          <div className="sample-team">
                            <p className="sample-team-name">
                              ({game.teamA.seed}) {game.teamA.name}
                            </p>
                            <img
                              className="sample-team-logo"
                              src={game.teamA.logo}
                              alt={`${game.teamA.name} logo`}
                              loading="lazy"
                            />
                            <button
                              type="button"
                              className={`sample-game-pick ${
                                currentPickName === game.teamA.name ? "selected" : ""
                              }`}
                              aria-pressed={currentPickName === game.teamA.name}
                              disabled={picksDisabled}
                              onClick={() => handlePickTeam(selectedEntryObject.id, game.teamA)}
                            >
                              Pick ({game.teamA.seed}) {game.teamA.name}
                              {currentPickName === game.teamA.name && (
                                <span className="sample-game-pick-icon" aria-hidden="true">
                                  ✓
                                </span>
                              )}
                            </button>
                          </div>
                          <p className="sample-game-vs">VS</p>
                          <div className="sample-team">
                            <p className="sample-team-name">
                              ({game.teamB.seed}) {game.teamB.name}
                            </p>
                            <img
                              className="sample-team-logo"
                              src={game.teamB.logo}
                              alt={`${game.teamB.name} logo`}
                              loading="lazy"
                            />
                            <button
                              type="button"
                              className={`sample-game-pick ${
                                currentPickName === game.teamB.name ? "selected" : ""
                              }`}
                              aria-pressed={currentPickName === game.teamB.name}
                              disabled={picksDisabled}
                              onClick={() => handlePickTeam(selectedEntryObject.id, game.teamB)}
                            >
                              Pick ({game.teamB.seed}) {game.teamB.name}
                              {currentPickName === game.teamB.name && (
                                <span className="sample-game-pick-icon" aria-hidden="true">
                                  ✓
                                </span>
                              )}
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}
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
      {authPopupMessage && (
        <div className="confirm-backdrop" onClick={() => setAuthPopupMessage("")}>
          <section className="confirm-modal" onClick={(event) => event.stopPropagation()}>
            <h2>Cannot Sign Up</h2>
            <p>{authPopupMessage}</p>
            <div className="confirm-actions">
              <button type="button" className="confirm-cancel" onClick={() => setAuthPopupMessage("")}>
                OK
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
