import express from 'express';
import cors from 'cors';
import eventRoutes from './routes/EventRoute.js';
import categoryRoutes from './routes/CategoryRoute.js';
import pembicaraRoutes from './routes/PembicaraRoute.js';


const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());


app.use(cors());
app.use('/events', eventRoutes);
app.use('/categories', categoryRoutes);
app.use('/pembicara', pembicaraRoutes);

app.get('/', (req, res) => {
    res.send('Ini adalah API untuk Infovest');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})