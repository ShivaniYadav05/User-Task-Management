import React, { useEffect, useState } from 'react'
import { fetchUsers, createUser, updateUser, deleteUser } from './api'
import UserTable from './components/UserTable'
import UserForm from './components/UserForm'

export default function App() {
  const [users, setUsers] = useState([])
  const [editing, setEditing] = useState(null)
  const [query, setQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('')

  async function load() {
    const data = await fetchUsers()
    setUsers(data)
  }

  useEffect(() => { load() }, [])

  async function handleCreate(payload) {
    const created = await createUser(payload)
    setUsers(prev => [created, ...prev])
  }

  async function handleUpdate(id, payload) {
    const updated = await updateUser(id, payload)
    setUsers(prev => prev.map(u => u._id === id ? updated : u))
    setEditing(null)
  }

  async function handleDelete(id) {
    await deleteUser(id)
    setUsers(prev => prev.filter(u => u._id !== id))
  }

  const filtered = users.filter(u => {
    const q = query.toLowerCase();
    const matchesQuery = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    const matchesRole = !roleFilter || u.role === roleFilter;
    return matchesQuery && matchesRole;
  })

  const roles = Array.from(new Set(users.map(u => u.role))).filter(Boolean)

  return (
    <div className="container">
      <h1>User Management</h1>
      <UserForm onCreate={handleCreate} editing={editing} onUpdate={handleUpdate} onCancel={() => setEditing(null)} />

      <div style={{ marginTop: 20 }}>
        <input placeholder="Search by name or email" value={query} onChange={e => setQuery(e.target.value)} />
        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
          <option value="">All roles</option>
          {roles.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      <UserTable users={filtered} onEdit={u => setEditing(u)} onDelete={handleDelete} />
    </div>
  )
}
