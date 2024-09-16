const orderRepository = require('../repository/orderRepository');
const { v4: uuidv4 } = require('uuid');

// Function to create a new order
const create = async (orderData) => {
  try {
    const orderId = uuidv4();
    let items = [];
    let total_price = 0;

    if (!orderData.order_items || orderData.order_items.length === 0) {
      throw new Error('Order items are required');
    }

    orderData.order_items = orderData.order_items.map(item => {
      item.item_id = uuidv4();
      let itemPrice = item.item_price * item.item_quantity;
      items.push(item);
      total_price += itemPrice;
      return item; // Make sure to return the item after modification
    });

    orderData.customer.customer_id = uuidv4();

    const order = {
      order_id: orderId,
      order_name: orderData.order_name,
      total_price: total_price,
      status: orderData.status,
      order_items: items,
      customer: orderData.customer,
      created_by: orderData.created_by,
    };

    const createdOrder = await orderRepository.create(order);
    return createdOrder;
  } catch (error) {
    throw new Error('Failed to create order: ' + error.message);
  }
};

// const create = async (orderData) => {
//     try {
//       const orderId = uuidv4();
//       let items = [];
//       let total_price = 0;
  
//       if (!orderData.order_items || orderData.order_items.length === 0) {
//         throw new Error('Order items are required');
//       }
  
//       orderData.order_items = orderData.order_items.map(item => {
//         item.item_id = uuidv4();
//         let itemPrice = item.item_price * item.item_quantity;
//         items.push(item);
//         total_price += itemPrice;
//         return item; // Make sure to return the item after modification
//       });
  
//       orderData.customer.customer_id = uuidv4();
  
//       const order = {
//         order_id: orderId,
//         order_name: orderData.order_name,
//         total_price: total_price,
//         status: orderData.status,
//         order_items: items,
//         customer: orderData.customer,
//         created_by: orderData.created_by, // This is now filled from the handler
//       };
  
//       const createdOrder = await orderRepository.create(order);
//       return createdOrder;
//     } catch (error) {
//       throw new Error('Failed to create order: ' + error.message);
//     }
//   };

// Function to get all orders
const getList = async () => {
  try {
    return await orderRepository.getAll();
  } catch (error) {
    throw new Error('Failed to get orders: ' + error.message);
  }
};

// Function to get an order by order_id
const getOneByOrderId = async (orderId) => {
  try {
    const order = await orderRepository.getById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  } catch (error) {
    throw new Error('Failed to get order: ' + error.message);
  }
};

// Function to update an existing order
const update = async (orderId, updateData) => {
  try {
    let updatedOrder = await orderRepository.update(orderId, updateData);
    if (!updatedOrder) {
      throw new Error('Order not found');
    }
    return updatedOrder;
  } catch (error) {
    throw new Error('Failed to update order: ' + error.message);
  }
};

const remove = async (orderId) => {
    try {
      const result = await orderRepository.remove(orderId);
      if (result.deletedCount === 0) {
        throw new Error('Order not found');
      }
      return { message: 'Order deleted successfully' };
    } catch (error) {
      throw new Error('Failed to delete order: ' + error.message);
    }
  };

const searchByCustomerName = async (customerName) => {
    try {
        return await orderRepository.findByCustomerName(customerName);
    } catch (error) {
        throw new Error('Failed to search orders by customer name: ' + error.message);
    }
};

module.exports = { create, getList, getOneByOrderId, update, remove, searchByCustomerName };
