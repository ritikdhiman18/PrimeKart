import ProductCard from "../ProductCard/productCard";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
const ProductCarousel = ({ data }) => {
    return (
        <>
            <Splide className="grid gap-4" options={{
                perPage: 5,
                pagination: false,
                pauseOnHover: false,
                gap: "1rem",
                breakpoints: {
                    1024: {
                        perPage: 4,
                        gap: "1rem"
                    },
                    640: {
                        perPage: 3,
                        gap: "1rem"
                    },
                    480: {
                        perPage: 1
                    },
                },
            }}>
                {data.map((product) => (
                    <SplideSlide key={product._id} className='grid'>
                        <ProductCard product={product} />
                    </SplideSlide>
                ))}
            </Splide>

        </>
    )
}

export default ProductCarousel;