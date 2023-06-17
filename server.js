const express = require('express');

const app = new express();

const port = 8080;

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Serving photo App on http://localhost:${port}`);
})

app.get('/', (req, res) => {
    res.json({
        "hosting": "Kinsta"
    })
})

console.log('Listening on port ${port}');