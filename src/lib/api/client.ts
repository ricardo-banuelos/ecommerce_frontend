interface Headers {
  [key: string]: string;
}

interface QueryParams {
  [key: string]: string | number | boolean | undefined | null;
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const defaultHeaders: Headers = {
  'Content-Type': 'application/json',
};

class Client {
  baseUrl: string;
  headers: Headers;

  constructor(baseUrl = '', headers: Headers = {}) {
    this.baseUrl = baseUrl;
    this.headers = { ...defaultHeaders, ...headers };
  }

  /**
   * Set authentication token
   * @param {string} token - The authentication token
   */
  setAuthToken(token: string): void {
    this.headers.Authorization = `Bearer ${token}`;
  }

  /**
   * Make a GET request
   * @param {string} endpoint - The API endpoint
   * @param {QueryParams} params - Query parameters
   * @returns {Promise<T>} - The response data
   */
  async get<T = any>(endpoint: string, params: QueryParams = {}): Promise<T> {
    const url = this.buildUrl(endpoint, params);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: this.headers,
    });
    
    return this.handleResponse<T>(response);
  }

  /**
   * Make a POST request
   * @param {string} endpoint - The API endpoint
   * @param {any} data - The request body
   * @returns {Promise<T>} - The response data
   */
  async post<T = any, D = any>(endpoint: string, data: D = {} as D): Promise<T> {
    const url = this.buildUrl(endpoint);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    });
    
    return this.handleResponse<T>(response);
  }

  /**
   * Make a PUT request
   * @param {string} endpoint - The API endpoint
   * @param {any} data - The request body
   * @returns {Promise<T>} - The response data
   */
  async put<T = any, D = any>(endpoint: string, data: D = {} as D): Promise<T> {
    const url = this.buildUrl(endpoint);
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(data),
    });
    
    return this.handleResponse<T>(response);
  }

  /**
   * Make a DELETE request
   * @param {string} endpoint - The API endpoint
   * @returns {Promise<T>} - The response data
   */
  async delete<T = any>(endpoint: string): Promise<T> {
    const url = this.buildUrl(endpoint);
    
    const response = await fetch(url, {
      method: 'DELETE',
      headers: this.headers,
    });
    
    return this.handleResponse<T>(response);
  }

  /**
   * Make a custom request with any HTTP method
   * @param {HttpMethod} method - The HTTP method
   * @param {string} endpoint - The API endpoint
   * @param {any} data - The request body (for POST/PUT)
   * @param {QueryParams} params - Query parameters (for GET)
   * @returns {Promise<T>} - The response data
   */
  async request<T = any, D = any>(
    method: HttpMethod,
    endpoint: string,
    data?: D,
    params: QueryParams = {}
  ): Promise<T> {
    const url = this.buildUrl(endpoint, params);
    
    const options: RequestInit = {
      method,
      headers: this.headers,
    };
    
    if (data && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(data);
    }
    
    const response = await fetch(url, options);
    return this.handleResponse<T>(response);
  }

  /**
   * Build the full URL with query parameters
   * @param {string} endpoint - The API endpoint
   * @param {QueryParams} params - Query parameters
   * @returns {string} - The full URL
   */
  private buildUrl(endpoint: string, params: QueryParams = {}): string {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    Object.keys(params).forEach(key => {
      const value = params[key];
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
    
    return url.toString();
  }

  /**
   * Handle the API response
   * @param {Response} response - The fetch response
   * @returns {Promise<T>} - The response data
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type');
    
    if (!response.ok) {
      const error: any = new Error('API request failed');
      
      try {
        if (contentType && contentType.includes('application/json')) {
          error.data = await response.json();
        } else {
          error.data = await response.text();
        }
      } catch (e) {
        error.data = 'Unable to parse error response';
      }
      
      error.status = response.status;
      throw error;
    }
    
    if (contentType && contentType.includes('application/json')) {
      return response.json() as Promise<T>;
    }
    
    return response.text() as unknown as T;
  }
}

// Custom error interface for type checking errors
export interface ApiError extends Error {
  status?: number;
  data?: any;
}

// Export a singleton instance with no base URL (can be set later)
export const apiClient = new Client();

// Export the class to create custom instances
export default Client;