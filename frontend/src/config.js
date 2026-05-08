// Change the production link later when your backend is deployed to Render
const API_URL = import.meta.env.MODE === 'production' 
  ? 'https://your-future-backend-link.onrender.com/api' 
  : 'http://localhost:5000/api';

export default API_URL;