const crypto = require('crypto');

function pbkdf2_sha256(password, salt, iterations, callback) {
    crypto.pbkdf2(password, salt, iterations, 32, 'sha256', (err, derivedKey) => {
        if (err) throw err;
        callback(derivedKey);
    });
}

function sha256(data, callback) {
    const hash = crypto.createHash('sha256');
    hash.update(data);
    callback(hash.digest('hex'));
}

const password = "examplepassword";
const salt = crypto.randomBytes(16);
const data = "exampledata";
const iterationsList = [1000, 10000, 100000];

iterationsList.forEach(iterations => {
    const startTime = process.hrtime();
    pbkdf2_sha256(password, salt, iterations, () => {
        const endTime = process.hrtime(startTime);
        const timeTaken = endTime[0] * 1000 + endTime[1] / 1000000;
        console.log(`PBKDF2-SHA256 with ${iterations} iterations: ${timeTaken.toFixed(2)} ms`);
    });
});

const startTime = process.hrtime();
sha256(data, () => {
    const endTime = process.hrtime(startTime);
    const timeTaken = endTime[0] * 1000 + endTime[1] / 1000000;
    console.log(`SHA-256 (single hash): ${timeTaken.toFixed(2)} ms`);
});
