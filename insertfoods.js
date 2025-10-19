// insertFoods.js
const mongoose = require('mongoose');
const Food = require('./models/Food');

const mongoURI = 'mongodb+srv://harini837847_db_user:Harini%402225@foodcluster.g4i4ujh.mongodb.net/foodAppDB?retryWrites=true&w=majority';

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB Connected successfully'))
    .catch(err => console.log('MongoDB connection error:', err));

const sampleFoods = [
    {
        name: "Chocolate Brownie",
        description: "Rich, fudgy chocolate brownie baked to perfection",
        price: 60,
        image: "/brownie.jpg"
    },
    {
        name: "Cheese Burger",
        description: "Juicy grilled burger with melted cheese and lettuce",
        price: 120,
        image: "/burger.jpg"
    },
    {
        name: "Spring Roll",
        description: "Crispy rolls stuffed with mixed vegetables",
        price: 80,
        image: "/springroll.jpg"
    },
    {
        name: "Gulab Jamun",
        description: "Soft and sweet syrup-soaked dumplings",
        price: 50,
        image: "/gulabjamun.jpg"
    }
];

const insertData = async () => {
    try {
        await Food.deleteMany(); // optional: clear old data
        await Food.insertMany(sampleFoods);
        console.log('✅ Food data inserted successfully!');
        mongoose.connection.close();
    } catch (err) {
        console.error('❌ Error inserting food data:', err);
        mongoose.connection.close();
    }
};

insertData();
