// //process.env.NODE_NO_WARNINGS = true;

// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const Identity = require('./model');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());


// mongoose.connect('mongodb+srv://gk24014:Neeraj@cluster0.4vkgn.mongodb.net/angular?retryWrites=true&w=majority&appName=Cluster0');

// app.post("/users/register", (req, res) => {
//   const { name, father, mother, gender, mobile, email, address } = req.body;
//   const newIdentity = new Identity({ name, father, mother, gender, mobile, email, address });

//   newIdentity.save()
//     .then(savedIdentity => res.json(savedIdentity))
//     .catch(err => res.status(500).json({ error: err.message }));
// });

// app.get("/users/:id", async (req, res) => {
//   try {
//     const _id = req.params.id;
//     const getIdentity = await Identity.findById(_id);
//     res.send(getIdentity);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

// app.patch("/users/:id", async (req, res) => {
//   try {
//     const _id = req.params.id;
//     const updateIdentity = await Identity.findByIdAndUpdate(_id, req.body, { new: true });
//     res.send(updateIdentity);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

// app.get("/users", async (req, res) => {
//   try {
//     const getIdentities = await Identity.find();
//     res.send(getIdentities);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

// app.delete("/users/:id", async (req, res) => {
//   try {
//     const _id = req.params.id;
//     const deleteIdentity = await Identity.findByIdAndDelete(_id);
//     res.send(deleteIdentity);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
// process.env.NODE_NO_WARNINGS = true;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Identity = require('./model');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Use environment variables for sensitive information
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://gk24014:Neeraj@cluster0.4vkgn.mongodb.net/angular?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

app.post("/users/register", (req, res) => {
  const { name, father, mother, gender, mobile, email, address } = req.body;
  const newIdentity = new Identity({ name, father, mother, gender, mobile, email, address });

  newIdentity.save()
    .then(savedIdentity => res.json(savedIdentity))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.get("/users/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const getIdentity = await Identity.findById(_id);
    if (!getIdentity) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.send(getIdentity);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.patch("/users/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateIdentity = await Identity.findByIdAndUpdate(_id, req.body, { new: true });
    if (!updateIdentity) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.send(updateIdentity);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get("/users", async (req, res) => {
  try {
    const getIdentities = await Identity.find();
    res.send(getIdentities);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteIdentity = await Identity.findByIdAndDelete(_id);
    if (!deleteIdentity) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.send(deleteIdentity);
  } catch (e) {
    res.status(400).send(e);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
