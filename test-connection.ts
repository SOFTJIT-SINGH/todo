import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGO_URI;
console.log('URI valid:', uri?.includes('mongodb') ? 'Yes' : 'No');

mongoose.connect(uri!)
  .then(() => { 
    console.log('✅ MongoDB connected successfully'); 
    process.exit(0); 
  })
  .catch(err => { 
    console.error('❌ MongoDB error:', err.message); 
    process.exit(1); 
  });