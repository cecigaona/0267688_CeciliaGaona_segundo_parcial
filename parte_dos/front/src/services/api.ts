// Base URL for API calls
// When running in Docker, the browser is still on host machine and needs to access API via localhost
const API_URL = 'http://localhost:8080';

// API service for handling all API calls
export const api = {
  // Authentication
  async login(username: string, password: string) {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async register(username: string, password: string) {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  // User data
  async getUserData(userId: number) {
    try {
      const response = await fetch(`${API_URL}/user_data/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      return await response.json();
    } catch (error) {
      console.error('Get user data error:', error);
      throw error;
    }
  },

  async updateUserData(userData: any) {
    try {
      const response = await fetch(`${API_URL}/user_data`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user data');
      }

      return await response.json();
    } catch (error) {
      console.error('Update user data error:', error);
      throw error;
    }
  },
};
