const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export async function fetchUsers() {
  const res = await fetch(`${API_BASE}/api/users`);
  return res.json();
}

export async function createUser(payload) {
  const res = await fetch(`${API_BASE}/api/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function updateUser(id, payload) {
  const res = await fetch(`${API_BASE}/api/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function deleteUser(id) {
  const res = await fetch(`${API_BASE}/api/users/${id}`, { method: 'DELETE' });
  return res.json();
}