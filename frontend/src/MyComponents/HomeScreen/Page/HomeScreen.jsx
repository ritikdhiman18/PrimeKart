import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHomeData } from '../../../Slices/customHooks/homeScreenHook.js'
import HomeBannerCarousel from '../../Carousel/HomeBannerCarousel';
import ProductCarousel from '../../Carousel/ProductCarousel';
import Title from '../../Title/Title';
import GenderSectionHome from '../categorySection/genderSectionHome';
import { setLoading } from '../../../Slices/Reducers/features';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const { data: homeDataArray, isLoading } = useHomeData();
    const homeData = homeDataArray?.Data && homeDataArray?.Data.length > 0 ? homeDataArray.Data[0] : null;

    useEffect(() => {
        dispatch(setLoading(isLoading));
    }, [isLoading, dispatch]);

    return (
        <>
            <div className="hero-carousel">
                {homeData && (
                    <>
                        <HomeBannerCarousel data={homeData.BannerCarousel} />
                        <Title><h1>{homeData.QuickCategory.title}</h1></Title>
                        <GenderSectionHome data={homeData.QuickCategory} />
                        <Title><h1>NEW ARRIVALS</h1></Title>
                        <ProductCarousel data={homeData.ProductCarousel.newArrivalProducts} />
                    </>
                )}
            </div>
        </>
    );
}

export default HomeScreen;
