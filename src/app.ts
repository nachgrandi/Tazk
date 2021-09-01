import express from 'express'
import cors from 'cors';
import morgan from 'morgan';

import userRoutes from './routes/users.routes';

const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.get('/', (req, res) => {
  return res.send(`The API is at http://localhost:${app.get('port')}`);
});

app.use(userRoutes);

export default app;
