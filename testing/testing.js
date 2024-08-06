const crypto = require('crypto');

const password = "securepassword";
const salt = "some_random_salt";
const iterations = 100000;
const keyLength = 32;
const iv = Buffer.alloc(16, 0);

const data = "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";

function encryptData(data, password, salt, iterations, keyLength, iv) {
    const key = crypto.pbkdf2Sync(password, salt, iterations, keyLength, 'sha256');
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encryptedData = cipher.update(data, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    return encryptedData;
}

function decryptData(encryptedData, password, salt, iterations, keyLength, iv) {
    const key = crypto.pbkdf2Sync(password, salt, iterations, keyLength, 'sha256');
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
    decryptedData += decipher.final('utf8');
    return decryptedData;
}

// Simulate data retrieval without encryption
function fetchDataWithoutEncryption(data) {
    const startTime = process.hrtime();
    const retrievedData = data;
    const endTime = process.hrtime(startTime);
    return { retrievedData, time: endTime[0] * 1e9 + endTime[1] };
}

function fetchDataWithEncryption(encryptedData, password, salt, iterations, keyLength, iv) {
    const startTime = process.hrtime();
    const decryptedData = decryptData(encryptedData, password, salt, iterations, keyLength, iv);
    const retrievedData = decryptedData;
    const endTime = process.hrtime(startTime);
    return { retrievedData, time: endTime[0] * 1e9 + endTime[1] }; // time in nanoseconds
}

function performReadings(iterations) {
    let totalTimeWithoutEncryption = 0;
    let totalTimeWithEncryption = 0;
    const timesWithoutEncryption = [];
    const timesWithEncryption = [];

    for (let i = 0; i < iterations; i++) {
        const resultWithoutEncryption = fetchDataWithoutEncryption(data);
        totalTimeWithoutEncryption += resultWithoutEncryption.time;
        timesWithoutEncryption.push(resultWithoutEncryption.time);

        const encryptedData = encryptData(data, password, salt, iterations, keyLength, iv);
        const resultWithEncryption = fetchDataWithEncryption(encryptedData, password, salt, iterations, keyLength, iv);
        totalTimeWithEncryption += resultWithEncryption.time;
        timesWithEncryption.push(resultWithEncryption.time);
    }

    const avgTimeWithoutEncryption = totalTimeWithoutEncryption / iterations;
    const avgTimeWithEncryption = totalTimeWithEncryption / iterations;

    console.log(`Average time without encryption: ${(avgTimeWithoutEncryption / 1e6).toFixed(8)} ms`);
    console.log(`Average time with encryption: ${(avgTimeWithEncryption / 1e6).toFixed(8)} ms`);

    console.log("\nDetailed readings without encryption (ns):");
    timesWithoutEncryption.forEach((time, index) => {
        console.log(`Iteration ${index + 1}: ${time} ns`);
    });

    console.log("\nDetailed readings with encryption (ns):");
    timesWithEncryption.forEach((time, index) => {
        console.log(`Iteration ${index + 1}: ${time} ns`);
    });
}

const numberOfIterations = 1000;
performReadings(numberOfIterations);
