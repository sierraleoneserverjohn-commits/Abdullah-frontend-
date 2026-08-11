const CONFIG = {
    DEFAULT_BACKEND_URL: "https://abdullah-ai-backend.onrender.com",
    getBackendUrl: function() {
        return localStorage.getItem("backend_url") || this.DEFAULT_BACKEND_URL;
    },
    setBackendUrl: function(url) {
        localStorage.setItem("backend_url", url);
    }
};

