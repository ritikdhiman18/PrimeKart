import Title from '@/MyComponents/Title'
import { FiFilter } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { useDispatch, useSelector } from 'react-redux';
import { useGetProductsByQueryQuery } from '@/Slices/productSlice';
import { setFilters } from '../../Slices/features';
import { useEffect, useState } from 'react';
import { SkeletonCard } from '@/MyComponents/Skeleton/SkeletonCard';
import ProductCard from '../ProductCard/productCard';

const ProductListingScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const filters = useSelector((state) => state.search.filters);
    const searchQuery = useSelector((state) => state.search.searchQuery);
    const [isFetching, setIsFetching] = useState(false);
    const queryObject = {
        search: searchQuery,
        ...filters,
    };
    const { data, isError, isLoading } = useGetProductsByQueryQuery(queryObject, {
        skip: !searchQuery || !isFetching,
    });

    useEffect(() => {
        const fetchWithDelay = setTimeout(() => {
            setIsFetching(true);
        }, 0);
        return () => clearTimeout(fetchWithDelay);
    }, [searchQuery]);


    const handleNext = () => {
        const updatedFilters = {
            ...filters,
            page: filters.page + 1,
        };
        dispatch(setFilters(updatedFilters));
        const url = `/products?search=${searchQuery}&page=${updatedFilters.page}`;
        navigate(url);
    };

    const handlePrevious = () => {
        const updatedFilters = {
            ...filters,
            page: filters.page - 1,
        };
        if (updatedFilters.page >= 1) {
            dispatch(setFilters(updatedFilters));

            const url = `/products?search=${searchQuery}&page=${updatedFilters.page}`;
            navigate(url);
        }
    };

    return (
        <>
            <Title>
                SEARCH RESULTS
            </Title>
            <div className="search-Listing flex w-full gap-2 px-2">
                {/* /////////////////facet-grid/////////////////////////// */}
                <div className="hidden lg:block facet-container w-96 border-2">
                    <div className='flex my-2 items-center justify-center font-bold text-xl gap-1'>
                        <span><FiFilter /></span>
                        <span>Filters</span>
                    </div>
                    <div className="facets p-2">
                        <Accordion type="single" collapsible>
                            <AccordionItem value="facet-1">
                                <AccordionTrigger className="font-bold text-lg p-2">COLOR</AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-3 px-4">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="color-black" />
                                        <label
                                            htmlFor="color-black"
                                            className="text-lg font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Black
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="color-white" />
                                        <label
                                            htmlFor="color-white"
                                            className="text-lg font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            WHITE
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="color-green" />
                                        <label
                                            htmlFor="color-green"
                                            className="text-lg font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            GREEN
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="color-blue" />
                                        <label
                                            htmlFor="color-blue"
                                            className="text-lg font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            BLUE
                                        </label>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <div className="facet-2">
                            <span className='font-bold px-2'>GENDER</span>
                            <div className="flex items-center space-x-2 px-4 py-2">
                                <Checkbox id="gender-men" />
                                <label
                                    htmlFor="gender-men"
                                    className="text-lg font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    MEN
                                </label>
                            </div>
                            <div className="flex items-center space-x-2 px-4 py-2">
                                <Checkbox id="gender-women" />
                                <label
                                    htmlFor="gender-women"
                                    className="text-lg font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    WOMEN
                                </label>
                            </div>
                        </div>
                        <div className="facet-3">
                            <span className='font-bold px-2'>PRICE</span>
                            <div className="slider py-2 px-4">
                                <Slider defaultValue={[0]} min={0} max={500} step={10} />
                            </div>
                        </div>
                    </div>
                </div>
                {/* /////////////////search-grid/////////////////////////// */}
                <div className=" w-full ">
                    <div className="search-results border-2">
                        <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2 gap-2 lg:gap-4 min-h-44">
                            {isLoading || data == undefined ? (
                                [...Array(4)].map((_, index) => <SkeletonCard key={index} />)
                            ) : isError ? (
                                <div>Error loading products.</div>
                            ) : data.success == false ? (
                                <div>No products available.</div>
                            ) : (data.products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))
                            )}
                        </ul>
                    </div>
                    <div className="pagination flex justify-center gap-10 mt-2 py-2 border-2">
                        <button className='bg-black_100 px-4 py-2 text-white rounded-md' onClick={handlePrevious}>Previous</button>
                        <button className='bg-black_100 px-10 py-2 text-white rounded-md' onClick={handleNext}>Next</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductListingScreen