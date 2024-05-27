import fs from 'fs';
import path from 'path';

const dbFilePath = path.resolve(process.cwd(), 'pages/api/db.json');

function readProducts() {
  const data = fs.readFileSync(dbFilePath, 'utf8');
  return JSON.parse(data);
}

function writeProducts(products) {
  fs.writeFileSync(dbFilePath, JSON.stringify(products, null, 2), 'utf8');
}

export default function handler(req, res) {
  try {
    let products = readProducts();

    if (req.method === 'GET') {
      res.status(200).json(products);
    } else if (req.method === 'POST') {
      const newProduct = req.body;
      newProduct.id = Math.random().toString(36).substr(2, 9); // Generate a unique ID
      products.push(newProduct);
      writeProducts(products);
      res.status(201).json(newProduct);
    } else if (req.method === 'PUT') {
      const { id } = req.query;
      const updatedProduct = req.body;
      const productIndex = products.findIndex(product => product.id === id);
      if (productIndex !== -1) {
        products[productIndex] = { ...products[productIndex], ...updatedProduct };
        writeProducts(products);
        res.status(200).json(products[productIndex]);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } else if (req.method === 'DELETE') {
      const { id } = req.query;
      products = products.filter(product => product.id !== id);
      writeProducts(products);
      res.status(204).end();
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
