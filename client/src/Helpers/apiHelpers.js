export const fetchApiData = async (apiFunction, data) => {
    try {
        const response = await apiFunction({ data: { id: data } });
        return response.data;
    } catch (error) {
        return error;
    }
};
