document.addEventListener("DOMContentLoaded", function () {
    loadTableEntries();
});

function loadTableEntries() {
    let usersDetails = localStorage.getItem("users");

    if (usersDetails) {
        let storedData = JSON.parse(usersDetails);
        let tableBody = document.getElementById("tableBody");
        tableBody.innerHTML = ""; // Clear the existing entries

        for (let key in storedData) {
            if (key !== "count") {
                let user = storedData[key];
                tableBody.innerHTML += `<tr>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.password}</td>
                    <td>${user.dob}</td>
                    <td>${user.terms}</td>
                </tr>`;
            }
        }
    }
}

function showError(message) {
    let errorContainer = document.querySelector(".error-msg");
    errorContainer.textContent = "";
    errorContainer.textContent = message;
}

document.getElementById("formData").addEventListener("submit", function (event) {
    event.preventDefault();

    let userName = document.getElementById("name").value;
    let userEmail = document.getElementById("email").value;
    let userPassword = document.getElementById("password").value;
    let userDob = document.getElementById("dob").value;
    let acceptedTerms = document.getElementById("agree").checked;

    if (!isValidEmail(userEmail)) {
        showError("Invalid email address");
        return;
    }

    if (!isValidAge(userDob)) {
        showError("Age must be between 18 and 55");
        return;
    }

    showError("");

    // Save user data to local storage
    let users = JSON.parse(localStorage.getItem("users")) || { count: 0 };
    let userKeyName = "user" + ++users.count;
    let user = {
        name: userName,
        email: userEmail,
        password: userPassword,
        dob: userDob,
        terms: acceptedTerms,
    };
    users
