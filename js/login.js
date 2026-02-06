document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const input = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!input || !password) {
    alert("Please fill in all fields");
    return;
  }

  /* =========================
     STEP 1: TRY API LOGIN (ReqRes)
     ========================= */
  if (input.includes("@")) {
    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: input,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok) {
        // API login success
        localStorage.setItem("token", data.token);
        localStorage.setItem("currentUser", input);
        localStorage.removeItem("currentAvatar");

        window.location.href = "./home.html";
        return;
      }
      // API responded but login failed → try local next

    } catch (error) {
      // API unreachable → silently fall back to local
      console.warn("ReqRes API unreachable, falling back to local login");
    }
  }

  /* =========================
     STEP 2: LOCAL LOGIN
     ========================= */
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const localUser = users.find(
    u => u.username === input && u.password === password
  );

  if (localUser) {
    localStorage.setItem("token", "local-user-token");
    localStorage.setItem("currentUser", localUser.username);
    localStorage.setItem("currentAvatar", localUser.avatar || "");

    window.location.href = "./home.html";
  } else {
    alert("Invalid username / email or password ❌");
  }
});