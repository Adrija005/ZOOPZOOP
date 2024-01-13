const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://adrijaganguly1:Malibu24@cluster0.28kbb7e.mongodb.net/zoopmern?retryWrites=true&w=majority";

const connectToDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Fetch data after successful connection
    const fetchedData = await mongoose.connection.db.collection('food_items').find({}).toArray();
    const foodCategoryData = await mongoose.connection.db.collection('foodCategory').find({}).toArray();

    if (fetchedData && foodCategoryData) {
      console.log('Fetched food_items:', fetchedData);
      global.food_items = fetchedData;
      console.log('Global food_items:', global.food_items);

      console.log('Fetched foodCategory:', foodCategoryData);
      global.foodCategory = foodCategoryData;
      console.log('Global foodCategory:', global.foodCategory);
    } else {
      console.log('No data found.');
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectToDB;
