import axios from 'axios';

class AuthService {
    private apiUrl: string;

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    async login(email: string, password: string): Promise<{ token: string }>{
        try {
            console.log("test")
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
}

export default AuthService;