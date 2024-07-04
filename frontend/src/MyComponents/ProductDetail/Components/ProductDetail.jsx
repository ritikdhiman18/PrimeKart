import { Rating } from '@smastrom/react-rating'
import { TbTruckDelivery } from "react-icons/tb";
import { MdVerified } from "react-icons/md";
import { BsFillShieldLockFill } from "react-icons/bs";
import { LuPackageCheck } from "react-icons/lu";
import '@smastrom/react-rating/style.css'
import { useAddCartItemMutation } from '@/Slices/atcSlice';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoginOpen } from '@/Slices/features';

const ProductDetailGrid = ({ product }) => {
    const dispatch = useDispatch();
    const [addToCart] = useAddCartItemMutation();
    const { userInfo } = useSelector((state) => state.auth);
    const handelATC = (e) => {
        if (userInfo) {
            const target = e.target;
            const container = target.closest(".product-content");
            const productId = container.querySelector(".product-id-value").innerText;
            if (productId) {
                const cartItem = { "cartProductId": productId }
                addToCart(cartItem);
                toast.success("Item Added to Cart.")
            } else {
                toast.error("Product not Available.")
            }
        } else {
            toast.error("LOGIN TO ADD IN CART.")
            dispatch(setIsLoginOpen(true));
        }
    }

    return (
        <>
            <div className="product-name text-3xl font-bold my-2">
                <h1>{product.name}</h1>
            </div>
            <div className="product-id">Item-Id: <span className='font-semibold product-id-value'>{product._id}</span></div>
            <div className="product-discription my-2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda quas nesciunt, est impedit placeat mollitia. Eos quibusdam fuga inventore perferendis deserunt ut, laborum non possimus sed id numquam porro illum.
            </div>
            <div className="product-rating flex gap-2 items-center">
                <Rating style={{ maxWidth: 150 }} value={product.ratings} readOnly />
                <span className='text-xl mt-1'>{product.ratings}</span>
            </div>
            <div className="product-price flex gap-2 items-center my-3">
                <div className="saleaprice text-2xl font-bold">₹{product.saleprice}</div>
                <div className="actualprice line-through">₹{product.actualprice}</div>
                <div className="offerpercent text-red-500 font-semibold">{product.offerpercent} <span>% OFF</span></div>
            </div>
            <div className="seller">Seller: <span className='font-semibold'>PRIMEKART</span></div>
            <div className="tags flex justify-evenly text-gray-600 mt-2">
                <div className='text-sm flex flex-col items-center'>
                    <span className='text-[2rem]'><TbTruckDelivery /></span>
                    <span>Express Delivery</span>
                </div>
                <div className='text-sm flex flex-col items-center'>
                    <span className='text-[2rem]'><MdVerified /></span>
                    <span>PrimeKart Verified</span>
                </div>
                <div className='text-sm flex flex-col items-center'>
                    <span className='text-[2rem]'><BsFillShieldLockFill /></span>
                    <span>Secure Checkout</span>
                </div>
                <div className='text-sm flex flex-col items-center'>
                    <span className='text-[2rem]'><LuPackageCheck /></span>
                    <span>15 Days Return</span>
                </div>
            </div>
            <div className="product-btns flex gap-4 my-3">
                <button className='product-atc-btn bg-black_100 text-white py-2 w-full rounded-sm' onClick={handelATC}>ADD TO CART</button>
                <button className='product-checkout-btn bg-black_100 text-white py-2 w-full rounded-sm'>BUY NOW</button>
            </div>
        </>
    )
}

export default ProductDetailGrid