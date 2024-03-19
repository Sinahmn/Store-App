import { createSlice } from "@reduxjs/toolkit";
import { sumPrice, sumQuantity } from "../../helper/helper";


const initialState = {
  selectedItems: [],
  itemsCounter: 0,
  total: 0,
  checkout: false
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      if (!state.selectedItems.find(i => i.id === action.payload.id)) {
        state.selectedItems.push({ ...action.payload, quantity: 1 });
        state.itemsCounter = sumQuantity(state.selectedItems);
        state.total = sumPrice(state.selectedItems);

      }
    },
    removeItem: (state, action) => {
      const newSelectedItems = state.selectedItems.filter(i => i.id !== action.payload.id);
      state.selectedItems = newSelectedItems;
      state.itemsCounter = sumQuantity(state.selectedItems);
      state.total = sumPrice(state.selectedItems);
    },
    increase: (state, action) => {
      const index = state.selectedItems.findIndex(i => i.id === action.payload.id);
      state.selectedItems[index].quantity++;
      state.itemsCounter = sumQuantity(state.selectedItems);
      state.total = sumPrice(state.selectedItems);

    },
    decrease: (state, action) => {
      const index = state.selectedItems.findIndex(i => i.id === action.payload.id);
      state.selectedItems[index].quantity--;
      state.itemsCounter = sumQuantity(state.selectedItems);
      state.total = sumPrice(state.selectedItems);

    },
    checkout: state => {
      state.selectedItems = [];
      state.checkout = true;
      state.total = 0;
      state.itemsCounter = 0;
    }
  }
}

);




export default cartSlice.reducer;
export const { addItem, removeItem, increase, decrease, checkout } = cartSlice.actions;