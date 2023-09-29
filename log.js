// signup js code

const mysql = require('mysql');
const random = require('randomstring');

function generateRandomNumber() {
    return Math.floor(Math.random() * 9999) + 1;
}

function generateUserId(username) {
    const prefix = username.slice(0, 4);
    const randomNum = generateRandomNumber();
    return prefix + randomNum;
}

function signup(username, password) {
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "admin123",
        database: "user_auth"
    });

    connection.connect((err) => {
        if (err) {
            console.error(`Error: ${err}`);
            return;
        }

        connection.query("SELECT * FROM users WHERE username = ?", [username], (err, result) => {
            if (err) {
                console.error(`Error: ${err}`);
                return;
            }

            if (result.length > 0) {
                console.log("Username already exists. Please choose a different one.");
                return;
            }

            const userId = generateUserId(username);

            connection.query("INSERT INTO users (user_id, username, password) VALUES (?, ?, ?)",
                [userId, username, password], (err, result) => {
                    if (err) {
                        console.error(`Error: ${err}`);
                        return;
                    }

                    console.log("!!! SIGNUP SUCCESSFUL !!!");
                });
        });
    });
}
