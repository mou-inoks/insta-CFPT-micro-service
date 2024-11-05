export const http = {
    // POST request with body as JSON string
    post: async (url, formData) => {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(formData),
        });
        return response;
    },
    // POST request with body as FormData
    postFormData: async (url, formData) => {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });
        return response;
    }
};
