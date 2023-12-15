import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

const url = 'https://course-api.com/react-useReducer-cart-project';

export const getCartItems = createAsyncThunk(//import this functon in the App.js
  'cart/getCartItems',
  ()=>{
    return fetch(url)
    .then((response)=>response.json())
    .catch((err)=>console.log(err))
  }
);
//more of this in README
/*
export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (name, thunkAPI) => {
    try {
      // console.log(name);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());
      const resp = await axios(url);

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

*/



const initialState = {
  cartItems: cartItems,
  amount: 1, // no of items
  total: 0, // final money
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      // instead of state.cartItems=[] ,if we had used return {state.cartItems=[]} then the other properties amount, total, isLoading will be omitted . from there on these properties will not exist.so either include all inside return or just change what is needed.
    },
    removeItem: (state, action) => {
      //   console.log("state and item are",state, action);
      // console.log("action is:",action )// we have id as payload so, action.payload will give id that we passed.
      const itemId = action.payload;
      // console.log("the id of the item clicked is",itemId)
      state.cartItems = state.cartItems.filter((item) => {
        if (item.id !== itemId) {
          return true;
        }
      });
    },
    increase: (state, action) => {
      const itemId = action.payload;
      const cartItem = state.cartItems.find((item) => item.id === itemId);
      cartItem.amount += 1; // this amount is not the entire state amount, but the product only amount
    },
    decrease: (state, action) => {
        const itemId = action.payload;
        const cartItem = state.cartItems.find((item) => item.id === itemId);
        if(! cartItem.amount < 1){
        cartItem.amount -= 1; // this amount is not the entire state amount, but that specific product's only amount
        }
      },
      calculateTotals:(state)=>{
        let amount=0;
        let total =0;
        state.cartItems.forEach((item)=>{
            amount= amount+item.amount;
            total = total + item.price* item.amount;
        })
        state.amount=amount;
        state.total=total;
      }
      
  },
  /// from this to ....
  // extraReducers:{
  //   [getCartItems.pending]:(state)=>{
  //     state.isLoading = true;
  //   },
  //   [getCartItems.fulfilled]:(state,action)=>{ // action will include the json response
  //     console.log("the action from createAsyncThunk",action)
  //     state.isLoading = false;
  //     state.cartItems= action.payload
  //   },
  //   [getCartItems.rejected]:(state)=>{
  //     state.isLoading = true;
  //   },
  // }
// here .....................................
// do this from now.
extraReducers: (builder) => {
  builder
    .addCase(getCartItems.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getCartItems.fulfilled, (state, action) => {
      console.log("the action from createAsyncThunk", action);
      state.isLoading = false;
      state.cartItems = action.payload;
    })
    .addCase(getCartItems.rejected, (state) => {
      state.isLoading = true;
    });
},
});
export const { clearCart, removeItem,increase,decrease,calculateTotals } = cartSlice.actions;
export default cartSlice.reducer; // this is cartReducer

console.log("cart slice is", cartSlice);
