import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    photo?: string; // Chemin d'accès à la photo (optionnel)
}

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    photo: { type: String }, // Chemin d'accès à la photo (optionnel)
});

export const Product = mongoose.model<IProduct>('Product', ProductSchema);