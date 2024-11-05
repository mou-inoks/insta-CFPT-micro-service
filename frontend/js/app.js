import { createPost } from './api/posts.js';

document.addEventListener('DOMContentLoaded', () => {
    const publicationForm = document.getElementById('publicationForm');
    const result = document.getElementById('new-post-result');

    publicationForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const userID = document.getElementById('userID').value;
        const photoFile = document.getElementById('photo').files[0];
        const caption = document.getElementById('caption').value;

        if (userID) {
            try {
                // Step 1: Create the post entry in the database
                const response = await createPost(userID, caption);
                // if http response code est 201
                if (response.status === 201) {

                    result.textContent = `Post created successfully.`;
                    result.style.color = 'green';
                } else {
                    result.textContent = `Failed to create post. Please try again : ${response.message}`;
                    result.style.color = 'red';
                }
            } catch (error) {
                result.textContent = `Failed to create post. Please try again : ${error.message}`;
                result.style.color = 'red';
            }
        } else {
            result.textContent = 'Please provide User ID.';
            result.style.color = 'red';
        }
    });
});
