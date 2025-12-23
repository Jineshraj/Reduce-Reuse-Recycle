// This block runs once when the app starts
useEffect(() => {
  const readAuthFromStorage = () => {
    // 1. Try to read the main data object
    const json = localStorage.getItem("cine_auth");
    if (json) {
      try {
        const parsed = JSON.parse(json);
        setIsLoggedIn(Boolean(parsed?.isLoggedIn));
        setUserEmail(parsed?.email || "");
        return;
      } catch (err) {}
    }

    // 2. Backup: Check for simple login flags or email keys
    const simpleFlag = localStorage.getItem("isLoggedIn");
    const email = localStorage.getItem("userEmail") || localStorage.getItem("cine_user_email");
    if (simpleFlag === "true") {
      setIsLoggedIn(true);
      setUserEmail(email || "");
      return;
    }

    // 3. Last resort: If email exists but no flag, still log them in
    if (email) {
      setIsLoggedIn(true);
      setUserEmail(email);
      return;
    }

    // 4. Default: No data found, user is logged out
    setIsLoggedIn(false);
    setUserEmail("");
  };

  readAuthFromStorage();

  // This part listens for login/logout actions in OTHER browser tabs
  const onStorage = (e) => {
    if (["cine_auth", "isLoggedIn", "userEmail", "cine_user_email"].includes(e.key)) {
      readAuthFromStorage();
    }
  };
  window.addEventListener("storage", onStorage);

  // Clean up the listener when the component is closed
  return () => window.removeEventListener("storage", onStorage);
}, []);
