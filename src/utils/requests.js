import axios from 'axios';

export const request = async function (
  method,
  endpoint,
  headers,
  { data = {}, api = true } = {}
) {
  let url;
  const apiVersion = process.env.REACT_APP_API_VERSION;

  if (process.env.REACT_APP_NODE_ENV === 'production') {
    url = process.env.REACT_APP_API_URL_PRODUCTION;
  } else {
    const apiUrl = process.env.REACT_APP_API_URL;
    const port = process.env.REACT_APP_PORT;
    url = `${apiUrl}:${port}`;
  }

  if (api) url += apiVersion;

  return await axios({
    method,
    url: `${url}${endpoint}`,
    data,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    withCredentials: true,
  });
};
