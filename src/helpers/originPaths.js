export const ORIGIN_URL =
  process.env.REACT_APP_NODE_ENV === 'development'
    ? process.env.REACT_APP_URL
    : process.env.REACT_APP_URL_PRODUCTION;

export const miniLinkPath = (urlCode) => `${ORIGIN_URL}/#/s/${urlCode}`;
