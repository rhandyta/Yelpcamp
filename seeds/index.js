const mongoose = require("mongoose");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database Connect");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seeder = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "6370b8908531c43fd1fad961",
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            geometry: {
                type: "Point",
                coordinates: [106.936824, -6.685482],
            },
            images: [
                {
                    url: "https://res.cloudinary.com/doquzb39w/image/upload/v1668771886/YelpCamp/myhirs9omjrwujdzgjwh.jpg",
                    filename: "YelpCamp/myhirs9omjrwujdzgjwh",
                },
                {
                    url: "https://res.cloudinary.com/doquzb39w/image/upload/v1668771886/YelpCamp/jxtk74qcgim1jn3etxdl.png",
                    filename: "YelpCamp/jxtk74qcgim1jn3etxdl",
                },
            ],
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea soluta expedita veniam iste nemo! Cum!",
            price,
        });
        await camp.save();
    }
};

seeder().then(() => {
    mongoose.connection.close();
});
