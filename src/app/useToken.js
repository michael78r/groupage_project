import { loadIcon } from '@iconify/react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = tokenString;
    return userToken
  };
  const [token, setToken] = useState(getToken());

  const [isOpen, setIsOpen] = useState(false)

  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken));
    localStorage.setItem('lastActivity', Date.now());
    setToken(userToken.token);
  };

  const deleteToken = () => {
    localStorage.removeItem('token')
    // localStorage.removeItem('lastActivity')
    setToken(null)
  };

  const checkInactivity = () => {
    const lastActivity = localStorage.getItem('lastActivity')
    if (lastActivity) {
      const currentTime = Date.now();
      const timeDiff = currentTime - lastActivity;
      // const twoHours = 2 * 60 * 60 * 1000;
      const twoHours = 1 * 60 * 1000

      if (timeDiff > twoHours) {
        // deleteToken();
        Swal.fire({
          title: 'Session expirée',
          icon: 'warning',
          showCancelButton: false,
          showConfirmButton:false
          // confirmButtonText: 'Continuer',
        }).then(() => {
          window.location.href = "/login";
          setIsOpen(false)
        }).catch(() => {
          setIsOpen(false)
        })

        setIsOpen(true)

      }
    }
  };

  const updateLastActivity = () => {
    localStorage.setItem('lastActivity', Date.now())
  }


  // useEffect(() => {
  //   if ((localStorage.getItem('token')) && !isOpen) {
  //     updateLastActivity()

  //     window.addEventListener('mousemove', updateLastActivity)
  //     window.addEventListener('keydown', updateLastActivity)
  //     window.addEventListener('click', updateLastActivity)

  //     const intervalID = setInterval(checkInactivity, 60000)

  //     return () => {
  //       window.removeEventListener('mousemove', updateLastActivity)
  //       window.removeEventListener('keydown', updateLastActivity)
  //       window.removeEventListener('click', updateLastActivity)
  //       clearInterval(intervalID)
  //     }
  //   }
  // }, [isOpen])

  return {
    setToken: saveToken,
    token
  }
}


