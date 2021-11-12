const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// const dataVis = require('./dataVis');
// const willard = require('./willard')

// app.use('/dataVis', dataVis);
// TODO: Add your own router
// app.use('/willard', willard)

const router = express.Router()

router.get('/barchart', function(req, res) {
    console.log('got a barchart')
    res.sendFile(path.join(__dirname, '../frontend/html/bar.html'));
})
app.use('/public', express.static('../frontend'))

app.use(router)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));