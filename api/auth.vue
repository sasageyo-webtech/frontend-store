<script>

    import axios from 'axios';

    const apiClient = axios.create({
        baseURL: 'http://localhost/api',
        headers: {
            "Accept" : 'application/json',
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

    export const register = async (username, email, firstname, lastname, gender, password, confirm_password) => {
        try {
            const response = await apiClient.post('/users/register', {
                username, email, firstname, lastname, gender, password, confirm_password
            });
            

            return response;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    };
</script>