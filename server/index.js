const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const app = express();
const port = 3000;
const router = express.Router()

async function getMongoData() {
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'assn6';
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('race');
    const findResult = await collection.find({});
    client.close()
    return findResult;
}

router.get('/barchart', function(req, res) {
    res.sendFile(path.join(__dirname, '../frontend/html/bar.html'));
})
router.get('/barchart_data', async function(req, res) {
    const coll = await getMongoData();
    res.send(coll)
})
app.use('/public', express.static('../frontend'))

app.use(router)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));