const getCookieValue = (cookieName) => {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const cookie = cookies.find(cookie => cookie.startsWith(`${cookieName}=`));
  
    if (cookie) {
      return cookie.split('=')[1];
    }
  
    return null;
}

export default getCookieValue