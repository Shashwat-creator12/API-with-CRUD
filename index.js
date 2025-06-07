const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/easydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected!'))
.catch((err) => console.error(err));


const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  email: String
}));


app.post('/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send(user);
});


app.get('/', (req, res) => {
  res.send('Welcome to the CRUD API!');
});



app.put('/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(user);
});


app.delete('/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.send({ message: 'User deleted' });
});


app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send({ error: 'Something went wrong' });
  }
});



app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
