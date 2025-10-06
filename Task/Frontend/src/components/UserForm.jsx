import React, { useEffect, useState } from 'react'

export default function UserForm({ onCreate, editing, onUpdate, onCancel }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [status, setStatus] = useState('active')

  useEffect(() => {
    if (editing) {
      setName(editing.name || '')
      setEmail(editing.email || '')
      setRole(editing.role || '')
      setStatus(editing.status || 'active')
    }
  }, [editing])

  function reset() {
    setName(''); setEmail(''); setRole(''); setStatus('active')
  }

  async function submit(e) {
    e.preventDefault()
    const payload = { name, email, role, status }
    if (editing) {
      await onUpdate(editing._id, payload)
    } else {
      await onCreate(payload)
      reset()
    }
  }

  return (
    <form onSubmit={submit} className="user-form">
      <h2>{editing ? 'Edit user' : 'Add new user'}</h2>
      <input required placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input required placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input required placeholder="Role" value={role} onChange={e => setRole(e.target.value)} />
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <div>
        <button type="submit">{editing ? 'Update' : 'Create'}</button>
        {editing && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  )
}
