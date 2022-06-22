const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

//for acces data
app.use(cors());

//for body parse
app.use(express.json());


// user: dbuser1
// pass: kKCVVUKtDOHT0urJ



const uri = `mongodb+srv://dbuser1:kKCVVUKtDOHT0urJ@cluster0.czhfdon.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const userCollection = client.db('foodExpress').collection("user");

        app.post('/user', async(req, res) => {
            const newUser = req.body;
            console.log(newUser);
            const result = await userCollection.insertOne(newUser);
            res.send(result);
        })
    }
    finally {
        //await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('running my Node');
});

app.listen(port, () => {
    console.log('CRUD is running', port);
})