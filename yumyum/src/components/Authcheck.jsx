import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Authcheck = () => {
  const navigate = useNavigate();
  const [checkedToken, setCheckedToken] = useState(false);
  const [firstrender, setfirsetrender] = useState(false);

  useEffect(() => {
    const jwtToken = localStorage.getItem('authToken');

    if (!checkedToken) {
      if (jwtToken) {
        // Redirect to homepage if token exists
        navigate('/');
        setCheckedToken(true);
      }
     
    }
    if( !jwtToken && !firstrender)
    {
      navigate('/createuser');
      setfirsetrender(true);
    }
  }, [navigate, checkedToken]);

  return null;
}

export default Authcheck;
