import React from 'react'

export default function UserTable({ users, onEdit, onDelete }) {
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
          <th>Bio</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(u => (
          <tr key={u._id}>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>{u.role}</td>
            <td>{u.status}</td>
            <td>{u.bio}</td>
            <td>
              <button onClick={() => onEdit(u)}>Edit</button>
              <button onClick={() => { if (confirm('Delete user?')) onDelete(u._id) }}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
