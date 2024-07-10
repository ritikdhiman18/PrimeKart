import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/core';
const HomeBannerCarousel = ({ data }) => {
    return (
        <>
            <Splide className="text-white text-center" options={{
                type: 'loop',
                autoplay: true,
                perPage: 1,
                pagination: false,
                arrows: false,
                lazyLoad: "nearby",
                pauseOnHover: false
            }}>
                {data.map((banner, index) => (
                    <SplideSlide key={index}>
                        <div>
                            <img
                                className="hidden md:block w-100"
                                src={banner.imgUrl_desktop}
                                alt={banner.alt}
                            />
                            <img
                                id="mobile_img"
                                className="block md:hidden lg:hidden"
                                src={banner.imgUrl_mobile}
                                alt={banner.alt}
                            />
                        </div>
                    </SplideSlide>
                ))}
            </Splide>
        </>
    )
}

export default HomeBannerCarousel;   