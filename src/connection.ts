import mongoose from "mongoose";
import dotenv from "dotenv";
 
dotenv.config();
 
const uri = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}` as string;
 
console.log(uri)
 
mongoose.connect(uri)
  .then(() => {
    console.log('✅ CONECTADO AO BANCO DE DADOS ✅')
  }).catch((err) => {
    console.error('⛔ Erro AO CONECTAR AO BANCO DE DADOS' + err)
  })