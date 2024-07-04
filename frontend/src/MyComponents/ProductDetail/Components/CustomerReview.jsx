import { FaStar } from "react-icons/fa";
import { Separator } from "@/components/ui/separator"

const CustomerReview = ({ product }) => {

    return (
        <>
            {product.map((review) => (
                <div key={review._id}>
                    <div className="flex" >
                        <div className="star-rating ">
                            <span className='flex items-center gap-1 px-1'>{review.rating}<span className='text-yellow-500'><FaStar /></span></span>
                        </div>
                        <div className="rating-content">
                            <p className='text-lg'>{review.comment}</p>
                            <span className='flex mt-2 gap-2'>
                                <span className='customer-name text-sm'>{review.name}</span>
                                <Separator orientation="vertical" />
                                <span className='date-of-publishing text-sm'>25 June 2024</span>
                            </span>
                        </div>
                    </div>
                    <Separator className="" />
                </div>
            ))}
        </>
    )
}

export default CustomerReview