// Importing the axios library
import axios from 'axios';

// AxiosClient class for making HTTP requests
class AxiosClient {
  // Constructor to initialize the Axios instance with base URL and default settings
  constructor(baseURL) {
    this.instance = axios.create({
      baseURL,
      timeout: 5000, // Adjust the timeout as needed
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.API_KEY}`, // Adding authorization header
      },
    });
  }

  // Asynchronous method to perform a GET request
  async get(url, params = {}) {
    try {
      // Making the GET request using the Axios instance
      const response = await this.instance.get(url, { params });
      // Returning the data from the response
      return response.data;
    } catch (error) {
      // Handling errors by calling the handleError method
      throw this.handleError(error);
    }
  }

  // Asynchronous method to perform a POST request
  async post(url, data = {}) {
    try {
      // Making the POST request using the Axios instance
      const response = await this.instance.post(url, data);
      // Returning the data from the response
      return response.data;
    } catch (error) {
      // Handling errors by calling the handleError method
      throw this.handleError(error);
    }
  }

  // Asynchronous method to perform a PUT request
  async put(url, data = {}) {
    try {
      // Making the PUT request using the Axios instance
      const response = await this.instance.put(url, data);
      // Returning the data from the response
      return response.data;
    } catch (error) {
      // Handling errors by calling the handleError method
      throw this.handleError(error);
    }
  }

  // Asynchronous method to perform a DELETE request
  async delete(url) {
    try {
      // Making the DELETE request using the Axios instance
      const response = await this.instance.delete(url);
      // Returning the data from the response
      return response.data;
    } catch (error) {
      // Handling errors by calling the handleError method
      throw this.handleError(error);
    }
  }

  // Method to handle errors and provide detailed error information
  handleError(error) {
    if (error.response) {
      // The request was made, but the server responded with a status code outside of the 2xx range
      console.error('Response Error:', error.response.data);
      return error.response.data;
    } else if (error.request) {
      // The request was made, but no response was received
      console.error('Request Error:', error.request);
      return { error: 'No response received from the server' };
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('General Error:', error.message);
      return { error: 'An error occurred while processing the request' };
    }
  }
}

// Example usage:
// const baseURL = 'https://api.example.com';
// const axiosClient = new AxiosClient(baseURL);
// const data = await axiosClient.get('/posts');
// console.log(data);

// Exporting the AxiosClient class as the default export
export default AxiosClient;
