import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <div className='not-found'>
      <h1>404 Not Found</h1>
      <h2>( ͡─ ﹏ ͡─)</h2>
      <Link to="/">Go home</Link>
    </div>
  )
}

export default ErrorPage