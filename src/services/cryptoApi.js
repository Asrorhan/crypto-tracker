import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.coingecko.com/api/v3",
    prepareHeaders: (headers) => {
      headers.set("x-cg-demo-api-key", import.meta.env.VITE_COINGECKO_API_KEY);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: () => "/coins/markets?vs_currency=usd",
    }),
    getCoinDetails: builder.query({
      query: (coinId) => `/coins/${coinId}`,
    }),
  }),
});

export const { useGetCryptosQuery, useGetCoinDetailsQuery } = cryptoApi;
