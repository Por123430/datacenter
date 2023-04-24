import React from 'react'
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice  } from "../../../app/api/apiSlice";

const notitempAdapter = createEntityAdapter({})

const initialState = notitempAdapter.getInitialState()
export const notitempApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
      getNotitemp: builder.query({
          query: () => '/notiTemp',

          validateStatus: (response, result) => {
              // console.log(result)
              return response.status === 200 && !result.isError
          },
          keepUnusedDataFor: 5,

          transformResponse: responseData => {
              const loadedNotitemperature = responseData.map(notitemperature => {
                  // console.log(notitemperature)
                  notitemperature.id = notitemperature._id
                  
                  
                  return notitemperature
              });
              
              return notitempAdapter.setAll(initialState, loadedNotitemperature)
          },
          providesTags: (result, error, arg) => {
              
              if (result?.ids) {
                  return [
                      { type: 'MoniNotiTemperaturetor', id: 'LIST'},
                      ...result.ids.map(id => ({ type: 'NotiTemperature', id}))
                  ]
              } else return [{ type : 'NotiTemperature' , id: 'LIST'}]

          }
      }),
      addNotitemp: builder.mutation({
          query: initialUserData => ({
              url: '/notiTemp',
              method: 'POST',
              body: {
                  ...initialUserData,
              }
          }),
          invalidatesTags: [
              { type: 'NotiTemperature', id: "LIST"}
          ]
      }),
  })
})
export const {
  useGetNotitempQuery,
  useAddNotitempMutation
} = notitempApiSlice

export const selectNotiTemperatureResult = notitempApiSlice.endpoints.getNotitemp.select()

const selectNotiTemperatureData = createSelector(
  selectNotiTemperatureResult,
  notitemperatureResult => notitemperatureResult.data
)
export const {
  selectAll: selectAllNotiTemperature,
  selectById: selectNotiTemperatureById,
  selectIds: selectNotiTemperatureIds
} = notitempAdapter.getSelectors(state => selectNotiTemperatureData(state) ??
initialState)