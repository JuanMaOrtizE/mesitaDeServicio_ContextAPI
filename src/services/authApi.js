const AUTH_API_URL = "http://localhost:4000/api/auth";

async function requestAuth(endpoint, options = {}) {
  const { body, ...customOptions } = options;

  const fetchOptions = {
    ...customOptions,
    credentials: "include",
  };

  if (body) {
    fetchOptions.headers = {
      "Content-Type": "application/json",
      ...customOptions.headers,
    };

    fetchOptions.body = JSON.stringify(body);
  }

  const response = await fetch(`${AUTH_API_URL}${endpoint}`, fetchOptions);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Authentication request failed");
  }

  return data;
}

export async function registerUser(userData) {
  const response = await requestAuth("/register", {
    method: "POST",
    body: userData,
  });

  return response;
}

export async function loginUser(credentials) {
  const response = await requestAuth("/login", {
    method: "POST",
    body: credentials,
  });

  return response;
}

export async function logoutUser() {
  const response = await requestAuth("/logout", {
    method: "POST",
  });

  return response;
}

export async function forgotPassword(email) {
  const response = await requestAuth("/forgot-password", {
    method: "POST",
    body: { email },
  });

  return response;
}

export async function resetPassword(data) {
  const response = await requestAuth("/reset-password", {
    method: "POST",
    body: data,
  });

  return response;
}

export async function getCurrentUser() {
  const response = await requestAuth("/me", {
    method: "GET",
  });

  return response;
}
