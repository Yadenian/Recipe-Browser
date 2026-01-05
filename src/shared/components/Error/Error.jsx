import './Error.css';

export function Error({ message = 'Something went wrong. Please try again later.' }) {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h2>Error</h2>
      <p>{message}</p>
    </div>
  );
}
