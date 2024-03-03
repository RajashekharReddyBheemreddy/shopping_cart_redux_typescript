import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CartItem {
    id: number;
    quantity: number;
}

export const counterSlice = createSlice({
  name: 'cart',
  initialState: [] as CartItem[],
  reducers: {
    getItemQuantity:(state, action: PayloadAction<number>) => {
        state.find(item => {
            return item.id === action.payload ? item.quantity : 0
        })
    },
    increaseCartQuantity: (state, action : PayloadAction<number>) => {
        const findItem = state.find(item => item.id === action.payload)?.quantity || 0
        if(findItem === 0 ){
            return [...state, {id: action.payload, quantity: 1}]
        }
        else if(findItem >= 1){
           return state.map(item => item.id === action.payload ? {...item, quantity: item.quantity + 1}: item)
        }
    },
    decreaseCartQuantity: (state, action : PayloadAction<number>) => {
        const findItem = state.find(item => item.id === action.payload)?.quantity || 0
        if(findItem === 1){
            return state.filter(item => item.id !== action.payload)
        }
        else if (findItem > 1){
           return state.map(item => item.id === action.payload ? {...item, quantity: item.quantity - 1}: item)
        }
    },
    removeFromcart: (state, action : PayloadAction<number>) => {
        return state.filter(element => element.id !== action.payload);
    },
  },
})

export const { removeFromcart, decreaseCartQuantity, increaseCartQuantity, getItemQuantity} = counterSlice.actions

export default counterSlice.reducer
