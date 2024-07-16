const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

// CSP header configuration
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "default-src": ["'self'"],
      "style-src": ["'self'", 'https://fonts.googleapis.com'],
      "font-src": ["'self'", 'https://fonts.gstatic.com']
    }
  })
);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/framework1', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// Define category schema and model
const categorySchema = new mongoose.Schema({
  name: String
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  desc: String,
  category: String
});

const Category = mongoose.model('Category', categorySchema);
const Product = mongoose.model('Product', productSchema);

// === Routes for categories ===
app.get('/v1/category', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching categories' });
  }
});

app.get('/v1/category/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      res.json(category);
    } else {
      res.status(404).send({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error fetching category' });
  }
});

app.post('/v1/category', async (req, res) => {
  try {
    const newCategory = req.body;
    const category = await Category.create(newCategory);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).send({ message: 'Error creating category' });
  }
});

app.put('/v1/category/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedCategory) {
      res.json(updatedCategory);
    } else {
      res.status(404).send({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error updating category' });
  }
});

app.delete('/v1/category/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (deletedCategory) {
      res.status(204).send();
    } else {
      res.status(404).send({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error deleting category' });
  }
});

// === Routes for products ===
app.get('/v1/product', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching products' });
  }
});

app.get('/v1/product/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).send({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error fetching product' });
  }
});

app.post('/v1/product', async (req, res) => {
  try {
    const newProduct = req.body;
    const product = await Product.create(newProduct);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).send({ message: 'Error creating product' });
  }
});

app.put('/v1/product/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).send({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error updating product' });
  }
});

app.delete('/v1/product/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (deletedProduct) {
      res.status(204).send();
    } else {
      res.status(404).send({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error deleting product' });
  }
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
