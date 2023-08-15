import express from 'express'

const app = express()

app.get('/hello', (req, res) => {
    res.send('Sup Nerd!');
});
app.listen(8000, () => {
    console.log('Server listening on Port 8000')
});
