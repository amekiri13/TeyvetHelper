function randomNum (max, min) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

module.exports = {randomNum}