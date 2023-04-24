import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const activityAdapter = createEntityAdapter({})

const initialState = activityAdapter.getInitialState()

export const activityApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getActivity: builder.query({
            query: () => '/activity',
            
            validateStatus: (response, result) => {
                // console.log(result)
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedActivity = responseData.map(activity => {
                    // console.log(monitor)
                    activity.id = activity._id
                  
                    return activity
                });
                
                return activityAdapter.setAll(initialState, loadedActivity)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Activity', id: 'LIST'},
                        ...result.ids.map(id => ({ type: 'Activity', id}))
                    ]
                } else return [{ type : 'Activity' , id: 'LIST'}]

            }
            
        })
    })
})

export const {
    useGetActivityQuery,
} = activityApiSlice

export const selectActivityResult = activityApiSlice.endpoints.getActivity.select()

const selectActivityData = createSelector(
    selectActivityResult,
    activityResult => activityResult.data
)

export const {
    selectAll: selectAllActivity,
    selectById: selectActivityById,
    selectIds: selectActivityIds
} = activityAdapter.getSelectors(state => selectActivityData(state) ??
initialState)