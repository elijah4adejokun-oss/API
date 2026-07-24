const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.json());

let student = [];
let nameid = 1;