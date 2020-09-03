import axios from 'axios';

// Config axios
const instance = axios.create({
  baseURL: 'https://burgerbuilder-c97a5.firebaseio.com/',
});

export default instance;
