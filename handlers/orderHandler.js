const orderUsecase = require('../domain/usecase/orderUsecase');

// Handler to create a new order
const createOrder = async (req, res) => {
    try {
        const newOrder = await orderUsecase.create(req.body);
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
};

// const createOrder = async (req, res) => {
//     try {
//         const userId = req.user.id; // Assuming user ID is attached to the request by authentication middleware
//         const orderData = { ...req.body, created_by: userId }; // Add created_by to the order data
//         const newOrder = await orderUsecase.create(orderData);
//         res.status(201).json(newOrder);
//     } catch (error) {
//         res.status(500).json({ message: 'Error creating order', error: error.message });
//     }
// };

// Handler to get a list of all orders
const getList = async (req, res) => {
    try {
        const orders = await orderUsecase.getList();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
};

// Handler to get one order by order_id
const getOneByOrderId = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await orderUsecase.getOneByOrderId(orderId);
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order', error: error.message });
    }
};


// Handler to update an order by order_id
const updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const updatedOrder = await orderUsecase.update(orderId, req.body);
        if (updatedOrder) {
            res.status(200).json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating order', error: error.message });
    }
};


const deleteOrder = async (req, res) => {
    try {
      const orderId = req.params.id;
      const result = await orderUsecase.remove(orderId);
      if (result.message) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: 'Order not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting order', error: error.message });
    }
  };


const getByCustomerName = async (req, res) => {
    try {
        const customerName = req.query.customer_name;
        if (!customerName) {
            return res.status(400).json({ message: 'Customer name query parameter is required' });
        }

        const orders = await orderUsecase.searchByCustomerName(customerName);
        if (orders.length > 0) {
            res.status(200).json(orders);
        } else {
            res.status(404).json({ message: 'No orders found for the specified customer name' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders by customer name', error: error.message });
    }
};

module.exports = {
    createOrder,
    getList,
    getOneByOrderId,
    updateOrder,
    deleteOrder,
    getByCustomerName
};
