import React, { useState } from 'react'
import IframeModal from '../IframeModal/IframeModal'
import { MdOutlineDelete, MdModeEditOutline } from 'react-icons/md'
import './Card.css'
import { useDispatch} from 'react-redux'
import { addHistory, updateCard } from '../../redux/actions'
import { toast } from 'react-toastify'


const Card = ({ card, deleteCard, curBucket }) => {
    const [showIframe, setShowIframe] = React.useState(false)
    const [editCard, setEditCard] = React.useState(false)
    const [title, setTitle] = useState(card?.title);
    const [link, setLink] = useState(card?.link);
    const dispatch = useDispatch();
    const updated = () => toast.success("Card Updated Successfully!!");
    const updatecard = () => {
        dispatch(updateCard(title, link, curBucket, card?.title));
        updated();
    }
    const addhistory = () => { dispatch(addHistory({ title: card.title, link: card.link, time: new Date().toString().slice(0, 25) })) }
    if (!editCard) {
        return (
            <div id={card?.id} className='card'>
                <div className="top">
                    <span>{card?.title}</span>
                    <MdModeEditOutline
                        onClick={() => setEditCard(true)}
                    />
                    <MdOutlineDelete
                        onClick={() => deleteCard(card?.title)}
                    />
                </div>
                <div className="bottom">
                    <span onClick={() => {
                        addhistory();
                        setShowIframe(true);
                    }}>Link: {card?.link}</span>
                </div>
                {
                    showIframe && <IframeModal link={card?.link} setShowIframe={setShowIframe} />
                }
            </div>
        )
    } else {
        return (
            <div id={card?.id} className='card'>
                <div className="top">
                    <input
                        type="text"
                        defaultValue={card?.title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="bottom">
                    <input
                        type="text"
                        defaultValue={card?.link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                </div>
                <div className="card-btn">
                    <button onClick={() => {
                        updatecard();
                        setEditCard(false);
                    }}>update</button>
                    <button onClick={() => setEditCard(false)} >cancel</button>
                </div>
            </div>
        )
    }
}

export default Card