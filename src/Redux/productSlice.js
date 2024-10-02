import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import all_product from "../Assets/all_product";

const initialState = {
    productsList: [],
    loading: false,
    error: null,
    productDetails: {}
};

export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {

    await new Promise((resolve) => setTimeout(resolve, 5000));

    const response = await fetch('https://fakestoreapi.com/products');
    console.log(response);

    return response.json();
})

export const fetchProductDetails = createAsyncThunk('product/fetchProducts', async (productId) => {

    await new Promise((resolve) => setTimeout(resolve, 5000));

    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
    console.log(response);

    // return response.json();
    return productId;
})

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProductList: (state, action) => {
            console.log(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                console.log(action);
                state.productsList = all_product;
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
        // builder
        //     .addCase(fetchProductDetails.pending, (state) => {
        //         state.loading = true;
        //         state.error = null;
        //     })
        //     .addCase(fetchProductDetails.fulfilled, (state, action) => {
        //         // state.productDetails = state.productsList.find(product => product.id === );
        //         console.log(action);
        //         state.loading = false;
        //     })
        //     .addCase(fetchProductDetails.rejected, (state, action) => {
        //         state.loading = false;
        //         state.error = action.error.message;
        //     });
    }
    // extraReducers: {
    //     [fetchProducts.pending]: (state) => {
    //         state.loading = true;
    //         state.error = null;
    //     },
    //     [fetchProducts.fulfilled]: (state, action) => {
    //         state.loading = false;
    //         state.productsList = all_product;
    //     },
    //     [fetchProducts.rejected]: (state, action) => {
    //         state.loading = false;
    //         state.error = action.error.message;
    //     },
    // }
});

export const { setProductList } = productSlice.actions;

export default productSlice.reducer;