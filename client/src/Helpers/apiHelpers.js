export const fetchApiData = async (apiFunction, data, Thunk) => {
    try {
        const response = await apiFunction(data);
        return response.data;
    } catch (error) {
        return Thunk.rejectWithValue(error.response.data);
    }
};
