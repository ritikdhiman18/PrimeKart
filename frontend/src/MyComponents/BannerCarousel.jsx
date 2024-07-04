import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
const BannerCarousel = () => {
    const plugin = useRef(
        Autoplay({ delay: 2000 })
    )
    return (
        <>
            <Carousel
                options={{ loop: true }}
                plugins={[plugin.current]}
                className="text-black_100 font-semibold text-center"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                    <CarouselItem className="text-sm"><h1>Buy 2 Get Extra 10% OFF</h1></CarouselItem>
                    <CarouselItem className="text-sm"><h1>Get Free delivery above 2000.</h1></CarouselItem>
                    <CarouselItem className="text-sm"><h1>Buy 4 Get Extra 20% OFF</h1></CarouselItem>
                </CarouselContent>
            </Carousel>
        </>
    )
}

export default BannerCarousel;   