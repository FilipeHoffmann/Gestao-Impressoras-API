const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const indexRouter = require('./routes');

app.use('/', indexRouter);

app.listen(port, () => {
    console.log(`Server running in port ${port}`)
});