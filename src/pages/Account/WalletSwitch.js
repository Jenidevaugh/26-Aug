
import React, { useState, useEffect } from 'react';
import { createWalletClient, custom } from 'viem';
import { rollux, } from 'viem/chains';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FaCopy, FaFaucet, FaGamepad, FaInfo, FaPlay, FaShoppingCart } from "react-icons/fa";


const ConnectSwitch = () => {
  const [address, setAddress] = useState('');
  const [currentChainId, setCurrentChainId] = useState(null);
  const [isSwitchingChain, setIsSwitchingChain] = useState(false);
  const [isChainIncluded, setIsChainIncluded] = useState(false);


  const [anchorEl, setAnchorEl] = React.useState(null);

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


  const SwitchChain = ({ chainId }) => {
    const switchToSyscoinChain = async () => {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${rollux.id.toString(16)}` }],
        });
      } catch (error) {
        console.error('Error switching to Rollux Mainnet:', error);
      }
    };

    const addChain = async () => {
      try {
        await walletClient.addChain({ chain: rollux });
        setIsChainIncluded(true);
      } catch (error) {
        console.error('Error adding Syscoin Mainnet:', error);
      }
    };

    return (
      <div className='flex gap-2'>
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
      </div>
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
      const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;
      return shortAddress;
    }
    return '';
  };

  return (

    <div>
      <div>
        {address ? (
          <p> Address: {formatAddress(address)}  <br></br></p>

        ) : (
          <div>
            <p >Connected Address: {formatAddress(address)}.</p>
            <p >{(address ? 'Please connect wallet ' : ' Please connect wallet')}</p>

            {currentChainId !== rollux.id && <SwitchChain chainId={currentChainId} />}
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
          Swithch Chain 
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
          <MenuItem className='gap-1' onClick={handleClose}>Syscoin
            <span onClick={'switchToSyscoinChain'}>
            </span> <FaCopy />
            {/*Connect Wallet*/}
          </MenuItem>

          <MenuItem className='gap-1' onClick={handleClose}>ROllux
            <span onClick={'switchToSyscoinChain'}>
            </span> <FaFaucet />
          </MenuItem>

          <MenuItem className='gap-1' onClick={handleClose}>Chain 3
            <span onClick={'switchToSyscoinChain'}>
            </span> <FaGamepad />
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default ConnectSwitch;
