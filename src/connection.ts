import mongoose, { ConnectOptions, mongo } from "mongoose";

// const uri = process.env.MONGODB_URI as string;
// mongoose.connect(uri)
//   .then(() => {
//     console.log('CONECTADO AO BANCO DE DADOS')
//   })
//   .catch((err) => {
//     console.error('ERRO AO CONECTAR AO BANCO DE DADOS' + err);
//   })

mongoose.connect("mongodb://localhost:27017").then(() => {
  console.log('✅ CONECTADO AO BANCO DE DADOS')
}).catch((err) => {
  console.error('⛔ Erro AO CONECTAR AO BANCO DE DADOS' + err)
})