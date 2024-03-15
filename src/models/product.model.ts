import mongoose, { InferSchemaType } from 'mongoose'

export interface ProductDocument1 extends mongoose.Document {
  name: string
  purchasePrice: number
  lastSellingPrice: number
  createdAt: Date
  updatedAt: Date
}

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 4
    },
    purchasePrice: {
      type: Number,
      required: true,
    },
    lastSellingPrice: {
      type: Number
    },
  },
  { timestamps: true }
)
export type ProductDocument = InferSchemaType<typeof ProductSchema>

const Product = mongoose.model<ProductDocument>('Product', ProductSchema)
export default Product
