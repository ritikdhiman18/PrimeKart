import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter Product name."],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please enter Product description."]
    },
    price: {
        type: Number,
        required: [true, "Please enter price of Procuct."],
        maxLength: [8, "Price cannot be greater than 8 characters."]
    },
    ratings: {
        type: Number,
        default: 0
    },
    image: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: [
        {
            type: String,
            required: [true, "Please enter category."]
        }
    ],
    stock: {
        type: Number,
        maxLength: [4, "Stock cannot exceed 4 characters."],
        required: [true, "Please enter product stock."],
        default: 1
    },
    noOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});
const Product = mongoose.model('Product', productSchema);
export default Product;