import {
    LOAD_PURCHASES,
    ADD_PURCHASE,
    DELETE_PURCHASE
} from '../constants/purchaseConstants';

export const loadAllPurchase = (purchases) => (dispatch) => {
    dispatch({ type: LOAD_PURCHASES, payload: purchases });
}

export const AddPurchase = (purchase) => (dispatch) => {
    dispatch({ type: ADD_PURCHASE, payload: purchase });
}

export const deletePurchase = (arr_purchaseID) => (dispatch) => {
    dispatch({ type: DELETE_PURCHASE, payload: arr_purchaseID });
}