import React from 'react'
import { Link } from 'react-router-dom'
export default function Navbar() {
  return (
    <div>
      <ul>
        <Link to="/details"><li>Details</li></Link>
      </ul>
    </div>
  )
}

