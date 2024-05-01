const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); 

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://kiran:kiran%40123@react.sw8a4is.mongodb.net/lpu', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const detailSchema = new mongoose.Schema({
  name: String,
  id: String,
  price: Number,
  image: String
});
const Detail = mongoose.model('Detail', detailSchema, 'details'); 

app.use(cors({
  origin: 'http://localhost:3001'
}));
app.use(bodyParser.json());

// Serve static files from the 'public' directory within the backend directory
app.use('/img', express.static(path.join(__dirname, 'public', 'img')));

app.get('/api/details', async (req, res) => {
  try {
    const details = await Detail.find();
    console.log(details);
    res.json(details);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
