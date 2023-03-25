import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
export const GET_BUCKETS = 'GET_BUCKETS'
export const ADD_BUCKET = 'ADD_BUCKET'
export const UPDATE_BUCKET = 'UPDATE_BUCKET'
export const DELETE_BUCKET = 'DELETE_BUCKET'
export const ADD_CARD = 'ADD_CARD'
export const UPDATE_CARD = 'UPDATE_CARD'
export const DELETE_CARD = 'DELETE_CARD'
export const DELETE_ALL_CARDS = 'DELETE_ALL_CARDS'
export const GET_HISTORY = 'GET_HISTORY'
export const ADD_HISTORY = 'ADD_HISTORY'

const bucketsCollectionRef = collection(db, "Buckets");
export const getBuckets = () => {
    return async dispatch => {
        const res = await getDocs(query(bucketsCollectionRef, orderBy("createdAt")));
        var data = [];
        res.docs.map((doc) => data = [...data, doc.data()])
        if (data) {
            dispatch({
                type: GET_BUCKETS,
                payload: data,
            });
        }
        else {
            console.log("Unable to fetch");
        }
    }
}

export const addBuckets = (data, notify) => {
    return async dispatch => {
        const newBucketRef = doc(bucketsCollectionRef);
        data["id"] = newBucketRef;
        data["createdAt"] = new Date().toString().slice(0, 25);
        const res = await setDoc(newBucketRef, data)
        if (res) {
            notify();
            dispatch({
                type: ADD_BUCKET,
                payload: data,
            })
        }
    }
}
export const deleteBucket = (id) => {
    return async dispatch => {
        const res = await deleteDoc(id)
        if (res) {
            dispatch({
                type: DELETE_BUCKET,
                payload: id,
            })
        }
    }
}

export const updateBucket = (id, name) => {
    return async dispatch => {
        const res = await updateDoc(id, {
            name: name,
        })
        if (res) {
            dispatch({
                type: UPDATE_BUCKET,
                payload: [id, name]
            })
        }
    }
}

export const addCard = (bucketId, data, item) => {
    return async dispatch => {
        item?.cards.push(data);
        const res = await updateDoc(bucketId, { cards: item?.cards })
        if (res) {
            dispatch({
                type: ADD_CARD,
                payload: { item, bucketId },
            })
        }
    }
}

export const deleteAllCards = (id) => {
    return async dispatch => {
        const res = await updateDoc(id, { cards: [] })
        if (res) {
            dispatch({
                type: DELETE_ALL_CARDS,
                payload: id,
            })
        }
    }
}

export const deleteCard = (bid, name, item) => {
    return async dispatch => {
        const idx = item?.cards.findIndex(item => item?.title === name);
        console.log(idx)
        if (item?.cards.length === 1) {
            item.cards = [];
        }
        else {
            item.cards.splice(idx, 1);
        }
        const res = await updateDoc(bid, { cards: item?.cards });
        if (res) {
            dispatch({
                type: DELETE_CARD,
                payload: { bid, item }
            })
        }
    }
}

export const updateCard = (title, link, item, cardTitle) => {
    return async dispatch => {
        const idx = item.cards.findIndex(card => card.title === cardTitle)
        item.cards[idx] = { title: title, link: link };
        const id = item.id
        const res = await updateDoc(item.id, { cards: item.cards })
        if (res)
            dispatch({
                type: UPDATE_CARD,
                payload: [id, item]
            })
    }
}

const historyCollectionRef = collection(db, "History");
export const addHistory = (newLog) => {
    return async dispatch => {
        const res = await addDoc(historyCollectionRef, newLog)
        if (res) {
            dispatch({
                type: ADD_HISTORY,
                payload: newLog,
            })
        }
    }
}

export const getHistory = () => {
    return async dispatch => {
        const res = await getDocs(query(historyCollectionRef, orderBy("time")));
        var data = [];
        res.docs.map((item) => data = [...data, item.data()]);
        if (data) {
            dispatch({
                type: GET_HISTORY,
                payload: data,
            })
        }
    }
}