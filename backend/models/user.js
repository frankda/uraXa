const db = require("../db/db.js");

// select all users
function allUsers() {
    return db.query("SELECT * FROM users;");
}

// find one user by id
function findById(id) {
    return db.query("SELECT * FROM users WHERE id = $1;", [id]);
}

// find one user by email
function findByEmail(email) {
    return db.query("SELECT * FROM users WHERE email = $1;", [email]);
}

// find one user by email
function findByToken(token) {
    return db.query("SELECT * FROM users WHERE token = $1;", [token]);
}

// insert / create user to table

function createUser(email, pass_digest, username, description, token, position) {
    return db.query("INSERT INTO users (email, password_digest, username, description, token, position) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;", [email, pass_digest, username, description, token, position]);
}

// update user's avatar and description
function updateUser(email, description) {
    return db.query("UPDATE users SET description = $1 WHERE email = $2 RETURNING *;", [description, email]);
}

// update user's avatar and description
function updateUserToken(email, token) {
    return db.query("UPDATE users SET token = $1 WHERE email = $2 RETURNING *;", [token, email]);
}

// delete user by email FROM table
function deleteUser(email) {
    return db.query("DELETE FROM users WHERE email = $1 RETURNING *;", [email]);
}

module.exports = {
    allUsers,
    findById,
    findByEmail,
    findByToken,
    createUser,
    updateUser,
    updateUserToken,
    deleteUser
};

