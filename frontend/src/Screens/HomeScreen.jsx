import Title from '@/MyComponents/Title'
import HomeBannerCarousel from '../MyComponents/HomeBannerCarousel'
import GenderSectionHome from '@/Sections/genderSectionHome'

const HomeScreen = () => {
    return (
        <>
            <div className="hero-carousel">
                <HomeBannerCarousel />
                <Title>
                    <h1>OUR FAVOURITE FITS</h1>
                </Title>
                <GenderSectionHome />
                <Title>
                    <h1>NEW ARRIVALS</h1>
                </Title>
            </div>
        </>
    )
}

export default HomeScreen;