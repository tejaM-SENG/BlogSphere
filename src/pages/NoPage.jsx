import React from 'react'
import { Link } from 'react-router-dom'

const NoPage = () => {
  return (
    <div className='container p-5 text-center'>
        <h2>Page Not Found</h2>
        <Link to={'/'}>
            <button className ='btn btn-primary'>Go Home</button>
        </Link>   
    </div>
  )
}

export default NoPage