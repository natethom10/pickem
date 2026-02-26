import { useEffect, useMemo, useRef, useState } from "react";
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

function getPickName(pick) {
  return typeof pick === "string" ? pick : pick?.name || "";
}

function getPickLogo(pick) {
  if (typeof pick === "object" && pick?.logo) return pick.logo;
  const name = getPickName(pick);
  return TEAM_LOGOS[name] || "";
}

function hasTeamInPreviousPicks(entry, teamName) {
  const normalizedTeamName = String(teamName || "").trim().toLowerCase();
  if (!normalizedTeamName) return false;

  const previousPicks = Array.isArray(entry?.previousPicks) ? entry.previousPicks : [];
  return previousPicks.some((pick) => getPickName(pick).trim().toLowerCase() === normalizedTeamName);
}

const ROUND_LABELS = [
  "R64",
  "R32",
  "S16",
  "E8",
  "F4",
  "CH",
];

function getRoundLabelForPickIndex(index) {
  return ROUND_LABELS[index] || `Round ${index + 1}`;
}

function isEntryEliminatedByRules(entry, entriesAreLocked, hasTournamentStarted) {
  if (!hasTournamentStarted) return false;
  return entry?.isAlive === false;
}

const PICK_SYNC_DELAY_MS = 500;
const ADMIN_USER_ALLOWLIST = new Set(["natethom", "derek3dunn", "ddunn23"]);

