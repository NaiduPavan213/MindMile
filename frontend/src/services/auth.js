// Small auth service used by Login/Register pages.
// Exports named functions so components can import { login, saveToken }

export async function login(email, password) {
  // Try to call backend if available, otherwise return a mocked token.
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.message || "Login failed");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    // Propagate the error so callers know login failed.
    throw err;
  }
}

export async function register(name, email, password) {
  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      // Try to parse JSON error body, otherwise fall back to text
      let message = "Registration failed";
      try {
        const body = await res.json();
        message = body.message || JSON.stringify(body);
      } catch (e) {
        try {
          const text = await res.text();
          message = text || message;
        } catch (e2) {
          // keep default
        }
      }
      throw new Error(`[${res.status}] ${message}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    // Propagate the error so callers know registration failed.
    throw err;
  }
}

export function saveToken(token) {
  try {
    localStorage.setItem("mm_token", token);
  } catch (e) {
    // ignore storage errors
  }
}

export function getToken() {
  try {
    return localStorage.getItem("mm_token");
  } catch (e) {
    return null;
  }
}

export function logout() {
  try {
    localStorage.removeItem("mm_token");
  } catch (e) {}
}

// Performs a backend logout (if available) and clears tokens from storage.
export async function logoutUser() {
  const token = getToken();
  try {
    // Attempt to notify the backend; ignore network errors.
    await fetch("/api/auth/logout", {
      method: "POST",
      headers: token
        ? {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        : { "Content-Type": "application/json" },
    });
  } catch (e) {
    // ignore
  }

  try {
    localStorage.removeItem("mm_token");
  } catch (e) {}

  try {
    // also remove an alternate token key if used elsewhere
    localStorage.removeItem("authToken");
  } catch (e) {}

  return true;
}
