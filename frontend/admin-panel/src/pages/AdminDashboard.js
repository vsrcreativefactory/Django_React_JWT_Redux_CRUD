import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '' });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/products/');
        setProducts(response.data);
    };

    const createProduct = async () => {
        const response = await axios.post('http://127.0.0.1:8000/api/products/', newProduct);
        setProducts([...products, response.data]);
    };

    const deleteProduct = async (id) => {
        await axios.delete(`http://127.0.0.1:8000/api/products/${id}/`);
        setProducts(products.filter((product) => product.id !== id));
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <form onSubmit={createProduct}>
                <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="Product Name"
                />
                <input
                    type="text"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    placeholder="Description"
                />
                <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="Price"
                />
                <button type="submit">Create Product</button>
            </form>

            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - {product.price} <button onClick={() => deleteProduct(product.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
