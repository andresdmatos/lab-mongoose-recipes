const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create({
      title: 'Tacos',
      level: "Easy Peasy",
      ingredients: ['Ground Turkey','Cheese','Sour Cream'],
      cuisine: 'Mexican',
      dishType: 'main_course',
      duration: 60,
      creator: 'Andres',
})
  })
.then(() => {
  return Recipe.insertMany(data).then(res => console.log(res))
})

.then(() =>{
  return Recipe.findOneAndUpdate(
    {title: 'Rigatoni alla Genovese'},
    {duration: 100},
  )
} )
.then(() =>{
  return Recipe.deleteOne(
    {title: 'Carrot Cake'}
    )
} )

.then(()=> {
  mongoose.connection.close()
})

  .catch(error => {
    console.error('Error connecting to the database', error);
  });