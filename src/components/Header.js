import "../styles/Header.css";
import styled from 'styled-components';

import { fantomTestnet } from 'wagmi/chains';
import { useAccount, useConnect, useDisconnect } from 'wagmi';


import React, { useState } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
// ... import your logo and any other icons or components you need

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const isMenuOpen = Boolean(menuAnchorEl);

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: 'var(--green)' }}>
      <Toolbar>
        {/* Logo */}
        <img src="logo/40p.png" />
        <div style={{ height: '40px' }}>
          <div className="logo-accompany-text">SAMPLE DAO</div>
        </div>

        {/* Navigation Options for Desktop */}
        {!isMobile && (
          <>
            <div style={{ width: '40px' }} />
            <Button color="inherit">Option 1</Button>
            <Button color="inherit">Option 2</Button>
            <Button color="inherit">Option 3</Button>
          </>
        )}

        {/* Spacer */}
        <div style={{ flexGrow: 1 }} />

        {/* Custom Buttons on the Right */}
        <Button color="inherit">Login</Button>
        <Button color="inherit">Signup</Button>

        {/* Hamburger Menu for Mobile */}
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>

      {/* Mobile Menu */}
      <Menu
        id="menu-appbar"
        anchorEl={menuAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Option 1</MenuItem>
        <MenuItem onClick={handleMenuClose}>Option 2</MenuItem>
        <MenuItem onClick={handleMenuClose}>Option 3</MenuItem>
        {/* ... other menu items */}
      </Menu>
    </AppBar>
  );
};

// #region Previous Header

const PreviousHeader = ({ retriesEnabled, setRetriesEnabled }) => {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();

  return (
    <header className="header">
      <ToggleModeButton onClick={() => { setRetriesEnabled(!retriesEnabled) }}>
        {retriesEnabled ? 'Proposals' : 'Retries'}
      </ToggleModeButton>
      <img src="logo/40p.png" />
      <ConnectButton
        onClick={() => {
          if (isConnected) disconnect();
          else connect({ connector: connectors[0], chainId: fantomTestnet.id });
        }}
      >
        {isConnected ? 'Disconnect ' + address.substring(0, 5) + '...' : 'Connect'}
      </ConnectButton>
    </header>
  );
};

const ConnectButton = styled.button`
  position: absolute;
  right: 4rem; 
  top: 50%; 
  transform: translateY(-50%); 
  
  background: transparent;
  border: 2px solid white;
  color: white;
  padding: 10px 20px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    color: var(--orange);
  }
`;

const ToggleModeButton = styled.button`
  position: absolute;
  left: 2rem; 
  top: 50%; 
  transform: translateY(-50%); 
  
  background: transparent;
  border: 2px solid white;
  color: white;
  padding: 10px 20px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    color: var(--orange);
  }
`;

// #endregion


// export default PreviousHeader;
export default Header;
