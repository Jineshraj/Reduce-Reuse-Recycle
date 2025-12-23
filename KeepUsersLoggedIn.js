/* ♻️ AUTH PERSISTENCE BLUEPRINT 
   Purpose: Keeps user logged in after page refresh & syncs multiple tabs.
*/

useEffect(() => {
  const readAuthFromStorage = () => {
    // 1. Look for the "Big Folder" (Object)
    const json = localStorage.getItem("cine_auth");
    if (json) {
      try {
        const parsed = JSON.parse(json);
        setIsLoggedIn(Boolean(parsed?.isLoggedIn));
        setUserEmail(parsed?.email || "");
        return; 
      } catch (err) { /* Data was broken, move to fallback */ }
    }

    // 2. Look for "Small Notes" (Simple flags)
    const simpleFlag = localStorage.getItem("isLoggedIn");
    const email = localStorage.getItem("userEmail") || localStorage.getItem("cine_user_email");
    
    if (simpleFlag === "true" || email) {
      setIsLoggedIn(true);
      setUserEmail(email || "");
      return;
    }

    // 3. If nothing found, reset to Logged Out
    setIsLoggedIn(false);
    setUserEmail("");
  };

  // Run immediately when page loads
  readAuthFromStorage();

  // "Tab Talk": If I log out in Tab A, Tab B updates automatically
  const onStorage = (e) => {
    const keys = ["cine_auth", "isLoggedIn", "userEmail", "cine_user_email"];
    if (keys.includes(e.key)) readAuthFromStorage();
  };

  window.addEventListener("storage", onStorage);
  return () => window.removeEventListener("storage", onStorage);
}, []);
