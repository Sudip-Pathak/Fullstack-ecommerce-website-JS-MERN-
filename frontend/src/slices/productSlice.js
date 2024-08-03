import { PRODUCT_URL } from "../constant";
import { apiSlice } from "./apiSlice";

const productSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCT_URL,
      }),
      providesTags: ["Product"], // // It is alsi used for caching data like refetch. Helps to link with the particular tag for caching.
      keepUnusedDataFor: 10, // // time that remians the loaded data in the cache (standard: 60s). So, that loaded data will not load in the time frame if clicked again.
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,
      }),
      keepUnusedDataFor: 10,
    }),
    addProduct: builder.mutation({
      query: () => ({
        url: PRODUCT_URL,
        method: "POST",
      }),
      invalidatesTags: ["Product"], // // When api is called, this will say that the product data is invalid and refetch it again. Means the cache has the exisitg data,
      // // clear that a update the new data after new data is updated.This helps to update and display the new data without page refersh as well as display the existing data as it is.
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
} = productSlice;
