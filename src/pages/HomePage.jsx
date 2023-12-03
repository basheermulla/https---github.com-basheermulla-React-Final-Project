import { useEffect, useState } from 'react'
import { Box, Grid, Paper } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import PageTitleComp from '../components/PageTitle';
import SliderComp from '../components/Slider';
import { gridSpacing } from '../utils/constant';

function HomePageComp() {
    const products = useSelector((state => state.productReducer.products));
    const purchases = useSelector((state => state.purchaseReducer.purchases));
    const { userLogin } = useSelector((state) => state.userLoginReducer);

    const [newProducts, setNewProducts] = useState([]);
    const [topSellingProducts, setTopSellingProducts] = useState([]);
    const [detectRender, setDetectRender] = useState(true);

    const location = useLocation();

    useEffect(() => {
        // Group the Purchases based on their productID
        const groupByProductID = purchases.reduce((acc, current) => {
            acc[current.productID] = acc[current.productID] ? [...acc[current.productID], current] : [current];
            return acc
        }, {});

        const sortedProductsByNew = products.slice().sort((a, b) => b.published - a.published).slice(0, 2);
        setNewProducts(sortedProductsByNew);

        const sortedProductsByTopCelling = products.slice().sort((a, b) => groupByProductID[b.id]?.length - groupByProductID[a.id]?.length).slice(0, 2);
        setTopSellingProducts(sortedProductsByTopCelling);
        console.log(sortedProductsByTopCelling);
    }, [products]);

    useEffect(() => {
        if (location['pathname'] === '/') {
            setDetectRender(false);
        } else {
            setDetectRender(true);
        }
        console.log('Location changed', location);
    }, [location['pathname']]);

    return (
        <Box width={'100%'}>
            <Grid container component={Paper} elevation={6} sx={{ display: 'flex', justifyContent: "center", p: 2, pb: 5 }}>
                <Grid container spacing={gridSpacing} sx={{ display: 'flex', justifyContent: "center", p: 2 }}>
                    {
                        !detectRender && <>
                            <Grid item xs={12}>
                                <PageTitleComp titleName={'New Products'} />
                            </Grid>
                            <Grid item xs={12} sx={{ mb: 10 }}>
                                <SliderComp productsToSlide={newProducts} sourcePage={'home'} />
                            </Grid>
                            <Grid item xs={12}>
                                <PageTitleComp titleName={'Top Selling'} />
                            </Grid>

                            <Grid item xs={12}>
                                <SliderComp productsToSlide={topSellingProducts} sourcePage={'home'} />
                            </Grid>
                        </>
                    }

                    {
                        detectRender && 
                        <Grid item xs={12} sx={{ height: '100vh' }}>
                            {userLogin.role === 'admin' && <Outlet />}
                        </Grid>
                    }
                </Grid>
            </Grid>
        </Box>
    )
}

export default HomePageComp