document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const data = await response.json();

    if (response.ok) {
      // Save token from API
      localStorage.setItem("token", data.token);

      // Redirect
      window.location.href = "home.html";
    } else {
      alert("Login failed.");
    }

  } catch (error) {
    alert("Server error.");
  }
});