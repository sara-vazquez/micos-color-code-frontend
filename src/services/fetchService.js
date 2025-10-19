const API_URL =  "http://localhost:8080";

class FetchService {
    constructor(baseURL) {
      this.baseURL = baseURL;
    }
  
    async request(endpoint, options = {}) {
      const token = localStorage.getItem('token');
      
      const config = {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      };
  
      try {
        const response = await fetch(`${this.baseURL}${endpoint}`, config);
  
        // If response 401, go to login
        if (response.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
          throw new Error('Token expired');
        }
  
        // If response's not OK, throw error 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        // If there's no content = null
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          return null;
        }
  
        return await response.json();
      } catch (error) {
        console.error('Fetch error:', error);
        throw error;
      }
    }
  
    get(endpoint, options = {}) {
      return this.request(endpoint, { ...options, method: 'GET' });
    }
  
    post(endpoint, data, options = {}) {
      return this.request(endpoint, {
        ...options,
        method: 'POST',
        body: JSON.stringify(data),
      });
    }
  
    put(endpoint, data, options = {}) {
      return this.request(endpoint, {
        ...options,
        method: 'PUT',
        body: JSON.stringify(data),
      });
    }
  
    delete(endpoint, options = {}) {
      return this.request(endpoint, { ...options, method: 'DELETE' });
    }
}

const fetchService = new FetchService(`${API_URL}`);
  
export default fetchService;