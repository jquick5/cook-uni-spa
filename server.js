const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect Database
connectDB();

// Init midleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json({ msg: 'Welcome to the CookUni API...' }));

//Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/recipes', require('./routes/recipes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
