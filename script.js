function fetchUser() {
  let userName = document.getElementById("userName").value;
  let profileDiv = document.getElementById("profile");
  let errorDiv = document.getElementById("error");

  profileDiv.style.display = "none";
  errorDiv.textContent = "";

  if (!userName) {
    errorDiv.textContent = "Please enter a GitHub username.";
    return;
  }

  fetch(`https://api.github.com/users/${userName}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("User not found");
      }
      return response.json();
    })
    .then(data => {
      document.getElementById("avatar").src = data.avatar_url;
      document.getElementById("name").textContent = data.name || "N/A";
      document.getElementById("bio").textContent = data.bio || "N/A";
      document.getElementById("public_repos").textContent = data.public_repos;
      document.getElementById("followers").textContent = data.followers;
      document.getElementById("following").textContent = data.following;
      document.getElementById("profileLink").href = data.html_url;

   profileDiv.classList.add("show");
        profileDiv.style.display = "block";

    })
    .catch(error => {
      errorDiv.textContent = error.message;
    });

    // Allow pressing Enter to search
document.getElementById('userName').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        fetchUser();
    }
});
}
