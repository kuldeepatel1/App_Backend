require('dotenv').config();
const connectDB = require('./config/db');
const User = require('./models/User');
const Product = require('./models/Product');

connectDB();

const seed = async () => {
  await User.deleteMany();
  await Product.deleteMany();

  const user1 = await User.create({ name: 'John', email: 'john@test.com', password: '123456' });
  const user2 = await User.create({ name: 'Jane', email: 'jane@test.com', password: '123456' });

  await Product.create({ name: 'Laptop', price: 1200, description: 'Gaming Laptop', stock: 5, seller: user1._id });
  await Product.create({ name: 'Phone', price: 800, description: 'Smart Phone', stock: 10, seller: user2._id });

  console.log('Database seeded');
  process.exit();
};

seed();
