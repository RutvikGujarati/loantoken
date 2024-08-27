import React, { useEffect, useState, createContext } from 'react';
import MetaMaskOnboarding from '@metamask/onboarding';
import { ethers } from 'ethers';
import { useLocation } from 'react-router-dom';

export const Web3WalletContext = createContext();

export default function MetamskConnect({ children }) {
  const [userConnected, setUserConnected] = useState(false);
  const [accountAddress, setAccountAddress] = useState(ethers.constants.AddressZero);
  const [walletBalance, setWalletBalance] = useState('0');
  const [networkName, setNetworkName] = useState('');
  const [currencyName, setCurrencyName] = useState('');

  const onboarding = new MetaMaskOnboarding();
  const location = useLocation();

  const networkMapping = {
    '80001': { name: 'Polygon Mumbai', currency: 'MATIC' },
    '5': { name: 'Goerli Testnet', currency: 'ETH' },
    '56': { name: 'BSC Mainnet', currency: 'BNB' },
    '97': { name: 'BSC Testnet', currency: 'BNB' },
    '11155111': { name: 'Sepolia Testnet', currency: 'ETH' },
    '1': { name: 'Ethereum Mainnet', currency: 'ETH' },
    '137': { name: 'Polygon Mainnet', currency: 'MATIC' },
    '943': { name: 'Pulsechain Testnet', currency: 'PLS' },
    '369': { name: 'Pulsechain Mainnet', currency: 'PLS' },
  };

  const requiredNetworks = {
    '/PLS/mint': '369', // Pulsechain Mainnet
    '/PLS': '369',
    '/XEN': '369',
    '/DEFI': '369',
    '/TRADE': '369',
    '/PDXN': '369',
    '/PFENIX': '369',

    '/BNB/mint': '56', // BSC Mainnet
    '/bXEN': '56',
    '/BNB': '56',
    '/BXEN': '56',
    '/BDXN': '56',
    '/BFENIX': '56',

    '/polygon/mint': '137', // Polygon Mainnet
    '/matic': '137',
    '/mxen': '137',
    '/mdxn': '137',
    '/mfenix': '137',
  };

  const switchNetwork = async (networkId) => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: ethers.utils.hexValue(networkId) }],
        });
      } catch (error) {
        if (error.code === 4902) {
          // Network is not added to MetaMask. Add it automatically.
          try {
            const networkData = getNetworkData(networkId);
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [networkData],
            });
          } catch (addError) {
            console.error('Failed to add network to MetaMask:', addError.message);
          }
        } else {
          console.error('Failed to switch network:', error.message);
        }
      }
    }
  };

  // Helper function to retrieve network data
  const getNetworkData = (networkId) => {
    const networks = {
      '80001': {
        chainId: '0x13881',
        chainName: 'Polygon Mumbai',
        nativeCurrency: {
          name: 'MATIC',
          symbol: 'MATIC',
          decimals: 18,
        },
        rpcUrls: ['https://rpc-mumbai.matic.today'],
        blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
      },
      '5': {
        chainId: '0x5',
        chainName: 'Goerli Testnet',
        nativeCurrency: {
          name: 'Ethereum',
          symbol: 'ETH',
          decimals: 18,
        },
        rpcUrls: ['https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID'],
        blockExplorerUrls: ['https://goerli.etherscan.io'],
      },
      '56': {
        chainId: '0x38',
        chainName: 'BSC Mainnet',
        nativeCurrency: {
          name: 'BNB',
          symbol: 'BNB',
          decimals: 18,
        },
        rpcUrls: ['https://bsc-dataseed.binance.org/'],
        blockExplorerUrls: ['https://bscscan.com'],
      },
      '369': {
        chainId: '0x171',
        chainName: 'Pulsechain Mainnet',
        nativeCurrency: {
          name: 'PLS',
          symbol: 'PLS',
          decimals: 18,
        },
        rpcUrls: ['https://rpc.pulsechain.com'],
        blockExplorerUrls: ['https://scan.pulsechain.com'],
      },
      '137': {
        chainId: '0x89',
        chainName: 'Polygon Mainnet',
        nativeCurrency: {
          name: 'MATIC',
          symbol: 'MATIC',
          decimals: 18,
        },
        rpcUrls: ['https://polygon-mainnet.infura.io'],
        blockExplorerUrls: ['https://polygonscan.com/'],
      },
    };

    return networks[networkId];
  };

  const handleNetworkSwitch = async () => {
    const currentPath = location.pathname;

    for (const [route, networkId] of Object.entries(requiredNetworks)) {
      if (currentPath.startsWith(route)) {
        const currentNetwork = window.ethereum.networkVersion;
        if (currentNetwork !== networkId) {
          await switchNetwork(parseInt(networkId));
        }
        break;
      }
    }
  };

  const ProvidermetamaskLogin = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        const networkId = window.ethereum.networkVersion;

        if (networkMapping[networkId]) {
          setUserConnected(true);
          setAccountAddress(account);
          await getMetamaskBalance(account, networkId);
        } else {
          throw new Error('Unsupported network. Please switch to a supported network.');
        }
      } catch (error) {
        console.error('Failed to connect to MetaMask:', error.message);
      }
    } else {
      onboarding.startOnboarding();
    }
  };

  const getMetamaskBalance = async (account, networkId) => {
    try {
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [account, 'latest'],
      });
      setWalletBalance(ethers.utils.formatEther(balance));
      setNetworkName(networkMapping[networkId].name);
      setCurrencyName(networkMapping[networkId].currency);
    } catch (error) {
      console.error('Failed to retrieve wallet balance:', error.message);
    }
  };

  const getMetamaskAccount = async () => {
    const account = await ProvidermetamaskLogin();
    return account;
  };

  const disconnectUser = () => {
    setAccountAddress(ethers.constants.AddressZero);
    setUserConnected(false);
    setNetworkName('');
    setWalletBalance('0');
    setCurrencyName('');
  };

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', ProvidermetamaskLogin);
      window.ethereum.on('networkChanged', ProvidermetamaskLogin);
    }

    return () => {
      if (typeof window.ethereum !== 'undefined') {
        window.ethereum.removeListener('accountsChanged', ProvidermetamaskLogin);
        window.ethereum.removeListener('networkChanged', ProvidermetamaskLogin);
      }
    };
  }, []);

  useEffect(() => {
    handleNetworkSwitch();
  }, [location]);

  return (
    <Web3WalletContext.Provider
      value={{
        userConnected,
        accountAddress,
        networkName,
        walletBalance,
        currencyName,
        ProvidermetamaskLogin,
        disconnectUser,
        getMetamaskAccount,
      }}
    >
      {children}
    </Web3WalletContext.Provider>
  );
}
