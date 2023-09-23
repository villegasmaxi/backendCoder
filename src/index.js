import express from 'express';
import ProductManager from './products.js'; 

//const express = require('express');
//const ProductManager = require('./desafioEntregable2'); // Importa la clase ProductManager

const app = express();
const port = 8080; // Puedes cambiar el puerto según tus necesidades

const productManager = ProductManager;

// Endpoint para obtener todos los productos con opción de limitar el resultado
app.get('/products', (req , res) => {
    const limit = req.query.limit; // Obtiene el valor del parámetro "limit" de la consulta
    
    let products = productManager.getProducts(); // Obtiene todos los productos

    if (limit) {
        products = products.slice(0, Number(limit)); // Limita el resultado según el valor de "limit"
    }

    res.json({ response: products });
});

// Endpoint para obtener un producto por ID
app.get('/products/:pid', (req, res) => {
    const productId = parseInt(req.params.pid); // Obtiene el ID del producto desde los parámetros de la URL

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
