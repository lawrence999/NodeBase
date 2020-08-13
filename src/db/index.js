import mongoose from 'mongoose';
let db = null;

export default {
    connect: async () => {
        console.log('DB Connecting ...');
        if (db) return db;
        mongoose.Promise = global.Promise;
        db = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB Connected ...');
        return db;
    },

    collection(...rest) {
        return db.collection(...rest);
    },

    get() {
        return db;
    },
};
