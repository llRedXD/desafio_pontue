/**
 * Function to make API requests with configurable options
 * @param method The HTTP method to use (GET, POST, PUT, DELETE, etc.)
 * @param endpoint The API endpoint to call
 * @param data The data to send with the request (for POST, PUT, etc.)
 * @param requiresAuth Whether the request requires authentication
 * @returns Promise with the full response object
 */
export async function makeRequest(
  method: string,
  endpoint: string,
  data?: unknown,
  requiresAuth: boolean = false
): Promise<Response> {
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Add authorization header if required
  if (requiresAuth) {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authentication required but no token found");
    }
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options: RequestInit = {
    method: method.toUpperCase(),
    headers,
    credentials: "include",
  };

  // Add body for non-GET requests if data is provided
  if (method.toUpperCase() !== "GET" && data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    // Se receber 401 (Unauthorized), o token pode ter expirado
    if (response.status === 401 && requiresAuth) {
      // Limpa os dados de autenticação
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      localStorage.removeItem("tokenExpiresAt");

      // Dispara um evento customizado para informar que o usuário foi deslogado
      window.dispatchEvent(new CustomEvent("auth-expired"));

      throw new Error("Sessão expirada. Faça login novamente.");
    }

    if (!response.ok) {
      let errorMessage = "API request failed";

      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // Se não conseguir fazer parse do JSON, usa a mensagem padrão
        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }

      throw new Error(errorMessage);
    }

    return response;
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
}

// Export convenience methods for common HTTP methods
export const projectApi = {
  get: (endpoint: string, requiresAuth?: boolean) =>
    makeRequest("GET", endpoint, undefined, requiresAuth),

  post: (endpoint: string, data?: unknown, requiresAuth?: boolean) =>
    makeRequest("POST", endpoint, data, requiresAuth),

  put: (endpoint: string, data?: unknown, requiresAuth?: boolean) =>
    makeRequest("PUT", endpoint, data, requiresAuth),

  delete: (endpoint: string, data?: unknown, requiresAuth?: boolean) =>
    makeRequest("DELETE", endpoint, data, requiresAuth),
};
