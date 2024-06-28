import React from 'react'
import { Link } from 'react-router-dom'
export default function Navbar() {
  return (
    <div>
      <h1>Details</h1>
      <ul>
        <Link to="/Details/id/"><li>Details</li></Link>
      </ul>
    </div>
  )
}

