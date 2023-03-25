import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getHistory } from '../../redux/actions'
import "./History.css"  
const History = () => {
    const { history, isHistoryLoading } = useSelector(state => state.bucketsReducer);
    const dispatch = useDispatch();
    const gethistory =() => dispatch(getHistory());
    useEffect(() => {
        gethistory();
    });  
    if (isHistoryLoading) {
        return (<div></div>)
    }
    else {
        return (
            <div className='history'>
                <div className="top">
                    <h1>History page</h1>
                    <Link to='/' className='goBackButton'>Go back to homepage</Link>
                </div>
                <div className="history-main-container">
                    {
                        history?.reverse()?.map((item, index) => {
                            return (
                                <div key={index} className='single-log'>
                                    <p>Title: {item?.title}</p>
                                    <p>Link : {item?.link}</p>
                                    <p>Last played on: {item?.time?.slice(0, 25)}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default History