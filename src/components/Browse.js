import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

//fetching movies data from tmdb api and updating it with redux store
const Browse = () => {
 useNowPlayingMovies();

  return (
    <div>
      <Header />
      <MainContainer/>
      <SecondaryContainer/>
      <div></div>
    </div>
  );
};
export default Browse;






/*
Certainly! Let's use a fictional weather API to illustrate examples of an API, an API endpoint, and an API URL:

1. **API**:
   - Our fictional weather API provides developers with access to weather data, including current conditions, forecasts, and historical data.
   - It defines methods for retrieving weather information, such as GET requests for current conditions and forecasts.
   - Developers can integrate this API into their applications to display weather information to users.

2. **API Endpoint**:
   - One of the endpoints provided by our fictional weather API is `/current`, which allows developers to retrieve current weather conditions.
   - Another endpoint is `/forecast`, which provides weather forecasts for a specified location and time range.
   - Each of these endpoints represents a specific resource or functionality within the weather API.

3. **API URL**:
   - Given that the base URL of our fictional weather API is `https://api.weatherforecast.com`, we can combine it with specific endpoints to create API URLs.
   - Example of an API URL for retrieving current weather conditions:
     - `https://api.weatherforecast.com/current`
   - Example of an API URL for getting a weather forecast:
     - `https://api.weatherforecast.com/forecast`
   - These URLs represent the complete addresses that developers would use to access the respective endpoints of the weather API.

By understanding these examples, developers can effectively utilize the API, identify the functionalities they need by referring to the endpoints, and construct the appropriate API URLs to make requests and retrieve the desired weather data.

The Fetch API is a modern interface for making network requests in web browsers and Node.js environments. It provides a more powerful and flexible way to fetch resources asynchronously from the server compared to traditional methods like XMLHttpRequest. The Fetch API is promise-based, allowing for cleaner asynchronous code with features like chaining and handling errors.

Here's a brief overview of the Fetch API and how it differs from the more commonly known HTTP methods like GET, PUT, and POST:

1. **Fetch API**:
   - The Fetch API provides a global `fetch()` function that allows you to make requests to a server and retrieve resources.
   - It uses Promises, which simplifies handling asynchronous operations and allows for more readable code.
   - Fetch supports a wide range of options for configuring requests, including setting headers, specifying request methods, and handling different types of data.
   - The response from a Fetch API call is a `Response` object that provides methods for accessing the response body and metadata.
   - Example:
     ```javascript
     fetch('https://api.example.com/data')
       .then(response => response.json())
       .then(data => console.log(data))
       .catch(error => console.error('Error:', error));
     ```

2. **GET, PUT, POST, etc.**:
   - These are HTTP methods used for interacting with resources on a server.
   - GET: Used to retrieve data from the server. It's a safe and idempotent method, meaning it should not have any side effects on the server, and multiple identical requests should produce the same result.
   - PUT: Used to update or replace a resource on the server with the provided data. It replaces the entire resource with the new data.
   - POST: Used to submit data to the server to create a new resource or perform a specific action. It typically involves sending data in the request body.
   - These methods are often used with XMLHttpRequest or other AJAX libraries in web development.
   - Example (using XMLHttpRequest):
     ```javascript
     var xhr = new XMLHttpRequest();
     xhr.open('GET', 'https://api.example.com/data', true);
     xhr.onload = function() {
       if (xhr.status >= 200 && xhr.status < 300) {
         console.log(JSON.parse(xhr.responseText));
       } else {
         console.error('Request failed:', xhr.statusText);
       }
     };
     xhr.onerror = function() {
       console.error('Network error');
     };
     xhr.send();
     ```

In summary, the Fetch API provides a modern, promise-based interface for making network requests, while traditional HTTP methods like GET, PUT, and POST are part of the HTTP protocol and are commonly used for specific actions such as retrieving, updating, or creating resources on a server.

The primary difference between using `fetch` and using `fetch` with the `GET` method lies in the default behavior of the Fetch API and how it interacts with the server.

1. **Using `fetch` without specifying a method**:
   - If you use `fetch` without specifying a method, it defaults to a `GET` request.
   - This means that the Fetch API will make a `GET` request to the specified URL by default.
   - For example:
     ```javascript
     fetch('https://api.example.com/data')
       .then(response => response.json())
       .then(data => console.log(data))
       .catch(error => console.error('Error:', error));
     ```
   - In this case, the Fetch API will make a `GET` request to `https://api.example.com/data`.

2. **Using `fetch` with the `GET` method explicitly**:
   - If you explicitly specify the `GET` method when using `fetch`, it essentially achieves the same result as using `fetch` without specifying a method.
   - The only difference is that it makes it explicit that you are intending to perform a `GET` request.
   - For example:
     ```javascript
     fetch('https://api.example.com/data', {
       method: 'GET'
     })
     .then(response => response.json())
     .then(data => console.log(data))
     .catch(error => console.error('Error:', error));
     ```
   - This code snippet will also make a `GET` request to `https://api.example.com/data`.

In summary, using `fetch` without specifying a method or using `fetch` with the `GET` method explicitly will both result in a `GET` request being made to the specified URL. The difference is mainly in code readability and explicitness of the intended HTTP method.

Yes, you can use HTTP methods such as GET, PUT, POST, etc., without using the Fetch API directly. Before the Fetch API became widely supported, developers commonly used other methods for making HTTP requests, such as XMLHttpRequest (XHR) in browsers or various HTTP client libraries in other environments like Node.js.

Here are a few alternatives to using the Fetch API:

1. **XMLHttpRequest (XHR)**:
   - XMLHttpRequest is an older API for making HTTP requests in web browsers.
   - It provides similar functionality to the Fetch API but with a different syntax.
   - XMLHttpRequest is well-supported in all modern web browsers.
   - Example:
     ```javascript
     var xhr = new XMLHttpRequest();
     xhr.open('GET', 'https://api.example.com/data', true);
     xhr.onload = function() {
       if (xhr.status >= 200 && xhr.status < 300) {
         console.log(JSON.parse(xhr.responseText));
       } else {
         console.error('Request failed:', xhr.statusText);
       }
     };
     xhr.onerror = function() {
       console.error('Network error');
     };
     xhr.send();
     ```

2. **HTTP client libraries**:
   - In server-side environments like Node.js, developers often use HTTP client libraries to make HTTP requests.
   - Examples include Axios, Request, and Node's built-in HTTP module.
   - These libraries provide a more convenient and feature-rich interface compared to raw XMLHttpRequest.
   - Example using Axios:
     ```javascript
     const axios = require('axios');

     axios.get('https://api.example.com/data')
       .then(response => {
         console.log(response.data);
       })
       .catch(error => {
         console.error('Error:', error);
       });
     ```

3. **Native language features**:
   - Some programming languages have built-in support for making HTTP requests.
   - For example, in Python, you can use the `requests` library or the `http.client` module to make HTTP requests.
   - Similarly, other languages have their own native libraries or features for making HTTP requests.

These alternatives provide different ways to make HTTP requests depending on the environment and requirements of your application. While the Fetch API offers a modern and standardized approach, these alternatives remain valid choices in certain contexts.
*/


