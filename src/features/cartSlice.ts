import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from '../features/store/store'

interface CartItem {
    id: number;
    quantity: number;
}
// Define the initial state using that type
const initialState = {
    id : 0,
    quantity : 1,
}

export const counterSlice = createSlice({
  name: 'cart',
  // `createSlice` will infer the state type from the `initialState` argument
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

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.cart

export default counterSlice.reducer