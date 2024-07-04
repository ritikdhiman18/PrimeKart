import { SkeletonCard } from '@/MyComponents/Skeleton/SkeletonCard';
import { useGetProductQuery, useUpdateReviewsQuery } from '@/Slices/productSlice';
import { useLocation } from 'react-router-dom';
import { Rating } from '@smastrom/react-rating'
import { Separator } from "@/components/ui/separator"
import { useAddReviewMutation } from "@/Slices/productSlice";
import toast from 'react-hot-toast';
import ProductDetailGrid from '../Components/ProductDetail';
import CustomerReview from '../Components/CustomerReview';
import { useState } from 'react';
const ProductDetailScreen = () => {
    const location = useLocation();
    const queryId = location.pathname.split("/")[2]
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [addReview, { isLoading: isAddingReview }] = useAddReviewMutation();
    const { data, isError, isLoading } = useGetProductQuery(queryId, {
        skip: !queryId,
    });
    const { data: reviewsData, refetch: refetchReviews } = useUpdateReviewsQuery(queryId, {
        skip: !queryId,
    });


    const handelchange = (e) => {
        setComment(e.target.value)
    }
    const handleAddReview = async (e) => {
        e.preventDefault();
        const productId = data.product._id;
        try {
            if (productId && comment && rating) {
                await addReview({ productId, comment, rating }).unwrap();
                toast.success("Review Added Successfully.", { autoClose: 800 });
                refetchReviews();
                setComment("")
                setRating("")
            } else {
                toast.error("Enter Comment and Ratings.", { autoClose: 800 });
            }
        } catch (err) {
            toast.error(err?.data?.message || err.message, { autoClose: 800 });
        }
    };
    return (
        <>
            <div className="product-detail-grid grid place-items-center my-4">
                {isLoading || data == undefined ? (
                    <SkeletonCard />
                ) : isError ? (
                    <div>Error loading products.</div>
                ) : data.success == false ? (
                    <div>No product available.</div>
                ) : data.product && (
                    <div className="flex flex-col md:flex-row lg:flex-row gap-2 lg:w-4/5 h-[35rem] items-center md:items-stretch lg:items-stretch">
                        <div className="product-image w-1/2 border-2 flex items-center bg-gray-200">
                            <img src={data.product.image[0].url} alt={data.product.name} className='w-full ' />
                        </div>
                        <div className="product-content w-full border-2 overflow-y-auto p-4">
                            {/*  */}
                            <ProductDetailGrid key={data.product._id} product={data.product} />
                            {/*  */}
                            <div className="product-Reviews-container border-2">
                                <h1 className='text-2xl font-bold px-2'>Customer Reviews</h1>
                                <Separator />
                                <div className="reviews">
                                    <form className="flex items-center py-1 mr-2" onSubmit={handleAddReview}>
                                        <Rating style={{ maxWidth: 150 }} value={rating} onChange={setRating} />
                                        <input type="search" placeholder='Write your review.' className="bg-white text-black_100 px-2 h-8 focus:outline-none w-full border-black border-b-2 ml-2" value={comment} onChange={handelchange} />
                                        <button className="font-bold text-lg border-black_100 border-1 px-2 h-8 bg-black_100 text-white" type="submit">Add</button>
                                    </form>
                                    <div className="all-reviews m-2 border-2 flex flex-col gap-2 p-2">
                                        {/*  */}
                                        {reviewsData === undefined ? (
                                            <SkeletonCard />
                                        ) : reviewsData.reviews && (
                                            <CustomerReview product={reviewsData.reviews} />
                                        )}
                                        {/*  */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default ProductDetailScreen