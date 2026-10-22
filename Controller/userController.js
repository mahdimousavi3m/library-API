const url = require("url");



const {
    registerUser: registerUserModel,
    upgradeUser: upgradeUserModel,
    setUserCrime: setUserCrimeModel,
    loginUserModel 
} = require("../Model/userModel");




const registerUser = (req, res) => {
    let user = "";

    req.on("data", (data) => {
        user += data.toString();
    });

    req.on("end", async () => {
        let userData;

        try {
            userData = JSON.parse(user);
        } catch (err) {
            res.writeHead(400, {
                "content-type": "application/json"
            });
            res.end(JSON.stringify({
                message: "Invalid JSON"
            }));
            return;
        }

        if (
            !userData ||
            typeof userData !== "object" ||
            Array.isArray(userData)
        ) {
            res.writeHead(400, {
                "content-type": "application/json"
            });
            res.end(JSON.stringify({
                message: "Invalid request body"
            }));
            return;
        }

        const { userName, email } = userData;

        if (
            typeof userName !== "string" ||
            typeof email !== "string" ||
            !userName.trim() ||
            !email.trim()
        ) {
            res.writeHead(400, {
                "content-type": "application/json"
            });
            res.end(JSON.stringify({
                message: "Username and email are required"
            }));
            return;
        }

        try {
            const result = await registerUserModel(
                userName,
                email
            );

            if (
                result.success === false &&
                result.reason === "USER-EXIST"
            ) {
                res.writeHead(409, {
                    "content-type": "application/json"
                });
                res.end(JSON.stringify({
                    message: "Email or username already exists"
                }));
                return;
            }

            res.writeHead(201, {
                "content-type": "application/json"
            });
            res.end(JSON.stringify({
                message: "User registered successfully"
            }));

        } catch (err) {
            console.error(err);

            res.writeHead(500, {
                "content-type": "application/json"
            });
            res.end(JSON.stringify({
                message: "Internal server error"
            }));
        }
    });
};


const upgradeUser = async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const userId = parsedUrl.query.id;

    if (!userId) {
        res.writeHead(400, {
            "content-type": "application/json"
        });
        res.end(JSON.stringify({
            message: "User ID is required"
        }));
        return;
    }

    try {
        const result = await upgradeUserModel(userId);

        if (!result) {
            res.writeHead(404, {
                "content-type": "application/json"
            });
            res.end(JSON.stringify({
                message: "User not found"
            }));
            return;
        }

        res.writeHead(200, {
            "content-type": "application/json"
        });
        res.end(JSON.stringify({
            message: "User upgraded successfully"
        }));

    } catch (err) {
        console.error(err);

        res.writeHead(500, {
            "content-type": "application/json"
        });
        res.end(JSON.stringify({
            message: "Internal server error"
        }));
    }
};


const setUserCrime = async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const userId = parsedUrl.query.id;
    let body = "";
    req.on("data", (data) => {
        body += data.toString();
    })

    req.on("end", async () => {
        const { crime } = JSON.parse(body);

        if (!userId) {
            res.writeHead(400, { "content-type": "application/json" });
            res.write(JSON.stringify({ message: "User Id is required" }));
            return res.end();
        }


        let isUserCrime = await setUserCrimeModel(userId, crime);


        if (!isUserCrime) {
            res.writeHead(404, { "content-type": "application/json" });
            res.write(JSON.stringify({ message: "User Not Found" }));
            res.end();
        }
        else {
            res.writeHead(200, { "content-type": "application/json" });
            res.write(JSON.stringify({ message: "Crime Set Successfully" }));
            res.end();

        }

    });
};


const loginUser = async (req, res) => {
    let body = "";

    req.on("data", (data) => {
        body += data.toString();
    });

    req.on("end", async () => {
        const { userName, email } = JSON.parse(body);

        const mainUser = await loginUserModel(userName, email);

        if (mainUser) {
            res.writeHead(200, { "content-type": "application/json" });
            res.write(JSON.stringify(mainUser));
            res.end();
        } else {
            res.writeHead(401, { "content-type": "application/json" });
            res.write(JSON.stringify({ message: "User not Found" }));
            res.end();
        }
    });
};


module.exports = {
    registerUser,
    upgradeUser,
    setUserCrime,
    loginUser
};
