import products from "./data/products.js";
import users from "./data/users.js"
import Product from "./model/productModel.js";
import User from "./model/userModel.js";
import connectDB from "./config/db.js";



const importData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();

        
        const createdUsers = [];
        for (const user of users) {
            const createdUser = await User.create(user);
            createdUsers.push(createdUser);
        }

        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser }
        });

        await Product.insertMany(sampleProducts);

        console.log("Data Imported Successfully");
        process.exit();

    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();
        console.log("Data destroyed Successfully");
        process.exit();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}