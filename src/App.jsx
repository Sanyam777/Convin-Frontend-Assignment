import React from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import History from './pages/History/History'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Home /> }/>
                <Route path='/history' element={ <History /> }/>
            </Routes>
        </BrowserRouter>
    )
}

export default App