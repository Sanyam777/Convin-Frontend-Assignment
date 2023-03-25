import React, { useState } from 'react'
import './CardModal.css'
import {MdClose} from 'react-icons/md'

const CardModal = ({ setShowModal, createCard, bucketId }) => {
	const [title, setTitle] = useState();
	const [link, setLink] = useState();
	const [errorMsg, setErrorMsg] = React.useState(false)

	const handleCardInfoSubmit = (e) => {
		e.preventDefault()
		if(title !== '' && link !== '') {
			const newCardInfo = {title: title, link: link}
			createCard(newCardInfo)
			setShowModal(false)
		} else {
			setErrorMsg(true)
            setTimeout(() => {
                setErrorMsg(false)
            }, 2000); 
		}
	}

    return (
		<div className="card-modal-outer">
			<div className='card-modal-inner'>
				<form onSubmit={handleCardInfoSubmit}>
					<label htmlFor="cardTitle">title</label>
					<input 
						type="text" 
						id="cardTitle"
						autoFocus
						autoComplete='off'
						defaultValue={title}
						placeholder='Enter title of video'
						onChange={(e) => setTitle(e.target.value)}
						/>
					<label htmlFor="link">link</label>
					<input 
						type="text"
						id='link'
						autoComplete='off'
						defaultValue={link}
						placeholder='Enter a video link'
						onChange={(e) => setLink(e.target.value)}
						/>
				</form>
					{
						errorMsg && <span className='error-msg'>input fields cannot be empty</span>
					}
				<button onClick={handleCardInfoSubmit}>Add</button>
					<MdClose onClick={() => setShowModal(false)}/>
			</div>
		</div>
    )
}

export default CardModal