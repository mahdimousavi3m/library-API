
const {
    registerUser,
    upgradeUser,
    setUserCrime,
    loginUser
} = require("../Controller/userController");

const userRoutes = (req, res) => {
    if (req.method === "POST" && req.url === "/api/users"
    ) {
        return registerUser(req, res);
    }
    else if (req.method === "PUT" && req.url.startsWith("/api/users/upgrade")
    ) {
        return upgradeUser(req, res);
    }
    else if (req.method === "PUT" && req.url.startsWith("/api/users/crime")) {
        return setUserCrime(req, res);
    }
    else if (
        req.method === "POST" &&
        req.url.startsWith("/api/users/login")
    ) {
        return loginUser(req, res);
    }

};

module.exports = userRoutes;
