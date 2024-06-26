export default function() {
  const COOKIE_MAX_AGE = 24 * 60 * 60;
  
  const token = useCookie('access_token', {
    maxAge: COOKIE_MAX_AGE,
  });
  
  async function login(credenciais) {
    try {
      const { data: user } = await useFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(credenciais),
      });

      if ( user.value.uui ) {
        setToken(user.value.token.accessToken);
      }

    } catch (error) {
      throw error;
    }
  }

  async function logout() {
    await useFetch('/api/auth/logout', {
      method: 'POST',
    });
    setToken(null);
  }

  function setToken(access_token) {
    token.value = access_token;
  }

  function getToken() {
    return token.value;
  }

  function isLoggedIn() {
    return !!token.value;
  }

  return {
    login,
    logout,
    isLoggedIn,
    getToken,
  }
}

