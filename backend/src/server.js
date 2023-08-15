import express from 'express'
import {cartItems as cartItemsRaw, products as productsRaw} from "./temp-data";
import {MongoClient} from "mongodb";

let cartItems = cartItemsRaw;
let products = productsRaw;
const app = express();
const url = `mongodb+srv://jajamoo:Praspras_1984@moe.x8xthy9.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(url);
app.use(express.json());



async function populateCartIds(ids){
   // return ids.map(id => products.find(product => product.id === id));

    await client.connect();
    const db = client.db('fsv-db');
   return Promise.all(ids.map(id => db.collection('products').findOne({ id })));

}
app.get('/hello', async (req, res) => {
    // res.send('Sup Nerd!');

    await client.connect();
    const db = client.db('fsv-db');
    const products = await db.collection('products').find({}).toArray();
    res.send(products);

});

app.get('/products', async (req, res) => {
    // res.json(products);
    await client.connect();
    const db = client.db('fsv-db');
    const products = await db.collection('products').find({}).toArray();
    res.send(products);
});

//this is for the "normal" cart items array in the temp-data.js file
// app.get('/cart', (req, res) => {
//     res.json(cartItems);
// });

app.get('/users/:userId/cart', async (req, res) => {
    // const populatedCart = cartItems.map(id => products.find(product => product.id === id));
    // res.json(populatedCart);populateCartIds(cartItems)
    const user = await client.connect();
    const db = client.db('fsv-db');
    const users = await db.collection('users').findOne({
        id: req.params.userId
    });
    const populatedCart = await populateCartIds(users.cartItems);

    res.json(populatedCart);




});
app.get('/products/:productId', (req, res) => {
    const productId = req.params.productId;
    const product = products.find(
        product => product.id === productId
    );
    res.json(product);
});

app.post('/cart', (req, res) => {
    const productId = req.body.id;
    // const product = products.find(
    //     product => product.id === productId
    // );
    cartItems.push(productId);
    const populatedCart = populateCartIds(cartItems)
    res.json(populatedCart);
});

app.delete('/cart/:productId', (req, res) => {
    const productId = req.params.productId;

    cartItems = cartItems.filter(id => id !== productId);
    const populatedCart = populateCartIds(cartItems)
    res.json(populatedCart);
});

app.listen(8000, () => {
    console.log('Server listening on Port 8000')
});
