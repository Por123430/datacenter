import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const senserAdapter = createEntityAdapter({})

const initialState = senserAdapter.getInitialState()

export const sensorApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSensor: builder.query({
            query: () => '/sensor',

            validateStatus: (response, result) => {
                //console.log(result)
                return response.status === 200 && !result.isError
            },

            transformResponse: responseData => {
                const loadedSensor = responseData.map(sensor => {
                    // console.log(sensor)
                    sensor.id = sensor._id
                    return sensor
                });
                return senserAdapter.setAll(initialState, loadedSensor)
            },

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Sensor', id: 'LIST'},
                        ...result.ids.map(id => ({ type: 'Sensor', id}))
                    ]
                } else return [{ type : 'Sensor' , id: 'LIST'}]
            }
        }),
        updateSensor: builder.mutation({
            query: initialSensorData => ({
                url: '/sensor',
                method: 'PATCH',
                body: {
                    ...initialSensorData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Sensor', id: arg.id }
            ]
        }),
    })
})

export const {
    useGetSensorQuery,
    useUpdateSensorMutation
} = sensorApiSlice

export const selectSensorResult = sensorApiSlice.endpoints.getSensor.select()

const selectSensorData = createSelector(
    selectSensorResult,
    sensorResult => sensorResult.data
)

export const {
    selectAll: selectAllSensor,
    selectById: selectSensorById,
    selectIds: selectSensorIds
} = senserAdapter.getSelectors(state => selectSensorData(state) ??
initialState)