import express from 'express'
import {MongoClient} from "mongodb";
import path from 'path';

async function start() {

    const app = express();
    const url = `mongodb+srv://jajamoo:Praspras_1984@moe.x8xthy9.mongodb.net/?retryWrites=true&w=majority`
    const client = new MongoClient(url);

    await client.connect();
    const db = client.db('fsv-db');

    app.use(express.json());

    app.use('/images', express.static(path.join(__dirname, '../assets')));

    async function populateCartIds(ids) {
        // return ids.map(id => products.find(product => product.id === id));
        return Promise.all(ids.map(id => db.collection('products').findOne({id})));

    }

    app.get('/api/hello', async (req, res) => {
        // res.send('Sup Nerd!');

        const products = await db.collection('products').find({}).toArray();
        res.send(products);

    });

    app.get('/api/products', async (req, res) => {
        // res.json(products);
        const products = await db.collection('products').find({}).toArray();
        res.send(products);
    });

//this is for the "normal" cart items array in the temp-data.js file
// app.get('/api/cart', (req, res) => {
//     res.json(cartItems);
// });

    app.get('/api/users/:userId/cart', async (req, res) => {
        // const populatedCart = cartItems.map(id => products.find(product => product.id === id));
        // res.json(populatedCart);populateCartIds(cartItems)
        const users = await db.collection('users').findOne({
            id: req.params.userId
        });


        const populatedCart = await populateCartIds(users?.cartItems || []);

        res.json(populatedCart);
    });

    app.get('/api/products/:productId', async (req, res) => {
        // const productId = req.params.productId;
        // const product = products.find(
        //     product => product.id === productId
        // );
        // res.json(product);

        const productId = req.params.productId;
        const product = await db.collection('products').findOne({id: productId});
        res.json(product);
    });

    app.post('/api/users/:userId/cart', async (req, res) => {
        const productId = req.body.id;
        const userId = req.params.userId;

        // const product = products.find(
        //     product => product.id === productId
        // );

        await db.collection('users').updateOne({id: userId}, {
            //no duplicates (vs $push, which doesn't account for duplicates)
            $addToSet: {cartItems: productId}
        });

        getUserAndPopulateCart(req, res);
    });

    app.delete('/api/users/:userId/cart/:productId', async (req, res) => {
        const productId = req.params.productId;
        const userId = req.params.userId;

        await db.collection('users').updateOne({id: userId}, {
            //no duplicates (vs $push, which doesn't account for duplicates)
            $pull: {cartItems: productId}
        });

        getUserAndPopulateCart(req, res);
    });

    async function getUserAndPopulateCart(req, res){
        const user = await db.collection('users').findOne({
            id: req.params.userId
        });
        const populatedCart = await populateCartIds(user?.cartItems || []);

        res.json(populatedCart);
    }

    app.listen(8000, () => {
        console.log('Server listening on Port 8000')
    });
}

start()
