import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const monitorsAdapter = createEntityAdapter({})

const initialState = monitorsAdapter.getInitialState()

export const monitorsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getMonitors: builder.query({
            query: () => '/moniters',
            
            validateStatus: (response, result) => {
                // console.log(result)
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedMonitors = responseData.map(monitor => {
                    // console.log(monitor)
                    monitor.id = monitor._id
                    if(monitor.lighting === true){
                        monitor.lighting = 'detected'
                    }else{
                        monitor.lighting = 'undetected'
                    }
                    
                    return monitor
                });
                
                return monitorsAdapter.setAll(initialState, loadedMonitors)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Monitor', id: 'LIST'},
                        ...result.ids.map(id => ({ type: 'Monitor', id}))
                    ]
                } else return [{ type : 'Monitor' , id: 'LIST'}]

            }
            
        })
    })
})

export const {
    useGetMonitorsQuery,
} = monitorsApiSlice

export const selectMonitorsResult = monitorsApiSlice.endpoints.getMonitors.select()

const selectMonitorData = createSelector(
    selectMonitorsResult,
    monitorsResult => monitorsResult.data
)

export const {
    selectAll: selectAllMonitors,
    selectById: selectMonitorById,
    selectIds: selectMonitorIds
} = monitorsAdapter.getSelectors(state => selectMonitorData(state) ??
initialState)