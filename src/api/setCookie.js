const setCookieValue = (cookieName, cookieValue) => {
    const cookieString = `${cookieName}=${cookieValue}; path=/`;

    document.cookie = cookieString;
};
export default setCookieValue; 