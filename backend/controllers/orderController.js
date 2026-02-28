import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../model/orderModel.js';

<<<<<<< HEAD

=======
// @desc    Create new order
// @route   POST /api/orders
// @access  Private
>>>>>>> 2690897070caa24578df2a71f09838ad35aa12ed
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        const order = new Order({
            orderItems: orderItems.map((x) => ({
                ...x,
                product: x._id,
                _id: undefined,
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }
});

<<<<<<< HEAD

=======
// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
>>>>>>> 2690897070caa24578df2a71f09838ad35aa12ed
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    );

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

export {
    addOrderItems,
    getOrderById,
};
