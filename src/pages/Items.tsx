
import { Navigate } from "react-router-dom";

const Items = () => {
  // Redirect to inventory page as this component has been replaced
  return <Navigate to="/inventory" replace />;
};

export default Items;
