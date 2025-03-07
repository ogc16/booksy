
import { Navigate } from "react-router-dom";

const Items = () => {
  // Redirect to dashboard as this page has been removed
  return <Navigate to="/dashboard" replace />;
};

export default Items;
