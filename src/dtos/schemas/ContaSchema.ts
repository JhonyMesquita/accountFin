import mongoose, { Schema } from "mongoose";

type Conta = {
  conta: number,
  saldo: number
};

const ContaSchema = new Schema({
  conta: Number,
  saldo: Number
});

export default mongoose.model<Conta>("Conta", ContaSchema);