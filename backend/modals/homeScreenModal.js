import mongoose from "mongoose";

const bannerItemSchema = new mongoose.Schema({
    imgUrl_desktop: { type: String, required: true },
    imgUrl_mobile: { type: String, required: true },
    alt: { type: String, required: true }
}, { _id: false }); // _id: false to prevent MongoDB from creating an _id for each subdocument

const quickCategoryItemSchema = new mongoose.Schema({
    image: { type: String, required: true },
    href: { type: String, default: "" },
    alt: { type: String, required: true }
}, { _id: false }); // _id: false for the same reason

const productDetailSchema = new mongoose.Schema({
    _id: false, // Explicitly setting _id to false to prevent MongoDB from creating an _id for each subdocument
    name: { type: String, required: true },
    saleprice: { type: Number, required: true },
    actualprice: { type: Number, required: true },
    offerpercent: { type: Number, required: true },
    image: [{ public_id: String, url: String }],
    category: [{ type: String }],
    stock: { type: Number, required: true },
    noOfReviews: { type: Number, default: 0 },
    createdAt: { type: Date },
    reviews: [[mongoose.Schema.Types.Mixed]],
    ratings: { type: Number, default: 0 },
    href: { type: String, required: true }
});

const homeScreenSchema = new mongoose.Schema({
    BannerCarousel: [bannerItemSchema],
    QuickCategory: {
        title: { type: String, required: true },
        category_1: [quickCategoryItemSchema],
        category_2: [quickCategoryItemSchema]
    },
    ProductCarousel: {
        newArrivalProducts: [productDetailSchema]
    }
}, { timestamps: true });

const HomeScreen = mongoose.model("HomeScreen", homeScreenSchema);
export default HomeScreen;
