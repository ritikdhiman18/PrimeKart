import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
const HomeBannerCarousel = () => {
    const plugin = useRef(
        Autoplay({ delay: 3000 })
    )
    return (
        <>
            <div className="">
                <Carousel
                    opyions={{ loop: true }}
                    plugins={[plugin.current]}
                    className="text-white text-center"
                >
                    <CarouselContent className="">
                        <CarouselItem>
                            <div className="">
                                <img className="hidden md:block w-100"
                                    src="https://static.aceomni.cmsaceturtle.com/prod/webshop/Wrangler/EOSS-Website-Hero-Banner.jpg" alt="Slide 1" />
                                <img
                                    id="mobile_img" className="block md:hidden lg:hidden"
                                    src="https://static.aceomni.cmsaceturtle.com/prod/webshop/Wrangler/EOSS-Mobile-Hero-Banner.jpg" alt="Slide 1" />
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            <div className="">
                                <img className="hidden md:block lg:block w-100" src="https://static.aceomni.cmsaceturtle.com/prod/webshop/Wrangler/Website_Banners/Desktop/Desktop-1.jpg" alt="Slide 2" />
                                <img id="mobile_img" className="block md:hidden lg:hidden" src="https://static.aceomni.cmsaceturtle.com/prod/webshop/Wrangler/Mobile_Banners/Hero_Banner/Mobile_1.jpg" alt="Slide 2" />
                            </div>
                        </CarouselItem>
                        <CarouselItem className="">
                            <div className="">
                                <img className="hidden md:block lg:block w-100" src="https://static.aceomni.cmsaceturtle.com/prod/webshop/Wrangler/Website_Banners/Desktop/Desktop-4.jpg" alt="Slide 5" />
                                <img id="mobile_img" className="block md:hidden lg:hidden" src="https://static.aceomni.cmsaceturtle.com/prod/webshop/Wrangler/Mobile_Banners/Hero_Banner/Mobile_4.jpg" alt="Slide 5" />
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>
            </div>
        </>
    )
}

export default HomeBannerCarousel;   