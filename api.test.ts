const axios = require('axios');

test('API endpoint returns a status code of 200', async () => {
  // Make an HTTP request to the API endpoint
  const response = await axios.get('https://example.com/api/endpoint'); // Replace with your API URL

  // Verify that the status code is 200
  expect(response.status).toBe(200);
});



