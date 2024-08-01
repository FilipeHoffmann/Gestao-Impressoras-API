const express = require('express');

const app = express();
const port = 3100;

const indexRouter = require('./routes');

app.use(express.json());

app.use('/', indexRouter);

app.listen(port, () => {
    console.log(`Server running in port ${port}`)
});