import React, { useState } from 'react';
import { RiShoppingCartFill, RiDeleteBinLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TbRosetteDiscountCheck } from "react-icons/tb";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { SkeletonCard } from "../Skeleton/SkeletonCard";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoginOpen } from "../../Slices/Reducers/features";
import { useGetCartItems, useUpdateCartMutation } from "../../Slices/customHooks/atcHooks";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import toast from 'react-hot-toast';

const Cart = () => {
    const dispatch = useDispatch();
    const [fetchCart, setFetchCart] = useState(false);
    const { userInfo } = useSelector((state) => state.auth);
    const { data, isLoading, error } = useGetCartItems(fetchCart);
    const { mutateAsync: UpdateCartMutation } = useUpdateCartMutation();

    const handleCart = () => {
        if (userInfo) {
            setFetchCart(true);
        } else {
            dispatch(setIsLoginOpen(true));
        }
    };
    const handelUpdate = async (id, action) => {
        debugger
        try {
            await UpdateCartMutation({ cartProductId: id, action: action });
            toast.success("Item Updated.")
        } catch (err) {
            toast.error("Error while sending action.", error);
        }
    }
    const checkoutHandler = () => {
        console.log("checkout");
    };

    return (
        <>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant='mobileNav' onClick={handleCart}>
                        <RiShoppingCartFill size={20} />
                    </Button>
                </SheetTrigger>

                <SheetContent className="flex flex-col gap-4 p-0" side={"right"} aria-describedby="alert-description">
                    <SheetHeader>
                        <div className="atc-topbar bg-[#f6f4ef] px-4 py-3 font-bold">
                            <h1>Your Cart</h1>
                        </div>
                    </SheetHeader>
                    {userInfo ? (
                        <>
                            <div className="nav p-4 h-80 overflow-y-auto">
                                <ul className='nav-links gap-4 flex flex-col w-full text-black'>
                                    {isLoading || data == undefined ? (
                                        <SkeletonCard />
                                    ) : error ? (
                                        <div>Error loading cart items</div>
                                    ) : data && data.items.length === 0 ? (
                                        <div className="flex flex-col items-center px-2">
                                            <img src="/emptycart.jpg" alt="Empty cart" className="w-24" />
                                            <SheetClose asChild>
                                                <Link to="/" className="font-bold underline text-black">
                                                    Continue Shopping.
                                                </Link>
                                            </SheetClose>
                                        </div>
                                    ) : (
                                        data.items.map((item) => (
                                            <li key={item._id} data-prod-id={item._id}>
                                                <Link className="flex flex-col md:flex-row lg:flex-row justify-between text-black" to="/">
                                                    <div className="products-detail flex gap-2">
                                                        <img src={item.image[0].url} alt={item.name} className="h-20" />
                                                        <div className="atc-product-content">
                                                            <h4 className="atc-product-name">
                                                                {item.name}
                                                            </h4>
                                                            <div className="flex mt-[10px] items-center">
                                                                <div className="h-[30px] flex border-2 text-center items-center">
                                                                    <span onClick={() => handelUpdate(item._id, 'decrement')} className="minicart-decrement-line-item w-[30px] cursor-pointer hover:text-green-600">-</span>
                                                                    <span className="w-[30px]">{item.quantity}</span>
                                                                    <span onClick={() => handelUpdate(item._id, 'increment')} className="minicart-increment-line-item w-[30px] cursor-pointer hover:text-green-600">+</span>
                                                                </div>
                                                                <div onClick={() => handelUpdate(item._id, 'remove')} className="text-custom-12 cursor-pointer hover:text-red-500 ml-5 minicart-remove-line-item"><RiDeleteBinLine /></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="atc-product-price">
                                                        ₹{item.saleprice}
                                                    </div>
                                                </Link>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>
                            {data && data.items.length === 0 ? null : (
                                <>
                                    <div className="atc-banner bg-[#f6f4ef] px-4 py-3 font-bold text-center">
                                        <h1>You qualify for Free Shipping*</h1>
                                    </div>
                                    <SheetFooter className="px-4">
                                        <Button type="submit" variant="ecom" onClick={checkoutHandler} className="w-full text-white">
                                            <SheetClose asChild>
                                                <Link to="/" className='flex gap-2 items-center'><span><TbRosetteDiscountCheck size={20} className='text-white' /></span>GO TO CHECKOUT</Link>
                                            </SheetClose>
                                        </Button>
                                    </SheetFooter>
                                </>
                            )}
                        </>
                    ) : (
                        <div className="flex flex-col items-center px-2">
                            <img src="/emptycart.jpg" alt="Empty cart" className="w-24" />
                            <SheetClose asChild>
                                <Button variant="ecom" className="text-center text-white font-bold w-full" onClick={() => dispatch(setIsLoginOpen(true))}>
                                    Login to view cart.
                                </Button>
                            </SheetClose>
                        </div>
                    )}
                    <VisuallyHidden id="alert-description">
                        <SheetTitle />
                        <SheetDescription />
                    </VisuallyHidden>
                </SheetContent>
            </Sheet>
        </>
    );
};

export default Cart;
