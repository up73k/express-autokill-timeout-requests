const express = require('express');
const app = express();
const asyncHandler = require('express-async-handler');

const sleep = function (timeout) {
  return new Promise((resolve) => setTimeout(() => resolve(), timeout));
};

app.get('/', asyncHandler(async function (req, res) {
  const startTime = new Date();
  try {
    await new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error(`Time elapsed ${(new Date() - startTime)/1000}s`)), 5000);
    });

    await sleep(10000);

    res.send('Hello World');
    console.log(`Request complete ${(new Date() - startTime)/1000}s`);
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
}));

app.listen(3000);
