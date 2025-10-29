import { Loader2 } from 'lucide-react';

export const Loader = ({ size = 40, message = 'Loading...' }) => {
  return (
    <div className="loader-container">
      <Loader2 className="loader-icon" size={size} />
      <p className="loader-message">{message}</p>
    </div>
  );
};
