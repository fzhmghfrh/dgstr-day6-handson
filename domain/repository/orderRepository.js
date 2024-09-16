const Order = require('../model/orderModel');

async function create(order) {
  try {
    const newOrder = new Order(order);
    const savedOrder = await newOrder.save();
    return savedOrder;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

async function getById(orderId) {
  try {
    const order = await Order.findOne({ order_id: orderId });
    return order;
  } catch (error) {
    console.error('Error getting order by order_id:', error);
    throw error;
  }
}

async function getAll() {
  try {
    const orders = await Order.find();
    return orders;
  } catch (error) {
    console.error('Error finding orders:', error);
    throw error;
  }
}

async function update(orderId, orderData) {
  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { order_id: orderId },
      orderData,
      { new: true }
    );
    return updatedOrder;
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
}


async function remove(orderId) {
    try {
      const result = await Order.deleteOne({ order_id: orderId });
      return result;
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  }

async function findByCustomerName(customerName) {
    try {
        const orders = await Order.find({
            'customer.customer_name': new RegExp(customerName, 'i')
        });
        return orders;
    } catch (error) {
        console.error('Error finding orders by customer name:', error);
        throw error;
    }
}


module.exports = { create, getById, getAll, update, remove, findByCustomerName };
