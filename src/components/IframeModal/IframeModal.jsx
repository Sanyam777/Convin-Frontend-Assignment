import React from 'react'
import ReactPlayer from 'react-player'
import './IframeModal.css'

const IframeModal = ({link, setShowIframe}) => {
    return (
        <div className='iframe-modal' onClick={() => setShowIframe(false)}>
            <div className="inner">
                <ReactPlayer
                    url={link}
                    playing={true}
                    width='560px'
                    height='315px'
                />
            <span  >Click anywher to close</span>
            </div>
        </div>
    )
}

export default IframeModal