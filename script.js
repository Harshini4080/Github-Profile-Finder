// API USED => https://api.github.com/users/user_name

// Get the input field element
let input_user = document.querySelector("#input");

// Get elements to display GitHub user info
const userImg = document.querySelector(".main-info");
const bio = document.querySelector("#bio");
const repos = document.querySelector("#repo");
const followers = document.querySelector("#followers");
const following = document.querySelector("#following");

/**
 * Fetch GitHub user data from API and update UI
 * @param {string} user_name - GitHub username entered by user
 */
const fetchUser = (user_name) => {
	fetch(`https://api.github.com/users/${user_name}`)
		.then((data) => data.json())
		.then((jsonData) => {
			// Handle user not found
			if (jsonData.message === "Not Found") {
				alert("User Not Found");
			} else {
				// Update profile section with user details
				userImg.innerHTML = `
					<img src="${jsonData.avatar_url}" alt="avatar" id="prof-img">
					<span class="name" id="name">${jsonData.name}</span>
					<a href="${jsonData.html_url}" id="username" target="_blank">@${jsonData.login}</a>
				`;

				// Update bio, repos, followers, and following
				bio.innerHTML = jsonData.bio || "No bio available";
				repos.innerHTML = jsonData.public_repos;
				followers.innerHTML = jsonData.followers;
				following.innerHTML = jsonData.following;
			}
		})
		.catch((err) => {
			// Catch any errors during the fetch process
			console.log("Catch: " + err.message);
		});
};

/**
 * Function called on Search button click
 * Gets username from input, validates, and triggers fetch
 */
const getUser = () => {
	let user_name = input_user.value.trim(); // Remove leading/trailing spaces

	if (user_name.length === 0) {
		alert("Please enter a valid GitHub username");
	} else {
		fetchUser(user_name); // Fetch data if username is valid
	}

	input_user.value = ""; // Clear input field after submission
};
