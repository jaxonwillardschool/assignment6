const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const app = express();
const port = 3000;
const router = express.Router()
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'datavis';

async function getMongoData(collection_name) {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection(collection_name);
    const findResult = await collection.find({}).toArray();
    client.close()
    return findResult;
}

router.get('/barchart', function(req, res) {
    res.sendFile(path.join(__dirname, '../frontend/html/bar.html'));
})
router.get('/barchart_data', async function(req, res) {
    const coll = await getMongoData('fatal-police-shootings');
    res.send(coll)
})

router.get('/linechart', function(req, res) {
    res.sendFile(path.join(__dirname, '../frontend/html/line.html'))
})

router.get('/linechart_data', async function(req, res) {
    const coll = await getMongoData('tweets-donald-trump');
    res.send(coll)
})

app.use('/public', express.static('../frontend'))


app.use(router)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));