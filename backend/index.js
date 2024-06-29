import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3005;

app.use(cors());

app.get('/', (req,res) => {
   res.json('Welcome to the backend1!');
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}vds`);
});
