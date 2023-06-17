const express = require('express');

const app = express();

const port = 8080;

app.listen(port, () => {
})

app.get('/', (req, res) => {
    res.json({
        "hosting": "Kinsta"
    })
})

console.log('Listening on port ${port}');