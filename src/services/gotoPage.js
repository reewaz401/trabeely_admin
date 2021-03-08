module.exports = (token, user, path) => {
    localStorage.setItem("_token", token);
    localStorage.setItem("_auth", JSON.stringify(user));
    window.location.href = path;
};