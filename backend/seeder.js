import products from "./data/products.js";
import users from "./data/users.js"
import Product from "./model/productModel.js";
import User from "./model/userModel.js";
import connectDB from "./config/db.js";

<<<<<<< HEAD

=======
connectDB();
>>>>>>> 2690897070caa24578df2a71f09838ad35aa12ed

const importData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();

<<<<<<< HEAD
        
=======
        // Use a loop with create to trigger the pre-save hook for password hashing
>>>>>>> 2690897070caa24578df2a71f09838ad35aa12ed
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