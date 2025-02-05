const express = require('express');
const app = express();
const MenuItem = require('./models/MenuItem');

app.use(express.json());

// Create a new menu item
app.post('/menu', async (req, res) => {
  try {
    const { name, description, price } = req.body;
    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required.' });
    }
    const newItem = new MenuItem({ name, description, price });
    await newItem.save();
    res.status(201).json({ message: 'Menu item created successfully', item: newItem });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the menu item.' });
  }
});

// Retrieve all menu items
app.get('/menu', async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving menu items.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
