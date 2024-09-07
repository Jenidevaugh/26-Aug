
import React, { useState, useEffect } from 'react';
import { createWalletClient, custom } from 'viem';
import { bsc, rollux, syscoin, } from 'viem/chains';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FaCopy, FaFaucet, FaGamepad, FaInfo, FaPlay, FaShoppingCart } from "react-icons/fa";
import { switchChain } from 'viem/actions';
import { http } from 'viem';
import { createPublicClient } from 'viem';
import { fallback } from 'viem';

const ConnectSwitch = () => {
  const [address, setAddress] = useState('');
  const [currentChainId, setCurrentChainId] = useState(null);
  const [isSwitchingChain, setIsSwitchingChain] = useState(false);
  const [isChainIncluded, setIsChainIncluded] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const publicClient = createPublicClient({
    chain: rollux,
    transport: fallback([
      http('https://rpc.rollux.com'),
      http('wss://rpc.rollux.com/wss'),
      http('https://rpc.ankr.com/rollux')
    ])
  });

  useEffect(() => {
    checkWalletConnection();

    if (window.ethereum) {
      window.ethereum.on('chainChanged', handleChainChanged);
      return () => {
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, []);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const walletClient = createWalletClient({
    chain: rollux,
    transport: custom(window.ethereum || window.web3.currentProvider),
  });

  useEffect(() => {
    checkWalletConnection();

    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, []);

  const handleChainChanged = (chainIdHex) => {
    const newChainId = parseInt(chainIdHex, 16);
    setCurrentChainId(newChainId);
  };

  const [isAddingChain, setIsAddingChain] = useState(false);


  //Switch Networks

  const switchToBSC = async () => {
    try {
      await walletClient.switchChain({ id: bsc.id });
      setCurrentChainId(bsc.id);
    } catch (error) {
      console.error('Error switching to BSC:', error);
    }
  };

  const switchToRollux = async () => {
    try {
      await walletClient.switchChain({ id: rollux.id });
      setCurrentChainId(rollux.id);
    } catch (error) {
      console.error('Error switching to Rollux:', error);
    }
  };

  const switchToSYS = async () => {
    try {
      await walletClient.switchChain({ id: syscoin.id });
      setCurrentChainId(syscoin.id);
    } catch (error) {
      console.error('Error switching to Syscoin:', error);
    }
  };



  const SwitchChain = ({ id }) => {
    const switchToSyscoinChain = async () => {
      try {

        await walletClient.switchChain({ id: rollux.id })

      } catch (error) {
        console.error('Error switching to Rollux Mainnet:', error);
      }
    };

    const addChain = async () => {
      try {
        await walletClient.addChain({ chain: rollux.id });
        setIsChainIncluded(true);
      } catch (error) {
        console.error('Error adding Syscoin Mainnet:', error);
      }
    };

    return (
      {/*  <div className='flex gap-2'>
      {!isChainIncluded && !isAddingChain ? (
          <button className='bg-black text-white border p-1 rounded-lg' onClick={addChain}>
            Switch to Rollux
          </button>
        ) : isChainIncluded && !isAddingChain ? (
          <button className='bg-black text-white border p-1 rounded-lg' onClick={switchToSyscoinChain}>
            Switch to Rollux
          </button>
        ) : (
          <p>Processing...</p>
        )}
      </div> */}
    );

  };

  const checkWalletConnection = async () => {
    try {
      if (window.ethereum || window.web3.currentProvider) {
        const chainId = await window.ethereum.request({
          method: 'eth_chainId',
        });

        setCurrentChainId(parseInt(chainId, 16));

        if (parseInt(chainId, 16) === rollux.id) {
          const accounts = await window.ethereum.request({
            method: 'eth_accounts',
          });

          if (accounts.length > 0) {
            const [address] = accounts;
            setAddress(address);
          }
          setIsChainIncluded(true);
        }
      } else {
        console.log('MetaMask is not installed.');
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  };

  const connectWallet = async () => {
    try {
      if (window.ethereum || window.web3.currentProvider) {
        setIsSwitchingChain(true);
        await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        const [address] = await walletClient.getAddresses();
        setAddress(address);
        setIsSwitchingChain(false);
      } else {
        console.log('MetaMask is not installed.');
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      setIsSwitchingChain(false);
    }
  };

  const formatAddress = (address) => {
    if (address) {
      const shortAddress = `${address.slice(0, 2)}...${address.slice(-4)}`;
      return shortAddress;
    }
    return '';
  };


  const getNetworkName = () => {
    switch (currentChainId) {
      case bsc.id:
        return 'BSC';
      case rollux.id:
        return 'Rollux';
      case syscoin.id:
        return 'Syscoin';
      default:
        return 'Unknown Network';
    }
  };

  return (

    <div>
      <div>
        {address ? (
          <p> Address: {formatAddress(address)}  <br/> Network: {getNetworkName()}</p>

        ) : (
          <div>
            <p >Connected Address: {formatAddress(address)}.</p>
            <p >{(address ? 'Please connect wallet ' : ' Please connect wallet')}</p>
           
 
            {(!currentChainId || currentChainId === rollux.id) && (
              <button className='button' onClick={connectWallet} disabled={isSwitchingChain}>
                {/*Connect Wallet*/}
              </button>
            )}
          </div>
        )}
      </div>

      <div>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Switch Chain
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem className='gap-1' onClick={() => { handleClose(); switchToSYS(); }}>
            Syscoin <FaCopy />
          </MenuItem>
          <MenuItem className='gap-1' onClick={() => { handleClose(); switchToRollux(); }}>
            Rollux <FaFaucet />
          </MenuItem>
          <MenuItem className='gap-1' onClick={() => { handleClose(); switchToBSC(); }}>
            BSC <FaGamepad />
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default ConnectSwitch;
