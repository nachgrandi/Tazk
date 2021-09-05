import app from './app';
import './database/mongodb.database';

console.log(`NODE_ENV=${process.env.NODE_ENV}`);
app.listen(app.get('port'));
console.log(`Listening on http://localhost:${app.get('port')}`);