import express from 'express';
import ProductManager from './products.js'; 

const app = express();
const port = 8080;

const productManager = ProductManager;

// Endpoint para obtener productos y opcion limit 
app.get('/products', (req , res) => {
    const limit = req.query.limit; // Obtiene "limit" de la consulta
    
    let products = productManager.getProducts();

    if (limit) {
        products = products.slice(0, Number(limit));
    }

    res.json({ response: products });
});

// Endpoint para obtener un producto por ID
app.get('/products/:pid', (req, res) => {
    const productId = parseInt(req.params.pid); // ID del producto desde los parámetros de la URL

    const product = productManager.getProductById(productId); // Obtiene el producto por ID

    if (product) {
        res.json({ product });
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
});

