document.addEventListener("DOMContentLoaded", function () {
    let usersDetails = localStorage.getItem("users");

    if (usersDetails) {
        let storedData = JSON.parse(usersDetails);
        users = { ...storedData };
        let usersCount = users.count;
        let userKey = "user" + usersCount;
        tableBody.innerHTML = `
            <tr>
                <td>${users[userKey].Name}</td>
                <td>${users[userKey].Email}</td>
                <td>${users[userKey].Password}</td>
                <td>${users[userKey].DoB}</td>
                <td>${users[userKey].Terms}</td>
            </tr>`;
    } else {
        users.count = 0;
    }
});

function showError(message) {
    errorContainer.textContent = "";
    errorContainer.textContent = message;
}

let users = {};
let errorContainer = document.querySelector(".error-msg");
let form = document.getElementById("formData");
let nameElement = document.getElementById("Name");
let emailElement = document.getElementById("Email");
let passwordElement = document.getElementById("Password");
let dobElement = document.getElementById("DoB");
let checkBoxElement = document.getElementById("Agree");
let tableBody = document.getElementById("tableBody");
let btn = document.getElementById("Submit");

function isNameEmpty(Name) {
    return Name === "";
}
function isEmailEmpty(Email) {
    return Email === "";
}

function isPasswordEmpty(Password) {
    return Password == "";
}
function isAgeEmpty(Age) {
    return Age == "";
}
function isInvalidAge(Age) {
    let currentDate = new Date();
    let userDoB = new Date(Age);
    let userAge = currentDate.getFullYear() - userDoB.getFullYear();
    return userAge < 18 || userAge > 55;
}

form.addEventListener("submit", function (event) {
    console.log("Submission Started");

    event.preventDefault();

    let userName = nameElement.value;
    let userEmail = emailElement.value;
    let userPassword = passwordElement.value;
    let userDoB = dobElement.value;
    let Terms = checkBoxElement.checked;

    console.log("Data Captured");

    if (isNameEmpty(userName)) {
        showError("Name Cannot Be Empty, Please Fill The Field");
        return;
    }
    if (isEmailEmpty(userEmail)) {
        showError("Email Cannot Be Empty, Please Fill The Field");
        return;
    }
    if (isPasswordEmpty(userPassword)) {
        showError("Password Cannot Be Empty, Please Fill The Field");
        return;
    }
    if (isAgeEmpty(userDoB)) {
        showError("Date of Birth Cannot Be Empty, Please Fill The Field");
        return;
    }
    if (isInvalidAge(userDoB)) {
        showError("Age Must Be From 18 To 55 Years Old");
        return;
    }
    showError("");
    users.count++;

    let userKeyName = "user" + users.count;
    let user = {
        name: userName,
        email: userEmail,
        password: userPassword,
        dob: userDoB,
        terms: Terms,
    };
    users[userKeyName] = { ...user };
    localStorage.setItem("users", JSON.stringify(users));

    location.reload();
});
