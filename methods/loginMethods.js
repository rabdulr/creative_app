const axios = require('axios');

// Page for login methods that may be needed

const headers = () => {
    const token = window.localStorage.getItem('token');
    return {
        headers: {
            authorization: token
        }
    };
};

module.exports = {
    headers,
    // sendLogin,
    // logOut
}