function App() {
  const [loggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem("pickem_logged_in") === "true";
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [currentUserName, setCurrentUserName] = useState(() => {
    return localStorage.getItem("pickem_user_name") || "";
  });
  const [entries, setEntries] = useState([]);
  const [games, setGames] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isEntriesSheetOpen, setIsEntriesSheetOpen] = useState(false);
  const [entryPendingDelete, setEntryPendingDelete] = useState(null);
  const [adminEntryPendingDelete, setAdminEntryPendingDelete] = useState(null);
  const [entriesLocked, setEntriesLocked] = useState(false);
  const [tournamentStarted, setTournamentStarted] = useState(false);
  const [mobileCreateNotice, setMobileCreateNotice] = useState("");
  const [authPopupMessage, setAuthPopupMessage] = useState("");
  const [authPopupTitle, setAuthPopupTitle] = useState("");
  const [activeHomeTab, setActiveHomeTab] = useState(() => {
    const saved = localStorage.getItem("pickem_active_home_tab");
    return saved === "admin" ? "admin" : "games";
  });
  const [adminUsers, setAdminUsers] = useState([]);
  const [adminEntriesLoading, setAdminEntriesLoading] = useState(false);
  const [adminEntriesError, setAdminEntriesError] = useState("");
  const [adminNotice, setAdminNotice] = useState("");
  const [adminSettings, setAdminSettings] = useState({
    entriesLocked: false,
    tournamentStarted: false,
  });
  const [adminSettingsSaving, setAdminSettingsSaving] = useState({});
  const [tournamentResetPending, setTournamentResetPending] = useState(false);
  const [confirmingResults, setConfirmingResults] = useState(false);
  const [expandedAdminUsers, setExpandedAdminUsers] = useState({});
  const [adminSort, setAdminSort] = useState("username_asc");
  const [adminUsersCollapsed, setAdminUsersCollapsed] = useState(false);
  const [adminChartCollapsed, setAdminChartCollapsed] = useState(false);
  const [adminGamesCollapsed, setAdminGamesCollapsed] = useState(false);
  const [adminGameResults, setAdminGameResults] = useState({});
  const mobileNoticeTimerRef = useRef(null);
  const pickSyncTimersRef = useRef({});
  const adminNoticeTimerRef = useRef(null);
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
    localStorage.setItem("pickem_active_home_tab", activeHomeTab);
  }, [activeHomeTab]);

  useEffect(() => {
    if (!loggedIn || !currentUserName) return;
    loadEntries(currentUserName);
  }, [loggedIn, currentUserName]);

  useEffect(() => {
    loadGames();
  }, []);

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
    setAdminEntryPendingDelete(null);
    setEntriesLocked(false);
    setTournamentStarted(false);
    setMobileCreateNotice("");
    setActiveHomeTab("games");
    localStorage.removeItem("pickem_active_home_tab");
    setAdminUsers([]);
    setAdminEntriesLoading(false);
    setAdminEntriesError("");
    setAdminNotice("");
    setAdminSettings({ entriesLocked: false, tournamentStarted: false });
    setAdminSettingsSaving({});
    setTournamentResetPending(false);
    setAuthPopupTitle("");
    setAuthPopupMessage("");
    setExpandedAdminUsers({});
    setAdminUsersCollapsed(false);
    setAdminChartCollapsed(false);
    setAdminGamesCollapsed(false);
    setAdminGameResults({});
    setErrorMessage("");
  }

  useEffect(() => {
    return () => {
      if (mobileNoticeTimerRef.current) {
        clearTimeout(mobileNoticeTimerRef.current);
      }
      if (adminNoticeTimerRef.current) {
        clearTimeout(adminNoticeTimerRef.current);
      }
      Object.values(pickSyncTimersRef.current).forEach((timerId) => clearTimeout(timerId));
      pickSyncTimersRef.current = {};
    };
  }, []);

  function setTransientAdminNotice(message) {
    setAdminNotice(message);
    if (adminNoticeTimerRef.current) {
      clearTimeout(adminNoticeTimerRef.current);
    }
    adminNoticeTimerRef.current = setTimeout(() => {
      setAdminNotice("");
    }, 2200);
  }

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

  async function loadGames() {
    try {
      const response = await fetch(`/api/games?t=${Date.now()}`);
      if (!response.ok) {
        const body = await response.text();
        throw new Error(`Games fetch failed (${response.status}): ${body || "No response body"}`);
      }

      const data = await response.json();
      const nextGames = Array.isArray(data.games) ? data.games : [];
      setGames(nextGames);
      setAdminGameResults(
        nextGames.reduce((acc, game) => {
          if (game?.completed && (game.winnerSide === "A" || game.winnerSide === "B")) {
            acc[game.id] = game.winnerSide;
          }
          return acc;
        }, {})
      );
    } catch (error) {
      console.error("Load games failed:", error);
    }
  }

  async function loadAdminEntries() {
    setAdminEntriesLoading(true);
    setAdminEntriesError("");
    setAdminNotice("");

    try {
      const response = await fetch(`/api/admin-entries?t=${Date.now()}`);

      if (!response.ok) {
        const body = await response.text();
        throw new Error(`Admin entries fetch failed (${response.status}): ${body || "No response body"}`);
      }

      const data = await response.json();
      setAdminUsers(Array.isArray(data.users) ? data.users : []);
      setAdminSettings({
        entriesLocked: Boolean(data?.settings?.entriesLocked),
        tournamentStarted: Boolean(data?.settings?.tournamentStarted),
      });
    } catch (error) {
      console.error("Load admin entries failed:", error);
      setAdminEntriesError(String(error.message || error));
    } finally {
      setAdminEntriesLoading(false);
    }
  }

  useEffect(() => {
    if (!loggedIn) return;
    if (!ADMIN_USER_ALLOWLIST.has(currentUserName.trim().toLowerCase())) return;
    if (activeHomeTab !== "admin") return;
    loadAdminEntries();
  }, [loggedIn, activeHomeTab, currentUserName]);

  function toggleAdminUser(usernameLower) {
    setExpandedAdminUsers((prev) => ({
      ...prev,
      [usernameLower]: !prev[usernameLower],
    }));
  }

  function expandAllAdminUsers() {
    const next = {};
    for (const user of adminUsers) {
      next[user.usernameLower] = true;
    }
    setExpandedAdminUsers(next);
  }

  function collapseAllAdminUsers() {
    setExpandedAdminUsers({});
  }

  async function setAdminGameWinner(gameId, winnerSide) {
    const previousWinnerSide = adminGameResults[gameId] || null;
    const nextWinnerSide = previousWinnerSide === winnerSide ? null : winnerSide;
    const completed = Boolean(nextWinnerSide);

    setAdminGameResults((prev) => ({
      ...prev,
      [gameId]: nextWinnerSide,
    }));

    try {
      const response = await fetch("/api/games", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: gameId,
          winnerSide: nextWinnerSide,
          completed,
        }),
      });

      if (!response.ok) {
        const body = await response.text();
        throw new Error(`Game update failed (${response.status}): ${body || "No response body"}`);
      }
    } catch (error) {
      console.error("Game winner update failed:", error);
      setAdminEntriesError(String(error.message || error));
      setAdminGameResults((prev) => ({
        ...prev,
        [gameId]: previousWinnerSide,
      }));
    }
  }

  async function updateAdminEntryPaid(entryId, isPaid) {
    const previousUsers = adminUsers;

    setAdminUsers((prevUsers) =>
      prevUsers.map((user) => ({
        ...user,
        entries: user.entries.map((entry) =>
          entry.id === entryId
            ? {
                ...entry,
                isPaid,
              }
            : entry
        ),
      }))
    );

    try {
      const response = await fetch("/api/admin-entries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: entryId, isPaid }),
      });

      if (!response.ok) {
        const body = await response.text();
        throw new Error(`Paid update failed (${response.status}): ${body || "No response body"}`);
      }
    } catch (error) {
      setAdminUsers(previousUsers);
      console.error("Paid update failed:", error);
      setAdminEntriesError(String(error.message || error));
    }
  }

  async function markAllEntriesPaidForUser(user) {
    if (!user?.usernameLower) return;

    const previousUsers = adminUsers;
    setAdminEntriesError("");

    setAdminUsers((prevUsers) =>
      prevUsers.map((candidate) =>
        candidate.usernameLower === user.usernameLower
          ? {
              ...candidate,
              entries: candidate.entries.map((entry) => ({ ...entry, isPaid: true })),
            }
          : candidate
      )
    );

    try {
      const response = await fetch("/api/admin-entries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usernameLower: user.usernameLower,
          markAllPaid: true,
        }),
      });

      if (!response.ok) {
        const body = await response.text();
        throw new Error(
          `Mark all paid failed (${response.status}): ${body || "No response body"}`
        );
      }
    } catch (error) {
      setAdminUsers(previousUsers);
      console.error("Mark all paid failed:", error);
      setAdminEntriesError(String(error.message || error));
    }
  }

  async function copyAdminEmails() {
    const emails = [
      ...new Set(
        adminUsers
          .map((user) => String(user.email || "").trim())
          .filter((email) => email.includes("@"))
      ),
    ];

    if (emails.length === 0) {
      setTransientAdminNotice("No emails available to copy.");
      return;
    }

    try {
      await navigator.clipboard.writeText(emails.join(", "));
      setTransientAdminNotice(
        `Copied ${emails.length} email${emails.length === 1 ? "" : "s"} to clipboard.`
      );
    } catch (error) {
      console.error("Copy emails failed:", error);
      setAdminEntriesError("Could not copy emails to clipboard.");
    }
  }

  async function copyOutstandingEmails() {
    const emails = [
      ...new Set(
        adminUsers
          .filter((user) => (user.entries || []).some((entry) => !entry.isPaid))
          .map((user) => String(user.email || "").trim())
          .filter((email) => email.includes("@"))
      ),
    ];

    if (emails.length === 0) {
      setTransientAdminNotice("No outstanding unpaid emails to copy.");
      return;
    }

    try {
      await navigator.clipboard.writeText(emails.join(", "));
      setTransientAdminNotice(
        `Copied ${emails.length} unpaid email${emails.length === 1 ? "" : "s"} to clipboard.`
      );
    } catch (error) {
      console.error("Copy outstanding emails failed:", error);
      setAdminEntriesError("Could not copy outstanding emails to clipboard.");
    }
  }

  async function copyAliveEntryEmails() {
    const emails = [
      ...new Set(
        adminUsers
          .filter((user) => (user.entries || []).some((entry) => entry?.isAlive !== false))
          .map((user) => String(user.email || "").trim())
          .filter((email) => email.includes("@"))
      ),
    ];

    if (emails.length === 0) {
      setTransientAdminNotice("No emails found for users with alive entries.");
      return;
    }

    try {
      await navigator.clipboard.writeText(emails.join(", "));
      setTransientAdminNotice(
        `Copied ${emails.length} alive-entry email${emails.length === 1 ? "" : "s"} to clipboard.`
      );
    } catch (error) {
      console.error("Copy alive-entry emails failed:", error);
      setAdminEntriesError("Could not copy alive-entry emails to clipboard.");
    }
  }

  async function applyAdminSettingUpdate(settingKey, nextValue) {
    if (!["entriesLocked", "tournamentStarted"].includes(settingKey)) return;

    const previousSettings = adminSettings;
    setAdminEntriesError("");
    setAdminSettings((prev) => ({ ...prev, [settingKey]: nextValue }));
    setAdminSettingsSaving((prev) => ({ ...prev, [settingKey]: true }));

    try {
      const response = await fetch("/api/admin-entries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [settingKey]: nextValue }),
      });

      if (!response.ok) {
        const body = await response.text();
        throw new Error(`Setting update failed (${response.status}): ${body || "No response body"}`);
      }

      if (currentUserName) {
        await loadEntries(currentUserName, selectedEntry);
      }
    } catch (error) {
      console.error("Setting update failed:", error);
      setAdminSettings(previousSettings);
      setAdminEntriesError(String(error.message || error));
    } finally {
      setAdminSettingsSaving((prev) => ({ ...prev, [settingKey]: false }));
    }
  }

  async function updateAdminSetting(settingKey, nextValue) {
    if (
      settingKey === "tournamentStarted" &&
      adminSettings.tournamentStarted === true &&
      nextValue === false
    ) {
      setTournamentResetPending(true);
      return;
    }

    await applyAdminSettingUpdate(settingKey, nextValue);
  }

  async function confirmResultsAndEliminateEntries() {
    if (confirmingResults) return;
    setConfirmingResults(true);
    setAdminEntriesError("");

    try {
      const response = await fetch("/api/confirm-results", {
        method: "POST",
      });

      if (!response.ok) {
        const body = await response.text();
        throw new Error(`Confirm results failed (${response.status}): ${body || "No response body"}`);
      }

      const data = await response.json().catch(() => ({}));
      const eliminatedCount = Number(data?.eliminatedCount || 0);
      setTransientAdminNotice(
        eliminatedCount > 0
          ? `Results confirmed. Eliminated ${eliminatedCount} entr${eliminatedCount === 1 ? "y" : "ies"}.`
          : "Results confirmed. No new entries were eliminated."
      );

      await loadAdminEntries();
      if (currentUserName) {
        await loadEntries(currentUserName, selectedEntry);
      }
    } catch (error) {
      console.error("Confirm results failed:", error);
      setAdminEntriesError(String(error.message || error));
    } finally {
      setConfirmingResults(false);
    }
  }

  async function confirmDeleteAdminEntry(target) {
    if (!target?.id || !target?.username) {
      setAdminEntryPendingDelete(null);
      return;
    }

    try {
      const response = await fetch(
        `/api/entries?id=${encodeURIComponent(target.id)}&username=${encodeURIComponent(target.username)}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        const body = await response.text();
        if (response.status === 403) {
          setAdminEntriesError("Entries are locked and cannot be deleted.");
        } else {
          setAdminEntriesError(
            `Delete failed (${response.status}): ${body || "No response body"}`
          );
        }
        return;
      }

      await loadAdminEntries();
      if (
        currentUserName &&
        target.username &&
        currentUserName.toLowerCase() === String(target.username).toLowerCase()
      ) {
        await loadEntries(currentUserName, selectedEntry);
      }
    } catch (error) {
      console.error("Admin delete failed:", error);
      setAdminEntriesError(String(error.message || error));
    } finally {
      setAdminEntryPendingDelete(null);
    }
  }

  const displayedAdminUsers = useMemo(() => {
    const users = [...adminUsers];

    users.sort((a, b) => {
      const aName = String(a.username || "").toLowerCase();
      const bName = String(b.username || "").toLowerCase();
      const aCount = Array.isArray(a.entries) ? a.entries.length : 0;
      const bCount = Array.isArray(b.entries) ? b.entries.length : 0;
      const aUnpaid = Array.isArray(a.entries)
        ? a.entries.filter((entry) => !entry.isPaid).length
        : 0;
      const bUnpaid = Array.isArray(b.entries)
        ? b.entries.filter((entry) => !entry.isPaid).length
        : 0;
      const aAlive = Array.isArray(a.entries)
        ? a.entries.filter((entry) => entry.isAlive !== false).length
        : 0;
      const bAlive = Array.isArray(b.entries)
        ? b.entries.filter((entry) => entry.isAlive !== false).length
        : 0;

      if (adminSort === "username_desc") {
        return bName.localeCompare(aName) || bCount - aCount;
      }

      if (adminSort === "entries_desc") {
        return bCount - aCount || aName.localeCompare(bName);
      }

      if (adminSort === "entries_asc") {
        return aCount - bCount || aName.localeCompare(bName);
      }

      if (adminSort === "unpaid_desc") {
        return bUnpaid - aUnpaid || aName.localeCompare(bName);
      }

      if (adminSort === "alive_desc") {
        return bAlive - aAlive || aName.localeCompare(bName);
      }

      return aName.localeCompare(bName) || bCount - aCount;
    });

    return users;
  }, [adminUsers, adminSort]);

  const allAdminExpanded =
    displayedAdminUsers.length > 0 &&
    displayedAdminUsers.every((user) => Boolean(expandedAdminUsers[user.usernameLower]));

  const teamSelectionCounts = useMemo(() => {
    const counts = new Map();
    const noSelectionKey = "__NO_SELECTION__";
    const eliminatedTeams = new Set();

    for (const game of games) {
      if (game?.teamA?.status === "loser" && game.teamA.name) {
        eliminatedTeams.add(String(game.teamA.name).trim().toLowerCase());
      }
      if (game?.teamB?.status === "loser" && game.teamB.name) {
        eliminatedTeams.add(String(game.teamB.name).trim().toLowerCase());
      }
    }

    for (const user of adminUsers) {
      for (const entry of user.entries || []) {
        if (entry?.isAlive === false) {
          continue;
        }

        const pickName = getPickName(entry.currentPick);
        if (!pickName) {
          counts.set(noSelectionKey, (counts.get(noSelectionKey) || 0) + 1);
        } else if (eliminatedTeams.has(pickName.trim().toLowerCase())) {
          continue;
        } else {
          counts.set(pickName, (counts.get(pickName) || 0) + 1);
        }
      }
    }

    return [...counts.entries()]
      .map(([teamName, count]) => ({
        teamName: teamName === noSelectionKey ? "No Team Chosen" : teamName,
        count,
        logo: teamName === noSelectionKey ? "" : TEAM_LOGOS[teamName] || "",
        isNoSelection: teamName === noSelectionKey,
      }))
      .sort((a, b) => b.count - a.count || a.teamName.localeCompare(b.teamName));
  }, [adminUsers, games]);
  const eliminatedEntriesCount = useMemo(() => {
    let count = 0;
    for (const user of adminUsers) {
      for (const entry of user.entries || []) {
        if (entry?.isAlive === false) {
          count += 1;
        }
      }
    }
    return count;
  }, [adminUsers]);
  const totalEntriesCount = useMemo(() => {
    let count = 0;
    for (const user of adminUsers) {
      count += Array.isArray(user.entries) ? user.entries.length : 0;
    }
    return count;
  }, [adminUsers]);
  const aliveEntriesCount = Math.max(0, totalEntriesCount - eliminatedEntriesCount);
  const adminWinnerButtonsDisabled = !(
    adminSettings.entriesLocked && adminSettings.tournamentStarted
  );

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
      setMobileCreateNotice(`${currentUserName} (${created.entryNumber}) created`);
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
    if (tournamentStarted && selectedEntryObj.isAlive === false) {
      setErrorMessage("This entry is eliminated and cannot be changed.");
      return;
    }
    if (hasTeamInPreviousPicks(selectedEntryObj, team.name)) {
      setErrorMessage("You cannot pick a team that is already in previous picks.");
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
          const body = await response.text();
          if (body.toLowerCase().includes("eliminated")) {
            setErrorMessage("This entry is eliminated and cannot be changed.");
          } else if (body.toLowerCase().includes("loser")) {
            setErrorMessage("This team is marked as a loser and cannot be selected.");
          } else {
            setErrorMessage("Entries are locked.");
          }
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
          const isEliminated = isEntryEliminatedByRules(entry, entriesLocked, tournamentStarted);
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
                    {currentUserName} ({entry.entryNumber})
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
                  aria-label={`Delete ${currentUserName} (${entry.entryNumber})`}
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
            setAuthPopupTitle("Cannot Sign Up");
            setAuthPopupMessage("Email already exists. Please use another email or log in.");
          } else {
            setAuthPopupTitle("Cannot Sign Up");
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
          setAuthPopupTitle("Login Failed");
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
  const canAccessAdminTabs = ADMIN_USER_ALLOWLIST.has(currentUserName.trim().toLowerCase());
  const effectiveHomeTab = canAccessAdminTabs ? activeHomeTab : "games";
  const hasUnpaidEntries = entries.some((entry) => !entry.isPaid);
  const picksDisabled = Boolean(
    entriesLocked ||
      selectedEntryObject?.isLocked ||
      (tournamentStarted && selectedEntryObject?.isAlive === false)
  );
  const currentPickName = getPickName(selectedEntryObject?.currentPick);
  const currentPickLogo = getPickLogo(selectedEntryObject?.currentPick);
  const selectedEntryEliminated = Boolean(
    selectedEntryObject &&
      isEntryEliminatedByRules(selectedEntryObject, entriesLocked, tournamentStarted)
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
              <span className="brand">DunnBrosElim</span>
              <span className="brand-divider" aria-hidden="true" />
              <span className="current-user">{currentUserName}</span>
            </div>
            <button className="logout-button" onClick={handleLogout} type="button">
              Log Out
            </button>
          </header>
          {!canAccessAdminTabs && hasUnpaidEntries && (
            <p className="payment-reminder">You have unpaid entries. Please pay to stay eligible.</p>
          )}
          {canAccessAdminTabs && (
            <section className="home-tabs">
              <div className="home-tab-buttons">
                <button
                  type="button"
                  className={`home-tab-button ${effectiveHomeTab === "games" ? "active" : ""}`}
                  onClick={() => setActiveHomeTab("games")}
                >
                  Game
                </button>
                <button
                  type="button"
                  className={`home-tab-button ${effectiveHomeTab === "admin" ? "active" : ""}`}
                  onClick={() => setActiveHomeTab("admin")}
                >
                  Admin
                </button>
              </div>
            </section>
          )}
          {effectiveHomeTab === "games" && (
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
                  View / Switch Entries ({entries.length})
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
                          {currentUserName} ({selectedEntryObject.entryNumber})
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
                        <div className="previous-picks-wrap">
                          <p className="previous-picks-count">
                            {selectedEntryObject.previousPicks.length} total
                          </p>
                          <ul className="previous-picks-list">
                            {selectedEntryObject.previousPicks.map((pick, index) => {
                              const pickName = getPickName(pick);
                              const pickLogo = getPickLogo(pick);

                              return (
                                <li
                                  className="previous-pick-item"
                                  key={`${selectedEntryObject.id}-pick-${index}`}
                                >
                                  <span className="previous-pick-index">
                                    {getRoundLabelForPickIndex(index)}
                                  </span>
                                  <div className="previous-pick-team">
                                    {pickLogo && (
                                      <img
                                        className="previous-pick-logo"
                                        src={pickLogo}
                                        alt={`${pickName} logo`}
                                        loading="lazy"
                                      />
                                    )}
                                    <span className="previous-pick-name">{pickName}</span>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ) : (
                        <p className="pick-section-content previous-picks-empty">No previous picks</p>
                        )}
                      </section>
                    </div>
                ) : (
                  <>
                    <p className="selected-entry-label">Selected Entry</p>
                    <p className="selected-entry-value">
                      {entries.length === 0 ? "No entries yet. Create an entry to get started." : "None selected"}
                    </p>
                  </>
                )}
              </div>
                {selectedEntryObject ? (
                  <section className="sample-games-wrap">
                    <p className="pick-section-title">Round of 64</p>
                    <div className="sample-games-grid">
                      {games.map((game) => (
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
                                disabled={
                                  picksDisabled ||
                                  hasTeamInPreviousPicks(selectedEntryObject, game.teamA.name) ||
                                  game.teamA.status === "loser"
                                }
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
                                disabled={
                                  picksDisabled ||
                                  hasTeamInPreviousPicks(selectedEntryObject, game.teamB.name) ||
                                  game.teamB.status === "loser"
                                }
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
                ) : (
                  <section className="sample-games-wrap" />
                )}
              </section>
            </section>
          )}
          {canAccessAdminTabs && effectiveHomeTab === "admin" && (
            <section className="admin-tab-shell">
              {adminEntriesLoading && <p className="pick-section-content">Loading entries...</p>}
              {!adminEntriesLoading && adminEntriesError && (
                <p className="pick-section-content">{adminEntriesError}</p>
              )}
              {!adminEntriesLoading && !adminEntriesError && adminUsers.length === 0 && (
                <p className="pick-section-content">No users found.</p>
              )}
              {!adminEntriesLoading && !adminEntriesError && adminUsers.length > 0 && (
                <div className="admin-layout">
                  <aside className="admin-games-panel">
                    <button
                      type="button"
                      className="admin-panel-header"
                      onClick={() => setAdminGamesCollapsed((prev) => !prev)}
                      aria-expanded={!adminGamesCollapsed}
                    >
                      <span className="pick-section-title">Games</span>
                      <span className="admin-panel-toggle">{adminGamesCollapsed ? "+" : "−"}</span>
                    </button>
                    {!adminGamesCollapsed && (
                      <>
                        <button
                          type="button"
                          className="admin-confirm-results-btn"
                          onClick={confirmResultsAndEliminateEntries}
                          disabled={confirmingResults}
                        >
                          {confirmingResults ? "Confirming..." : "Confirm Results"}
                        </button>
                        <div className="admin-games-list">
                        {games.map((game) => (
                          <div className="admin-game-row" key={`admin-${game.id}`}>
                            <div
                              className={`admin-game-team ${
                                adminGameResults[game.id] === "A"
                                  ? "winner"
                                  : adminGameResults[game.id] === "B"
                                    ? "loser"
                                    : ""
                              }`}
                              role="button"
                              tabIndex={adminWinnerButtonsDisabled ? -1 : 0}
                              aria-disabled={adminWinnerButtonsDisabled}
                              onClick={() => {
                                if (!adminWinnerButtonsDisabled) {
                                  setAdminGameWinner(game.id, "A");
                                }
                              }}
                              onKeyDown={(event) => {
                                if (adminWinnerButtonsDisabled) return;
                                if (event.key === "Enter" || event.key === " ") {
                                  event.preventDefault();
                                  setAdminGameWinner(game.id, "A");
                                }
                              }}
                            >
                              <img
                                className="admin-game-team-logo"
                                src={game.teamA.logo}
                                alt={`${game.teamA.name} logo`}
                                loading="lazy"
                              />
                              <span className="admin-game-team-name">
                                ({game.teamA.seed}) {game.teamA.name}
                              </span>
                            </div>
                            <span className="admin-game-vs">VS</span>
                            <div
                              className={`admin-game-team ${
                                adminGameResults[game.id] === "B"
                                  ? "winner"
                                  : adminGameResults[game.id] === "A"
                                    ? "loser"
                                    : ""
                              }`}
                              role="button"
                              tabIndex={adminWinnerButtonsDisabled ? -1 : 0}
                              aria-disabled={adminWinnerButtonsDisabled}
                              onClick={() => {
                                if (!adminWinnerButtonsDisabled) {
                                  setAdminGameWinner(game.id, "B");
                                }
                              }}
                              onKeyDown={(event) => {
                                if (adminWinnerButtonsDisabled) return;
                                if (event.key === "Enter" || event.key === " ") {
                                  event.preventDefault();
                                  setAdminGameWinner(game.id, "B");
                                }
                              }}
                            >
                              <img
                                className="admin-game-team-logo"
                                src={game.teamB.logo}
                                alt={`${game.teamB.name} logo`}
                                loading="lazy"
                              />
                              <span className="admin-game-team-name">
                                ({game.teamB.seed}) {game.teamB.name}
                              </span>
                            </div>
                          </div>
                        ))}
                        </div>
                      </>
                    )}
                  </aside>
                  <div className="admin-users-panel">
                    <button
                      type="button"
                      className="admin-panel-header"
                      onClick={() => setAdminUsersCollapsed((prev) => !prev)}
                      aria-expanded={!adminUsersCollapsed}
                    >
                      <span className="pick-section-title">All Users</span>
                      <span className="admin-panel-toggle">{adminUsersCollapsed ? "+" : "−"}</span>
                    </button>
                    {!adminUsersCollapsed && (
                      <>
                        <div className="admin-settings-controls">
                          <button
                            type="button"
                            className={`admin-setting-toggle ${
                              adminSettings.entriesLocked ? "on" : "off"
                            }`}
                            disabled={Boolean(adminSettingsSaving.entriesLocked)}
                            onClick={() =>
                              updateAdminSetting("entriesLocked", !adminSettings.entriesLocked)
                            }
                          >
                            Entries Locked: {adminSettings.entriesLocked ? "On" : "Off"}
                          </button>
                          <button
                            type="button"
                            className={`admin-setting-toggle ${
                              adminSettings.tournamentStarted ? "on" : "off"
                            }`}
                            disabled={Boolean(adminSettingsSaving.tournamentStarted)}
                            onClick={() =>
                              updateAdminSetting(
                                "tournamentStarted",
                                !adminSettings.tournamentStarted
                              )
                            }
                          >
                            Tournament Started: {adminSettings.tournamentStarted ? "On" : "Off"}
                          </button>
                        </div>
                        <div className="admin-controls">
                          <label className="admin-sort-label" htmlFor="admin-sort">
                            Sort by
                          </label>
                          <select
                            id="admin-sort"
                            className="admin-sort-select"
                            value={adminSort}
                            onChange={(event) => setAdminSort(event.target.value)}
                          >
                            <option value="username_asc">Username (A-Z)</option>
                            <option value="username_desc">Username (Z-A)</option>
                            <option value="entries_desc">Entries (Most)</option>
                            <option value="entries_asc">Entries (Fewest)</option>
                            <option value="alive_desc">Alive Entries (Most)</option>
                            <option value="unpaid_desc">Unpaid (Most)</option>
                          </select>
                        <button
                          type="button"
                          className="admin-control-button"
                          onClick={allAdminExpanded ? collapseAllAdminUsers : expandAllAdminUsers}
                        >
                          {allAdminExpanded ? "Close All" : "Open All"}
                        </button>
                        </div>
                        <div className="admin-copy-controls">
                          <button type="button" className="admin-control-button" onClick={copyAdminEmails}>
                            Copy Emails
                          </button>
                          <button
                            type="button"
                            className="admin-control-button"
                            onClick={copyOutstandingEmails}
                          >
                            Copy Unpaid Emails
                          </button>
                          <button
                            type="button"
                            className="admin-control-button"
                            onClick={copyAliveEntryEmails}
                          >
                            Copy Alive Emails
                          </button>
                        </div>
                        {adminNotice && <p className="admin-notice">{adminNotice}</p>}
                        <div className="admin-users-list">
                          {displayedAdminUsers.map((user) => {
                            const isExpanded = Boolean(expandedAdminUsers[user.usernameLower]);
                            const totalEntries = user.entries.length;
                            const paidEntries = user.entries.filter((entry) => Boolean(entry.isPaid)).length;
                            const paidPercent =
                              totalEntries > 0 ? Math.round((paidEntries / totalEntries) * 100) : 100;
                            const hasUnpaidEntries = totalEntries > paidEntries;

                            return (
                              <div className="admin-user-card" key={user.usernameLower}>
                                <button
                                  type="button"
                                  className="admin-user-header"
                                  onClick={() => toggleAdminUser(user.usernameLower)}
                                  aria-expanded={isExpanded}
                                >
                                  <span className="admin-user-header-main">
                                    <span className="admin-user-name">{user.username}</span>
                                    <span className="admin-user-email">{user.email || "No email"}</span>
                                    <span
                                      className={`admin-user-paid ${
                                        paidPercent === 100 ? "paid-complete" : "paid-incomplete"
                                      }`}
                                    >
                                      Paid: {paidPercent}% ({paidEntries}/{totalEntries})
                                    </span>
                                  </span>
                                  <span className="admin-user-actions">
                                    <button
                                      type="button"
                                      className="admin-mark-all-paid"
                                      disabled={!hasUnpaidEntries}
                                      onClick={(event) => {
                                        event.stopPropagation();
                                        markAllEntriesPaidForUser(user);
                                      }}
                                    >
                                      {hasUnpaidEntries ? "Mark All Paid" : "All Paid"}
                                    </button>
                                    <span className="admin-user-count">{user.entries.length}</span>
                                  </span>
                                </button>
                                {isExpanded && (
                                  <div className="admin-user-entries">
                                    {user.entries.length === 0 && (
                                      <p className="pick-section-content">No entries for this user.</p>
                                    )}
                                    {user.entries.map((entry) => {
                                      const adminPickName = getPickName(entry.currentPick);
                                      const adminPickLogo = getPickLogo(entry.currentPick);
                                      const adminEntryEliminated = isEntryEliminatedByRules(
                                        entry,
                                        adminSettings.entriesLocked,
                                        adminSettings.tournamentStarted
                                      );

                                      return (
                                        <div
                                          className={`admin-entry-row ${
                                            adminEntryEliminated ? "eliminated" : ""
                                          }`}
                                          key={entry.id}
                                        >
                                          <span className="admin-entry-user-wrap">
                                            <span className="admin-entry-user">Entry ({entry.entryNumber})</span>
                                            {adminEntryEliminated && (
                                              <span className="admin-entry-eliminated-badge" aria-label="Eliminated">
                                                x
                                              </span>
                                            )}
                                          </span>
                                          <div className="admin-entry-details">
                                            <div className="admin-entry-pick">
                                              <span>Current:</span>
                                              {adminPickName ? (
                                                <span className="admin-pick-chip">
                                                  {adminPickLogo && (
                                                    <img
                                                      className="admin-pick-logo"
                                                      src={adminPickLogo}
                                                      alt={`${adminPickName} logo`}
                                                      loading="lazy"
                                                    />
                                                  )}
                                                  <span>{adminPickName}</span>
                                                </span>
                                              ) : (
                                                <span>No team chosen</span>
                                              )}
                                            </div>
                                            <div className="admin-entry-prev">
                                              <span>Previous:</span>
                                              {entry.previousPicks?.length ? (
                                                <div className="admin-prev-picks">
                                                  {entry.previousPicks.map((pick, pickIndex) => {
                                                    const previousPickName = getPickName(pick);
                                                    const previousPickLogo = getPickLogo(pick);

                                                    return (
                                                      <span className="admin-pick-chip" key={`${entry.id}-prev-${pickIndex}`}>
                                                        {previousPickLogo && (
                                                          <img
                                                            className="admin-pick-logo"
                                                            src={previousPickLogo}
                                                            alt={`${previousPickName} logo`}
                                                            loading="lazy"
                                                          />
                                                        )}
                                                        <span>{previousPickName}</span>
                                                      </span>
                                                    );
                                                  })}
                                                </div>
                                              ) : (
                                                <span>None</span>
                                              )}
                                            </div>
                                            <div className="admin-entry-paid">
                                              <span>Paid:</span>
                                              <span className={entry.isPaid ? "paid-yes" : "paid-no"}>
                                                {entry.isPaid ? "Yes" : "No"}
                                              </span>
                                              <button
                                                type="button"
                                                className="admin-paid-toggle"
                                                onClick={() =>
                                                  updateAdminEntryPaid(entry.id, !Boolean(entry.isPaid))
                                                }
                                              >
                                                {entry.isPaid ? "Mark Unpaid" : "Mark Paid"}
                                              </button>
                                            </div>
                                          </div>
                                          <button
                                            type="button"
                                            className="admin-entry-delete"
                                            onClick={() =>
                                              setAdminEntryPendingDelete({
                                                id: entry.id,
                                                username: user.username,
                                                entryNumber: entry.entryNumber,
                                              })
                                            }
                                            aria-label={`Delete ${user.username} (${entry.entryNumber})`}
                                          >
                                            x
                                          </button>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                  <aside className="admin-chart-panel">
                    <button
                      type="button"
                      className="admin-panel-header"
                      onClick={() => setAdminChartCollapsed((prev) => !prev)}
                      aria-expanded={!adminChartCollapsed}
                    >
                      <span className="pick-section-title">Current Pick Counts</span>
                      <span className="admin-panel-toggle">{adminChartCollapsed ? "+" : "−"}</span>
                    </button>
                    {!adminChartCollapsed && (
                      <div className="admin-entry-totals">
                        <p className="admin-alive-count">Alive: {aliveEntriesCount}</p>
                        <p className="admin-eliminated-count">Eliminated: {eliminatedEntriesCount}</p>
                      </div>
                    )}
                    {!adminChartCollapsed &&
                      (teamSelectionCounts.length === 0 ? (
                        <p className="pick-section-content">No teams selected yet.</p>
                      ) : (
                        <div className="admin-team-chart">
                          {teamSelectionCounts.map((item) => {
                            const maxCount = teamSelectionCounts[0]?.count || 1;
                            const widthPercent = Math.max(6, Math.round((item.count / maxCount) * 100));

                            return (
                              <div className="admin-team-row" key={item.teamName}>
                                <div className="admin-team-meta">
                                  {item.logo ? (
                                    <img
                                      className="admin-team-logo"
                                      src={item.logo}
                                      alt={`${item.teamName} logo`}
                                      loading="lazy"
                                    />
                                  ) : (
                                    <span className="admin-team-logo-placeholder" aria-hidden="true">
                                      ∅
                                    </span>
                                  )}
                                  <span className={`admin-team-name ${item.isNoSelection ? "no-selection" : ""}`}>
                                    {item.teamName}
                                  </span>
                                  <span className="admin-team-count">{item.count}</span>
                                </div>
                                <div className="admin-team-bar-wrap">
                                  <div className="admin-team-bar" style={{ width: `${widthPercent}%` }} />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ))}
                  </aside>
                </div>
              )}
            </section>
          )}
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
              Delete "{currentUserName} ({entryPendingDelete.entryNumber})"?
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
      {adminEntryPendingDelete !== null && (
        <div className="confirm-backdrop" onClick={() => setAdminEntryPendingDelete(null)}>
          <section className="confirm-modal" onClick={(event) => event.stopPropagation()}>
            <h2>Delete Admin Entry</h2>
            <p>
              Delete "{adminEntryPendingDelete.username} ({adminEntryPendingDelete.entryNumber})"?
            </p>
            <div className="confirm-actions">
              <button
                type="button"
                className="confirm-cancel"
                onClick={() => setAdminEntryPendingDelete(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="confirm-delete"
                onClick={() => confirmDeleteAdminEntry(adminEntryPendingDelete)}
              >
                Delete
              </button>
            </div>
          </section>
        </div>
      )}
      {authPopupMessage && (
        <div
          className="confirm-backdrop"
          onClick={() => {
            setAuthPopupTitle("");
            setAuthPopupMessage("");
          }}
        >
          <section className="confirm-modal" onClick={(event) => event.stopPropagation()}>
            <h2>{authPopupTitle || "Notice"}</h2>
            <p>{authPopupMessage}</p>
            <div className="confirm-actions">
              <button
                type="button"
                className="confirm-cancel"
                onClick={() => {
                  setAuthPopupTitle("");
                  setAuthPopupMessage("");
                }}
              >
                OK
              </button>
            </div>
          </section>
        </div>
      )}
      {tournamentResetPending && (
        <div className="confirm-backdrop" onClick={() => setTournamentResetPending(false)}>
          <section className="confirm-modal" onClick={(event) => event.stopPropagation()}>
            <h2>Reset Tournament Start?</h2>
            <p>
              Turning Tournament Started off will make all entries alive again. Continue?
            </p>
            <div className="confirm-actions">
              <button
                type="button"
                className="confirm-cancel"
                onClick={() => setTournamentResetPending(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="confirm-delete"
                onClick={async () => {
                  setTournamentResetPending(false);
                  await applyAdminSettingUpdate("tournamentStarted", false);
                }}
              >
                Confirm
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
