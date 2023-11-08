import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST'], // Adjust the methods you need
}));
app.use(bodyParser.json());

// Initialize your routes
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
