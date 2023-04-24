import React from 'react'
import { Link } from 'react-router-dom'
const Welcome = () => {

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-Us', { dateStyle: 'short',timeStyle: 'short'}).format(date)
    const content = (
        <section className="welcome">
            <p>{today}</p>
            <p><Link to="/dash/notes">notes</Link></p>
            <p><Link to="/dash/users">users</Link></p>
            
        </section>
    )
  return content
}

export default Welcome