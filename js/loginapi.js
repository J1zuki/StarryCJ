document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please fill in all fields");
    return;
  }

  try {
    // Try REAL API first
    const response = await fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Login failed");
      return;
    }

    // Real API success
    localStorage.setItem("token", data.token);
    window.location.href = "index.html";

  } catch (error) {
    console.warn("API blocked, using fallback");

    // Fallback (API-style simulation)
    if (email === "eve.holt@reqres.in" && password === "cityslicka") {
      localStorage.setItem("token", "fallback-api-token");
      window.location.href = "index.html";
    } else {
      alert("Invalid email or password ❌");
    }
  }
});

