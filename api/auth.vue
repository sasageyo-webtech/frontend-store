<script>
    import axios from 'axios';

    const apiClient = axios.create({
        baseURL: 'http://localhost/api',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    export const login = async (email, password) => {
        try {
            const response = await apiClient.post('/users/login', {
                email,
                password
            });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    };

    export const logout = async () => {
        try {
            apiClient.post('/revoke', {}, {
                    headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
        } catch (error) {
            throw error.response ? error.responsedata : error;
        }
    }

    export const register = async (name, email, phone_number, image_path, password, password_confirmation) => {
        try {
            const response = await apiClient.post('/users/register', {
                name, email, phone_number, image_path, password, password_confirmation
            });
            return response;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    };

</script>