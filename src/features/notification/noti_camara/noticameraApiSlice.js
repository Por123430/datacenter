import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../../app/api/apiSlice";

const noticameraAdapter = createEntityAdapter({})

const initialState = noticameraAdapter.getInitialState()

export const noticameraApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getNoticamera: builder.query({
        query: () => '/notiCamera',

        validateStatus: (response, result) => {
            // console.log(result)
            return response.status === 200 && !result.isError
        },
        keepUnusedDataFor: 5,

        transformResponse: responseData => {
            const loadedNoticamera = responseData.map(noticamera => {
                // console.log(notitemperature)
                noticamera.id = noticamera._id
                
                
                return noticamera
            });
            
            return noticameraAdapter.setAll(initialState, loadedNoticamera)
        },
        providesTags: (result, error, arg) => {
            
            if (result?.ids) {
                return [
                    { type: 'MoniNoticamera', id: 'LIST'},
                    ...result.ids.map(id => ({ type: 'Noticamera', id}))
                ]
            } else return [{ type : 'Noticamera' , id: 'LIST'}]

        }
    }),
    addNoticamera: builder.mutation({
        query: initialUserData => ({
            url: '/notiCamera',
            method: 'POST',
            body: {
                ...initialUserData,
            }
        }),
        invalidatesTags: [
            { type: 'Noticamera', id: "LIST"}
        ]
    }),
})
})
export const{
  useGetNoticameraQuery,
  useAddNoticameraMutation
} = noticameraApiSlice
export const  selectNoticameraResult = noticameraApiSlice.endpoints.getNoticamera.select()

const selectNoticameraData = createSelector(
    selectNoticameraResult,
    noticameraResult => noticameraResult.data
)

export const {
    selectAll: selectAllNotiCamera,
    selectById: selectNotiCameraById,
    selectIds: selectNotiCameraIds
} = noticameraAdapter.getSelectors(state => selectNoticameraData(state) ??
initialState)
