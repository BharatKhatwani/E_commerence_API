// 1. Extract from request
const { userId, productId, quantity } = req.body;

// 2. Find if a cart exists for this user
let existingCart = await Cart.findOne({ user: userId });

if (existingCart) {
    // 3. Check if the product already exists in the cart
    const productIndex = existingCart.products.findIndex(
        (item) => item.product.toString() === productId
    );

    if (productIndex > -1) {
        // If exists, update the quantity
        existingCart.products[productIndex].quantity += quantity;
    } else {
        // If not exists, add new product
        existingCart.products.push({ product: productId, quantity });
    }

    await existingCart.save();
} else {
    // 4. Create a new cart
    const newCart = new Cart({
        user: userId,
        products: [{ product: productId, quantity }]
    });
    await newCart.save();
}



// 5. Send response
res.status(201).json({ message: "Cart updated successfully" });
