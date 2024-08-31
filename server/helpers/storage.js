const fs = require('fs');
const path = require('path');

const LOCAL_STORAGE_FILE = path.join(__dirname, 'localStorage.json');

// Load backlog data from local storage
const loadLocalStorage = () => {
    if (fs.existsSync(LOCAL_STORAGE_FILE)) {
        const data = fs.readFileSync(LOCAL_STORAGE_FILE);
        return JSON.parse(data);
    }
    return {};
};

// Save backlog data to local storage
const saveLocalStorage = (data) => {
    console.log(data);
    fs.writeFileSync(LOCAL_STORAGE_FILE, JSON.stringify(data, null, 2));
};

module.exports = {
    loadLocalStorage,
    saveLocalStorage
}