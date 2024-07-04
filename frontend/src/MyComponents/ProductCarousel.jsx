import { TbShoppingBagPlus } from "react-icons/tb";
import { FiHeart } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { useGetAllproductsQuery } from '@/Slices/productSlice'
import toast from "react-hot-toast";
const ProductCarousel = () => {
    const { data, error, isLoading } = useGetAllproductsQuery();
    if (error) {
        toast.error(error.toString());
    }
    return (
        <>
            <div className="embla" ref={emblaRef}>
                <div className="embla__container grid place-items-center gap-4">
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div>Error loading products.</div>
                    ) : !data || !data.products || data.products.length === 0 ? (
                        <div>No products available.</div>
                    ) : (
                        data.products.map((product) => (
                            <div key={product._id} data-product-id={product._id} className="embla__slide w-[200px] Product-card bg-gray-200 rounded-md relative overflow-hidden border-black border-b-2 flex flex-col flex-1">
                                <Link className='flex flex-col flex-1' to={product.href}>
                                    <div className="Product-Image flex justify-center">
                                        <img src={product.image[0].url} alt={product.name} />
                                    </div>
                                    <div className="Product-Content flex flex-col flex-1 bg-white text-black_100 font-bold p-1 lg:p-2 rounded-t-lg w-full ">
                                        <div className="Product-Tags flex gap-1 flex-wrap mb-2">
                                            {product.category.map((cat, index) => (
                                                <span key={index} className='text-[8px] px-2 py-1 bg-gray-400 rounded-lg'>
                                                    {cat}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="product-title text-sm lg:text-md text-black_100 flex flex-col flex-1">
                                            {product.name}
                                        </div>
                                        <div className="Product-Price flex flex-col lg:flex-row gap-2 items-center justify-between mb-2">
                                            <div className="price-Tag flex gap-1 lg:gap-2 items-center">
                                                <span className='offer-Price text-sm lg:text-xl text-black_100'>₹{product.saleprice}</span>
                                                <span className='standard-Price line-through text-xs lg:text-sm text-black_100'>₹{product.actualprice}</span>
                                                <span className='offer-Percent text-red-600 text-xs lg:text-sm'>20% OFF</span>
                                            </div>
                                            <button className='hidden lg:block bg-black text-white text-md p-2 rounded-full font-semibold'>
                                                <TbShoppingBagPlus />
                                            </button>
                                            <button className='flex lg:hidden bg-black text-white text-md p-2 w-full items-center gap-2 justify-center rounded-sm font-semibold'>
                                                <TbShoppingBagPlus /> <span>Add to cart</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="product-favorite absolute top-2 right-2 p-2 rounded-full hover:bg-black hover:text-black_100">
                                        <span className=''><FiHeart /></span>
                                    </div>
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    )
}

export default ProductCarousel;