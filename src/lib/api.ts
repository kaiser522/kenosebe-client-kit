import { User, Organization, Report, Paginated } from '@/types';

const API_BASE_URL = 'http://localhost:8000';

// CSRF token management
let csrfToken: string | null = null;

export async function fetchCSRFToken(): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/api/csrf/`, {
    credentials: 'include',
  });
  const data = await response.json();
  csrfToken = data.csrfToken;
  return csrfToken;
}

function getCSRFToken(): string {
  return csrfToken || '';
}

// Generic API request handler
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add CSRF token for non-GET requests
  if (options.method && options.method !== 'GET') {
    if (!csrfToken) {
      await fetchCSRFToken();
    }
    headers['X-CSRFToken'] = getCSRFToken();
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include', // Important for session-based auth
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
    throw new Error(error.detail || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Authentication API
export const authAPI = {
  async login(username: string, password: string): Promise<User> {
    return apiRequest<User>('/api/login/', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  },

  async logout(): Promise<void> {
    return apiRequest<void>('/api/logout/', {
      method: 'POST',
    });
  },

  async getCurrentUser(): Promise<User> {
    return apiRequest<User>('/api/me/');
  },
};

// Users API
export const usersAPI = {
  async list(params?: Record<string, string>): Promise<Paginated<User>> {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return apiRequest<Paginated<User>>(`/api/users/${queryString}`);
  },

  async get(id: number): Promise<User> {
    return apiRequest<User>(`/api/users/${id}/`);
  },

  async create(userData: Partial<User>): Promise<User> {
    return apiRequest<User>('/api/users/', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  async update(id: number, userData: Partial<User>): Promise<User> {
    return apiRequest<User>(`/api/users/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  async delete(id: number): Promise<void> {
    return apiRequest<void>(`/api/users/${id}/`, {
      method: 'DELETE',
    });
  },

  async resetPassword(id: number, newPassword: string): Promise<void> {
    return apiRequest<void>(`/api/users/${id}/reset_password/`, {
      method: 'POST',
      body: JSON.stringify({ password: newPassword }),
    });
  },
};

// Organizations API
export const organizationsAPI = {
  async list(params?: Record<string, string>): Promise<Paginated<Organization>> {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return apiRequest<Paginated<Organization>>(`/api/organizations/${queryString}`);
  },

  async get(id: number): Promise<Organization> {
    return apiRequest<Organization>(`/api/organizations/${id}/`);
  },

  async create(orgData: Partial<Organization>): Promise<Organization> {
    return apiRequest<Organization>('/api/organizations/', {
      method: 'POST',
      body: JSON.stringify(orgData),
    });
  },

  async update(id: number, orgData: Partial<Organization>): Promise<Organization> {
    return apiRequest<Organization>(`/api/organizations/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(orgData),
    });
  },

  async delete(id: number): Promise<void> {
    return apiRequest<void>(`/api/organizations/${id}/`, {
      method: 'DELETE',
    });
  },
};

// Reports API
export const reportsAPI = {
  async list(params?: Record<string, string>): Promise<Paginated<Report>> {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return apiRequest<Paginated<Report>>(`/api/reports/${queryString}`);
  },

  async get(id: number): Promise<Report> {
    return apiRequest<Report>(`/api/reports/${id}/`);
  },

  async create(reportData: Partial<Report>): Promise<Report> {
    return apiRequest<Report>('/api/reports/', {
      method: 'POST',
      body: JSON.stringify(reportData),
    });
  },

  async update(id: number, reportData: Partial<Report>): Promise<Report> {
    return apiRequest<Report>(`/api/reports/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(reportData),
    });
  },

  async delete(id: number): Promise<void> {
    return apiRequest<void>(`/api/reports/${id}/`, {
      method: 'DELETE',
    });
  },

  async stats(): Promise<any> {
    return apiRequest<any>('/api/reports/stats/');
  },

  async exportCSV(params?: Record<string, string>): Promise<Blob> {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    const response = await fetch(`${API_BASE_URL}/api/reports/export/csv/${queryString}`, {
      credentials: 'include',
    });
    return response.blob();
  },

  async exportPDF(params?: Record<string, string>): Promise<Blob> {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    const response = await fetch(`${API_BASE_URL}/api/reports/export/pdf/${queryString}`, {
      credentials: 'include',
    });
    return response.blob();
  },
};
