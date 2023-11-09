import styled from 'styled-components';

import { moonbaseAlpha } from 'wagmi/chains';
import { useAccount, useConnect, useDisconnect, useSwitchNetwork } from 'wagmi';

import React, { useEffect, useState } from 'react';
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

import "../styles/Header.css";
import "../styles/Button.css";

const Header = ({ page, setPage }) => {
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

  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const { switchNetwork } = useSwitchNetwork();


  // Prompt switch to Moonbase Alpha if necessary
  useEffect(() => { if (address && switchNetwork) { 
    switchNetwork(moonbaseAlpha.id) 
  } }, [address]);

  return (
    <AppBar position="static" sx={{ bgcolor: 'var(--green)' }}>
      <Toolbar style={{ paddingLeft: '32px', paddingRight: '40px' }}>
        {/* Logo */}
        <img src="logo/40p.png" />
        <div style={{ height: '40px' }}>
          <div className="logo-accompany-text">SAMPLE DAO</div>
        </div>

        {/* Navigation Options for Desktop */}
        {!isMobile && (
          <>
            <div style={{ width: '40px' }} />
            <HeaderButton label="Propose" page={page} setPage={setPage} />
            <HeaderButton label="Retry" page={page} setPage={setPage} />
          </>
        )}

        {/* Spacer */}
        <div style={{ flexGrow: 1 }} />

        {/* Custom Buttons on the Right */}
        <button
          onClick={() => {
            if (isConnected) disconnect();
            else connect({ connector: connectors[0], chainId: moonbaseAlpha.id });
          }}
          className='glacis-button'
        >
          {isConnected ? 'Disconnect ' + address.substring(0, 5) + '...' : 'Connect'}
        </button>

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

const HeaderButton = ({ label, page, setPage }) => {
  const isActive = page === label;
  const activeClass = isActive ? 'activeButton' : '';
  
  return (
    <Button className={`headerButton ${activeClass}`} onClick={() => setPage(label)} color="inherit">
      {label}
    </Button>
  );
};

export default Header;
