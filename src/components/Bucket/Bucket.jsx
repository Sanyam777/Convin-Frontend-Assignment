import React, { useState } from 'react'
import './Bucket.css'
import { TbDots } from 'react-icons/tb'
import { MdDoneOutline } from 'react-icons/md'
import {GiCancel} from 'react-icons/gi'
import Card from '../Card/Card'
import CardModal from '../CardModal/CardModal'
import { useDispatch } from 'react-redux'
import { addCard, deleteAllCards, deleteBucket, deleteCard, updateBucket } from '../../redux/actions'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify'


const Bucket = ({ item}) => {
    const dispatch = useDispatch();
    const deletebucket = () => {
        dispatch(deleteBucket(item?.id));
        deleted();
    }
    const deleted = () => toast.success("Bucket deleted!!")
    const updated = () => toast.success("Bucket Updated!!");
    const cardadded = () => toast.success("Card Added Successfully!!");
    const deleteall = () => toast.success("All Cards Deleted!!");
    const deleteone = () => toast.success("Card Deleted Successfully!!");
    const updatebucket = () => {
        dispatch(updateBucket(item?.id, name));
        updated();
    }
    const addcard = (data) => {
        dispatch(addCard(item?.id, data, item));
        cardadded();
    }
    const deleteallcards = () => {
        dispatch(deleteAllCards(item?.id));
        deleteall();
    }
    const deletecard = (name) => {
        dispatch(deleteCard(item?.id, name, item));
        deleteone();
    }
    const [name, setName] = useState();
    const [isEdit, setIsEdit] = useState(false);
    const [showModal, setShowModal] = React.useState(false)

    const [toggleDelete, setToggleDelete] = React.useState(false)


    return (
        <div className='bucket-container'>

            <div className="top" style={{ position: 'relative' }}>
                {isEdit === true ? (
                    <div style={{display:"flex", alignItems:"center"}}>
                        <input type="text" defaultValue={item?.name} onChange={(e) => setName(e.target.value)} />
                        <Button onClick={() => {
                            updatebucket();
                            setIsEdit(false);
                            setToggleDelete(false);
                        }} style={{ marginLeft: "8px", lineHeight: "2px" }} className='bg-success'><MdDoneOutline /></Button>
                        <Button onClick={() => {
                            setIsEdit(false);
                            setToggleDelete(false)
                        }} style={{ marginLeft: "8px", lineHeight: "2px" }} className='bg-danger'><GiCancel /></Button>
                    </div>
                ) : (
                    <>
                        <span>{item?.name}</span>
                        <TbDots style={{ cursor: 'pointer' }} onClick={() => setToggleDelete(prev => !prev)} />
                        {
                            toggleDelete
                            &&
                            <>
                                    <span onClick={() => { deletebucket(); setToggleDelete(false) }} className='toggle-icon'>Delete Bucket</span>
                                    <span onClick={() => setIsEdit(true)} className='toggle-icon' style={{ marginTop: "40px" }}>Update Bucket</span>
                                    <span onClick={() => {
                                        deleteallcards();
                                        setToggleDelete(false);
                                    }} className='toggle-icon' style={{ marginTop: "80px" }}>Delete all cards</span>
                            </>
                        }
                    </>)
                }
            </div>
            {/* cards components */}
            <div className="mid" >
                {
                    item?.cards?.map((card, index) => <Card
                        key={index}
                        card={card}
                        deleteCard={deletecard}
                        curBucket = {item}
                    />)
                }
            </div>

            {/* create cards button */}
            <div className="bottom">
                <button onClick={() => setShowModal(true)}>Add card</button>
            </div>
            {
                showModal
                &&
                <CardModal
                    setShowModal={setShowModal}
                    createCard={addcard}
                    bucketId={item?.id}
                />
            }
        </div>
    )
}

export default Bucket