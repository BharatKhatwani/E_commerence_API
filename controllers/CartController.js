const express = require('express');
const Cart = require('../models/Cart');
// const e = require('express');


const getCart = async (req, res) =>{
    try {
        const {userId } = req.params;
        const cart = await Cart.findOne({ user: userId }).populate('products.product');
         if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);
    } catch (error) {
        console.log("Error in the getCart function" , error);
        res.status(500).json({
            message: "Internal Server Error",
        })
    }
}
const createdcart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      // Check if product already in cart
      const productIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId
      );

      if (productIndex > -1) {
        // Product exists, update quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        // Product not in cart, add new
        cart.products.push({ product: productId, quantity });
      }

      await cart.save();
      res.status(200).json({ message: 'Cart updated', cart });

    } else {
      // If cart doesn't exist, create new
      const newCart = new Cart({
        user: userId,
        products: [{ product: productId, quantity }]
      });

      await newCart.save();
      res.status(201).json({ message: 'Cart created', cart: newCart });
    }

  } catch (error) {
    console.error("Error in createdcart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const deleteCartItem = async(req , res)=>{
  try {
    const {userId , productId} = req.params;
    const cart = await Cart.findOne({user:userId});
    if(!cart){
        return res.status(404).json({message: "Cart not found"});
    }
     const newProducts = cart.products.filter(
      (item) => item.product.toString() !== productId
    );
      if(newProducts.length() === cart.product.length){
        return res.status(404).json({message: "Product not found in cart"});
      }
      cart.products = newProducts;
      await cart.save();
         res.status(200).json({ message: "Product removed from cart", cart });

  } catch (error) {
    console.error("Error in deleteCartItem:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
module.exports = {
    getCart,createdcart, deleteCartItem
}