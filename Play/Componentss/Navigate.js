import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
 import { FaAddressCard, FaTable } from 'react-icons/fa';
import { FaChalkboardTeacher, FaStar } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

export default function SimpleBottomNavigation() {
   const navigate = useNavigate();
  const location = useLocation();

  const getValueFromPath = (path) => {
    switch (path) {
      case '/Play':
        return 0;
      case '/Tasks':
        return 1;
      case '/Leaderboard':
        return 2;
      default:
        return 0;
    }
  };

  const [value, setValue] = React.useState(getValueFromPath(location.pathname));

  const handleNavigation = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/Play');
        break;
      case 1:
        navigate('/Tasks');
        break;
      case 2:
        navigate('/Leaderboard');
        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    setValue(getValueFromPath(location.pathname));
  }, [location.pathname]);

  return (
    <div>

      <Box sx={{alignContent:'flex-start', height:70, padding:1 }}>
        <BottomNavigation showLabels value={value} onChange={handleNavigation}>
          <BottomNavigationAction label="Home" icon={<FaChalkboardTeacher />} />
          <BottomNavigationAction label="Tasks" icon={<FaTable />} />
          <BottomNavigationAction label="Leaderboard" icon={<FaAddressCard />} />
        </BottomNavigation>
      </Box>
    </div>
  );
}
