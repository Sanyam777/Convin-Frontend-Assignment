import { ADD_BUCKET, ADD_CARD, ADD_HISTORY, DELETE_ALL_CARDS, DELETE_BUCKET, DELETE_CARD, GET_BUCKETS, GET_HISTORY, UPDATE_BUCKET, UPDATE_CARD } from "./actions";

const initialState = {
    buckets: [],
    history: [],
    isLoading: true,
    isHistoryLoading : true,
}

function bucketsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_BUCKETS:
            return { ...state, buckets: action.payload, isLoading: false };
        case ADD_BUCKET:
            return { ...state, buckets: [...state.buckets, action.payload] };
        case UPDATE_BUCKET:
            const idx = state.buckets.findIndex(item => item?.id === action.payload[0])
            state.buckets[idx].name = action.payload[1]
            return { ...state, buckets: state.buckets };
        case DELETE_BUCKET:
            return { ...state, buckets: state.buckets.filter(item => item?.id !== action.payload) };
        case ADD_CARD:
            const idxx = state.buckets.findIndex(item => item?.id === action.payload.bucketId);
            state.buckets[idxx] = action.payload.item;
            return { ...state, buckets: state.buckets };
        case UPDATE_CARD:
            const i = state.buckets.findIndex(item => item?.id === action.payload[0]);
            state.buckets[i].cards = action?.payload[1].cards
            return { ...state };
        case DELETE_CARD:
            const ind = state.buckets.findIndex(item => item.id === action.payload.bid);
            if (action.payload.item.cards.length === 0) {
                state.buckets[ind].cards = [];
            }
            else {
                state.buckets[ind].cards = action.payload.item.cards;
            }
            return { ...state };
        case DELETE_ALL_CARDS:
            const id = state.buckets.findIndex(item => item?.id === action.payload);
            state.buckets[id].cards = [];
            return { ...state, buckets: state.buckets };
        case ADD_HISTORY:
            return { ...state, history: [...state.history, action.payload] };
        case GET_HISTORY:
            return { ...state, history: action.payload, isHistoryLoading:false };
        default:
            return state;
    }
}
export default bucketsReducer;