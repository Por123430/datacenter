import React from 'react'
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice  } from "../../../app/api/apiSlice";

const notilightAdapter = createEntityAdapter({})

const initialState = notilightAdapter.getInitialState()
export const notilightApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
      getNotilight: builder.query({
          query: () => '/notiLight',

          validateStatus: (response, result) => {
              // console.log(result)
              return response.status === 200 && !result.isError
          },
          keepUnusedDataFor: 5,

          transformResponse: responseData => {
              const loadedNotilight = responseData.map(notilight => {
                  // console.log(notitemperature)
                  notilight.id = notilight._id
                  
                  
                  return notilight
              });
              
              return notilightAdapter.setAll(initialState, loadedNotilight)
          },
          providesTags: (result, error, arg) => {
              
              if (result?.ids) {
                  return [
                      { type: 'MoniNotiLight', id: 'LIST'},
                      ...result.ids.map(id => ({ type: 'NotiLight', id}))
                  ]
              } else return [{ type : 'NotiLight' , id: 'LIST'}]

          }
      }),
      addNotilight: builder.mutation({
          query: initialUserData => ({
              url: '/notiLight',
              method: 'POST',
              body: {
                  ...initialUserData,
              }
          }),
          invalidatesTags: [
              { type: 'NotiLight', id: "LIST"}
          ]
      }),
  })
})
export const {
  useGetNotilightQuery,
  useAddNotilightMutation
} = notilightApiSlice

export const selectNotilightResult = notilightApiSlice.endpoints.getNotilight.select()

const selectNotiLightData = createSelector(
    selectNotilightResult,
  notilightResult => notilightResult.data
)
export const {
  selectAll: selectAllNotiLight,
  selectById: selectNotiLightById,
  selectIds: selectNotiLightIds
} = notilightAdapter.getSelectors(state => selectNotiLightData(state) ??
initialState)