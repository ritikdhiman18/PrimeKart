import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/core';
const BannerCarousel = () => {
    return (
        <>
            <Splide options={{
                type: 'loop',
                autoplay: true,
                perPage: 1,
                pagination: false,
                arrows: false,
                lazyLoad: "nearby",
                pauseOnHover: false
            }}>
                <SplideSlide className="text-sm w-full text-center"><h1>Buy 2 Get Extra 10% OFF</h1></SplideSlide>
                <SplideSlide className="text-sm w-full text-center"><h1>Get Free delivery above 2000.</h1></SplideSlide>
                <SplideSlide className="text-sm w-full text-center"><h1>Buy 4 Get Extra 20% OFF</h1></SplideSlide>
            </Splide>
        </>
    )
}

export default BannerCarousel;   