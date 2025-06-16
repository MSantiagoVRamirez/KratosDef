// authService.js
const authService = {
  cerrarSesion: async () => {
    // Implement your logout logic here
    // For example, clear local storage, tokens, etc.
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
  }
};

export default authService;