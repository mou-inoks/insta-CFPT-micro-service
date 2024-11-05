import { http } from '../utils/http.js';

const API_BASE_URL = 'http://localhost:8080';

export const createPost = async (userID, caption) => {
    const postData = {
        userID: userID,
        caption: caption,
    };
    // get the response from the server
    const response = await http.post(`${API_BASE_URL}`, postData);
    return response;
};
