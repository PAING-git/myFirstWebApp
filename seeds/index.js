const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp');
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error:'));
db.once("open", () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // Your user ID
            author: '63a1d934396d01d6f2cd0816',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga voluptatum nobis laudantium illum eveniet blanditiis a earum cupiditate corrupti, explicabo voluptatem quo possimus repudiandae alias facere quos optio adipisci labore!',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dxni3y5ql/image/upload/v1673275328/YelpCamp/fi52iex8eddhgg8wwdw8.jpg',
                    filename: 'YelpCamp/fi52iex8eddhgg8wwdw8'
                },
                {
                    url: 'https://res.cloudinary.com/dxni3y5ql/image/upload/v1673275329/YelpCamp/nbm8djht3dbqn3jw0owm.jpg',
                    filename: 'YelpCamp/nbm8djht3dbqn3jw0owm'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})