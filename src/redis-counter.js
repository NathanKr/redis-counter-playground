const redis = require("redis");
const client = redis.createClient();

const okResult = "OK";

// --- increment by 1
function increment(key) {
  return new Promise((resolve, reject) => {
    client.incr(key, (err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }

      return resolve(result); // return the new value
    });
  });
}

function exist(key) {
  return new Promise((resolve, reject) => {
    client.exists(key, (err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }

      return resolve(result); // 1 on exist  , 0 on not exist
    });
  });
}

// result is "OK" on success and error object on failure
function setTo1(key, expiredInSec) {
  return new Promise((resolve, reject) => {
    client.setex(key, expiredInSec, 1, (err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }

      return resolve(result); // "OK"
    });
  });
}

// -- return integer number on success
function get(key) {
  return new Promise((resolve, reject) => {
    client.get(key, (err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }

      const intNumber = parseInt(result, 10);
      return resolve(intNumber);
    });
  });
}

function init() {
  return new Promise((resolve, reject) => {
    client.on("error", function (error) {
      console.error(error);
      return reject(error);
    });

    client.on("connect", function () {
      console.log("Connected to Redis");
      return resolve();
    });
  });
}

function finish() {
  return new Promise((resolve, reject) => {
    client.quit((result) => {
      return resolve(result); // should be ?????
    });
  });
}

module.exports = { init, finish, setTo1, okResult, get, exist, increment };
