import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { TbShoppingBagPlus } from "react-icons/tb";
import { FiHeart, FiCheck } from "react-icons/fi";
import toast from 'react-hot-toast';
import { TbGridScan } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoginOpen } from '../../Slices/Reducers/features';
import { useAddCartItemMutation } from '../../Slices/customHooks/atcHooks';


const ProductCard = ({ product }) => {
    const productRef = useRef(null);
    const dispatch = useDispatch();
    const { mutateAsync: addToCart } = useAddCartItemMutation();
    const { userInfo } = useSelector((state) => state.auth);
    const [itemAdded, setItemAdded] = useState(false);
    const handelATC = async () => {
        if (userInfo) {
            const productId = productRef.current.getAttribute("data-product-id");
            if (productId) {
                const cartItem = { "cartProductId": productId }
                await addToCart(cartItem);
                setItemAdded(true);
                setTimeout(() => setItemAdded(false), 1500);
                toast.success("Item Added to Cart.")
            } else {
                toast.error("Product not Available.")
            }
        } else {
            toast.error("LOGIN TO ADD IN CART.");
            dispatch(setIsLoginOpen(true));
        }
    }
    return (
        <div ref={productRef} key={product._id} data-product-id={product._id} className="Product-card bg-[#f3f3f3] rounded-md relative overflow-hidden border-black_100 border-b-2 flex flex-col flex-1">
            <Link to={product.href} className='flex flex-col flex-1 items-center'>
                <div className="Product-Image flex justify-center w-[200px]">
                    <img src={product.image[0].url} alt={product.name} />
                </div>
            </Link>
            <div className="Product-Content flex flex-col flex-1 bg-white text-black_100 font-bold p-1 lg:p-2 rounded-t-lg w-full ">
                <div className="Product-Tags flex justify-center gap-1 flex-wrap mb-2 items-center pl-2">
                    <TbGridScan />
                    {product.category.map((cat, index) => (
                        <span key={index} className='text-[8px] px-2 py-1 bg-[#f6f4ef] text-black rounded-lg'>
                            {cat}
                        </span>
                    ))}
                </div>
                <div className="product-title text-sm lg:text-md text-black_100 flex flex-col items-center flex-1 px-2">
                    {product.name}
                </div>
                <div className="Product-Price flex flex-col lg:flex-row gap-2 items-center justify-between mb-2 px-2">
                    <div className="price-Tag flex gap-1 lg:gap-2 items-center">
                        <span className='offer-Price text-sm lg:text-xl text-black_100'>₹{product.saleprice}</span>
                        {product.actualprice == 0 ? (<></>) : (
                            <>
                                <span className='standard-Price line-through text-xs lg:text-sm text-black_100'>₹{product.actualprice}</span>
                                <span className='offer-Percent text-red-600 text-xs lg:text-sm'>{product.offerpercent}% OFF</span>
                            </>
                        )}
                    </div>
                    {/* ATC */}
                    <button onClick={handelATC} className={`hidden lg:block ${itemAdded ? 'bg-green-600 font-extrabold' : 'bg-black_100 font-extrabold'} text-white text-md p-2 rounded-full`}>
                        {!itemAdded && <TbShoppingBagPlus />}
                        {itemAdded && <FiCheck className="animate-pulse" />}
                    </button>
                    <button onClick={handelATC} className={`flex lg:hidden ${itemAdded ? 'bg-green-600 font-extrabold' : 'bg-black_100 font-extrabold'} text-white text-md p-2 w-full items-center gap-2 justify-center rounded-sm font-semibold`}>
                        {!itemAdded && <><TbShoppingBagPlus /><span> Add to cart</span></>}
                        {itemAdded && <FiCheck className="animate-pulse" />}
                    </button>
                    {/* ATC */}
                </div>
            </div>
            <div className="product-favorite absolute top-2 right-2 p-2 rounded-full hover:bg-black_100 hover:text-white">
                <span className=''><FiHeart /></span>
            </div>
        </div >
    );
};

export default ProductCard;
