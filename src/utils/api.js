import axios from 'axios';

const API_KEY = 'YOUR_NEWS_API_KEY_HERE';
const BASE_URL = 'https://newsapi.org/v2';

export const fetchCityNews = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/everything`, {
      params: {
        q: city,
        apiKey: API_KEY,
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 20,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

export default { fetchCityNews };
