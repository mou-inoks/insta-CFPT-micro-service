import axios from 'axios';

class AuthService {
    private apiUrl: string;

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    async login(email: string, password: string): Promise<{ token: string }> {
        try {
            const response = await axios.post(`${this.apiUrl}/auth/login`, {
                email,
                password
            });

            if (response.data && response.data.token) {
                return response.data.token;
            } else {
                throw new Error('Token not found in response');
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Login failed: ${error.message}`);
            } else {
                throw new Error('Login failed: Unknown error');
            }
        }
    }

    async register(username: string, email: string, password: string, confirmPassword: string): Promise<{ token: string }> {
        if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }
        if (username && email && password) {
            try {
                const response = await axios.post(`${this.apiUrl}/users`, {
                    username,
                    email,
                    password
                });
                if (response.data && response.data.token) {
                    return response.data;
                } else {
                    throw new Error('Token not found in response');
                }
            } catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Registration failed: ${error.message}`);
                } else {
                    throw new Error('Registration failed: Unknown error');
                }
            }
        }
        else {
            throw new Error('Invalid input: username, email, and password are required');
        }
    }
}

export default AuthService;