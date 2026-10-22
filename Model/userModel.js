const db = require("../db.json");
const crypto = require("crypto");
const userRoutes = require("../Routes/userRoutes");
const fs = require("fs").promises;

const registerUser = async (userName, email) => {
    const isUserExist = db.users.find((user) => user.email === email || user.userName === userName);

    if (isUserExist) {
        return {
            success: false,
            reason: "USER-EXIST"
        };
    }

    const newUser = {
        id: crypto.randomUUID(),
        userName,
        email,
        crime: 0,
        role: "USER"
    };


    db.users.push(newUser);

    await fs.writeFile(
        "db.json",
        JSON.stringify(db, null, 2)
    );


    return {
        success: true,
        user: newUser
    }
};

const upgradeUser = async (userId) => {
    const user = db.users.find((user) => user.id === userId);


    if (!user) {
        return false;
    }

    user.role = "ADMIN";


    console.log("Users:", db.users.length);
    console.log("Books:", db.books.length);

    await fs.writeFile(
        "db.json",
        JSON.stringify(db, null, 2)
    );

    return true;
};


const setUserCrime = async (userId, crime) => {
    let userTarget = db.users.find((user) => user.id === userId);

    if (userTarget === undefined) {
        return false;
    }

    console.log("Before update:", userTarget);
console.log("DB file path:", require.resolve("../db.json"));


    userTarget.crime = crime;
    console.log("User before saving:", userTarget);


    await fs.writeFile("db.json", JSON.stringify(db, null, 2));

    
    console.log("Current working directory:", process.cwd());
    console.log("Crime saved:", userTarget.crime);
    return true;

}

const loginUserModel = async (userName, email) => {
    const mainUser = db.users.find(
        (user) => user.userName === userName && user.email === email
    );

    if (!mainUser) {
        return null;
    }

    return {
        userName: mainUser.userName,
        email: mainUser.email
    };
};



module.exports = { registerUser, upgradeUser, setUserCrime , loginUserModel
};