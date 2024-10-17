import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const useAuth = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    const id = Cookies.get('token');
    if (id) {
      setIsAuthorized(true);
    }
    setCheckedAuth(true);
  }, []);

  return { isAuthorized, checkedAuth };
};

export default useAuth;