import mongoose from 'mongoose';

const dbConn = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
    } catch (err) {
        console.error(err.message);
    }
};

export default dbConn;