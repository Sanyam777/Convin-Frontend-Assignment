import React, { useEffect } from 'react'
import "./Home.css"
import { NavLink } from 'react-router-dom'
import Bucket from '../../components/Bucket/Bucket'
import CreateButton from '../../components/CreateButton/CreateButton'
import { useDispatch, useSelector } from 'react-redux'
import { getBuckets } from '../../redux/actions'
import { Backdrop, CircularProgress } from '@mui/material'

const Home = () => {
    const { buckets, isLoading } = useSelector(state => state.bucketsReducer);
    const dispatch = useDispatch();
    const getbuckets = () => dispatch(getBuckets());
    useEffect(() => {
        getbuckets();
    });
    if (isLoading) {
        return (
            <Backdrop
                sx={{ color: 'blue', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <CircularProgress color='inherit' />
            </Backdrop>
        )
    }
    else {
        return (
            <div className="main-outer-container">
                <div className="top">
                    <h1>Create your own video playlist</h1>
                    <NavLink to="/history" className="histore">History</NavLink>
                </div>
                <div className="main-inner-container">
                    {
                        buckets.map((item, index) => <Bucket
                            key={index}
                            item={item}
                        />)
                    }
                    <CreateButton />
                </div>
            </div>
        )
    }
}

export default Home