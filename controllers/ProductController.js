const express = require('express');
const Product = require('../models/product.js');

const createdProduct = async (req, res) =>{
    try {
        const {name, price , category ,description , image ,stock  } = req.body;
        if(!name){
            return res.status(400).json({message: 'Name is required'});
        }
        if(!price){
            return res.status(400).json({message: 'Price is required'});
        }
        if(!category){
            return res.status(400).json({message: 'Category is required'});
        }
        if(!stock){
            return res.status(400).json({message: 'Stock is required'});
        }
        const product = new Product({
            name,
            price,
            category,
            description,
            image,
            stock   

        })
        await product.save();
        res.status(201).json({message: 'Product created successfully'});
        
    } catch (error) {
        console.log("There is error in creating product", error);
      res.status(500).json({
        message : "There  is error in the Product " , error
      })
    }
}
const getProduct = async(req, res) =>{
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json(product);
    } catch (error) {
        console.log("Error in the get product", error);
        res.status(500).json({
            message : "There is error in the Product " , error
        })
    }
}
const getAllProduct = async(req,res) =>{
    try {
        const products = await Product.find();
        res.status(200).json(products);
        
    } catch (error) {
       console.log("Error in the get all Product", error);
       res.status(500).json({
        message : "There is error in the Product " , error
       })
    }
}
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, price, category, description, image, stock } = req.body;

    // Update product with new data and return the updated document
    const product = await Product.findByIdAndUpdate(
      productId,
      { name, price, category, description, image, stock },
      { new: true }  // Return the updated document
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.log("Error in the update product", error);
    res.status(500).json({
      message: "There is error in the Product",
      error,
    });
  }
};


const deleteProduct = async (req,res) =>{
    try {
        const productId = req.params.id;
        const product = await Product.findByIdAndDelete(productId);
        if(!product){
            return res.status(404).json({message: 'Product not found'});
        }
        // await product.remove();
res.status(200).json({
    message: 'Product deleted successfully'
})
        
    } catch (error) {
         console.log("Error in the Delete product", error);
        res.status(500).json({
            message : "There is error in the Product " , error
        })
    }
}
module.exports = {createdProduct , getProduct, 
    updateProduct, deleteProduct, getAllProduct
}