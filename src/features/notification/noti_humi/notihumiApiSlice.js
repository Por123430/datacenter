import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice  } from "../../../app/api/apiSlice";

const notihumiAdapter = createEntityAdapter({})

const initialState = notihumiAdapter.getInitialState()

export const notihumiApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getNotihumi: builder.query({
            query: () => '/notiHumi',

            validateStatus: (response, result) => {
                // console.log(result)
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,

            transformResponse: responseData => {
                const loadedNotiHumidities = responseData.map(notihumidities => {
                    // console.log(notihumidities)
                    notihumidities.id = notihumidities._id
                    
                    
                    return notihumidities
                });
                
                return notihumiAdapter.setAll(initialState, loadedNotiHumidities)
            },
            providesTags: (result, error, arg) => {
                
                if (result?.ids) {
                    return [
                        { type: 'MoniNotiHumiditiestor', id: 'LIST'},
                        ...result.ids.map(id => ({ type: 'NotiHumidities', id}))
                    ]
                } else return [{ type : 'NotiHumidities' , id: 'LIST'}]

            }
        }),
        addNotihumi: builder.mutation({
            query: initialUserData => ({
                url: '/notiHumi',
                method: 'POST',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: [
                { type: 'NotiHumidities', id: "LIST"}
            ]
        }),
    })
})

export const {
    useGetNotihumiQuery,
    useAddNotihumiMutation,
} = notihumiApiSlice

export const selectNotiHumiditiesResult = notihumiApiSlice.endpoints.getNotihumi.select()

const selectNotiHumiditiesData = createSelector(
    selectNotiHumiditiesResult,
    notihumiditiesResult => notihumiditiesResult.data
)

export const {
    selectAll: selectAllNotiHumidities,
    selectById: selectNotiHumiditiesById,
    selectIds: selectNotiHumiditiesIds
} = notihumiAdapter.getSelectors(state => selectNotiHumiditiesData(state) ??
initialState)