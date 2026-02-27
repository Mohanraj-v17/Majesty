import mongoose from 'mongoose';
import User from './backend/model/userModel.js';
import connectDB from './backend/config/db.js';

const listUsers = async () => {
    try {
        await connectDB();
        const users = await User.find({}, 'email name');
        console.log('--- REGISTERED USERS ---');
        users.forEach(u => console.log(`- ${u.email} (${u.name})`));
        console.log('------------------------');
    } catch (error) {
        console.error('ERROR:', error);
    } finally {
        process.exit();
    }
};

listUsers();
