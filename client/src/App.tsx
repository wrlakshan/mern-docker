import axios from 'axios'
import { useState , useEffect } from 'react'
import './App.css'


function App() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch users from the API
  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then((response) => {
        setUsers(response.data.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching users:', error)
        setLoading(false)
      })
  }, [])
  return (
    <>
      <h1 className="page-title">Users</h1>
      {loading ? (
        <div className="loading-container">
          <p className="loading-text">Loading...</p>
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="users-container">
          {users.map(user => (
            <div key={user._id} className="user-card">
              <div className="avatar">{user.name.charAt(0)}</div>
              <div className="user-name">{user.name}</div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default App
