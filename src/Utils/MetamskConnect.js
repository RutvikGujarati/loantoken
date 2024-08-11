import React, { useEffect } from 'react'
import { useState } from 'react';
import { createContext } from 'react';
import MetaMaskOnboarding from '@metamask/onboarding'
import { ethers } from 'ethers';


export const Web3WalletContext = createContext();

export default function MetamskConnect({ children }) {


  const [userConnected, setUserConnected] = useState(false);
  const [accountAddress, setAccountAddress] = useState(ethers.constants.AddressZero);
  const [WalletBalance, setWalletBalance] = useState('0');
  const [networkName, setNetworkName] = useState('')
  const [currencyName, setCurrencyName] = useState('')
  const onboarding = new MetaMaskOnboarding();

  // console.log('accountAddress........',accountAddress)
  const ProvidermetamaskLogin = async (e) => {
    if (typeof window?.ethereum !== "undefined") {
      getMetamaskAccount().then(async (response) => {
        if (response) {
          setUserConnected(true);
          setAccountAddress(response);
          getMetamaskBalance(response);
        }
      }).catch((err) => { });

    }

  }

  const switchToPulsechainMainnet = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x171' }], // '0x171' is the hexadecimal representation of 369 for Pulsechain Mainnet
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x171',
                chainName: 'Pulsechain Mainnet',
                rpcUrls: ['https://rpc.pulsechain.com/'], // Replace with the actual RPC URL
                nativeCurrency: {
                  name: 'Pulse',
                  symbol: 'PLS',
                  decimals: 18,
                },
                blockExplorerUrls: ['https://explorer.pulsechain.com/'], // Replace with the actual block explorer URL
              },
            ],
          });
        } catch (addError) {
          console.error('Failed to add Pulsechain Mainnet to MetaMask:', addError);
        }
      }
    }
  };
  const disconnectUser = async () => {
    setAccountAddress('');
    setUserConnected(false);
    setNetworkName('');
    setWalletBalance('');
    setCurrencyName('')
  }


  const getMetamaskAccount = async () => {
    let metamaskAccounts;
    try {
      metamaskAccounts = await window?.ethereum?.request({
        method: "eth_requestAccounts",
      });
      // console.log(metamaskAccounts, "Metamask Account");
      if (window?.ethereum?.networkVersion == '369' || window?.ethereum?.networkVersion == '943' || window?.ethereum?.networkVersion == '56' || window?.ethereum?.networkVersion == '97' || window.ethereum?.networkVersion === "137") {
        return metamaskAccounts[0]
      } else {
        // const shouldSwitch = window.confirm('You are not connected to Pulsechain Mainnet. switch to Pulsechain Mainnet?');
        // if (shouldSwitch) {
        //   await switchToPulsechainMainnet();
        // }
        throw "Connect to Pulsechain Network"
      }
      // let balance = await window.ethereum.metaMask.getBalanceOf(metamaskAccounts[0])
      // console.log(balance, "metamask");
      console.log(metamaskAccounts)
    } catch (error) {
      console.error(error, "hi")
      // eslint-disable-next-line
      if (error.code == -32002) {
        window.alert('Please Manually connect to metamask')
      }
    }

  }

  const getMetamaskBalance = async (response) => {
    try {


      let balance = await window?.ethereum?.request({
        method: 'eth_getBalance',
        params: [await response, 'latest']
      }).then(balance => {
        if (window?.ethereum?.networkVersion == '80001') {
          setWalletBalance(ethers?.utils?.formatEther(balance || '0'))
          setNetworkName('Polygon Mumbai')
          setCurrencyName(`MATIC`)
        }
        else if (window?.ethereum?.networkVersion == '5') {
          setWalletBalance(ethers?.utils?.formatEther(balance || '0'))
          setNetworkName('Goerli Testnet')
          setCurrencyName(`ETH`)
        }
        else if (window?.ethereum?.networkVersion === '56') {
          setWalletBalance(ethers?.utils?.formatEther(balance || '0'))
          setNetworkName('BNB Mainnet')
          setCurrencyName(`BNB`)
        }
        else if (window?.ethereum?.networkVersion === '97') {
          setWalletBalance(ethers?.utils?.formatEther(balance || '0'))
          setNetworkName('BNB Testnet')
          setCurrencyName(`BNB`)
        }
        else if (window?.ethereum?.networkVersion == '11155111') {
          setWalletBalance(ethers?.utils?.formatEther(balance || '0'))
          setNetworkName('Sepolia Testnet')
          setCurrencyName(`ETH`)
        }
        else if (window?.ethereum?.networkVersion == '1') {
          setWalletBalance(ethers?.utils?.formatEther(balance || '0'))
          setNetworkName('Ethereum Mainnet')
          setCurrencyName(`ETH`)
        }
        else if (window?.ethereum?.networkVersion === '137') {
          setWalletBalance(ethers?.utils?.formatEther(balance || '0'))
          setNetworkName('Polygon Mainnet')
          setCurrencyName(`Matic`)
        }
        else if (window?.ethereum?.networkVersion == '943') {
          setWalletBalance(ethers?.utils?.formatEther(balance || '0'))
          setNetworkName('Pulsechain Testnet')
          setCurrencyName(`PLS`)
        }
        else if (window?.ethereum?.networkVersion == '369') {
          setWalletBalance(ethers?.utils?.formatEther(balance || '0'))
          setNetworkName('Pulsechain Mainnet')
          setCurrencyName(`PLS`)
        }

      }).catch(err => { })
    } catch (error) {

    }

  }

  useEffect(() => {
    if (typeof window?.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccountAddress(accounts[0]);
          getMetamaskBalance(accounts[0]);
        } else {
          disconnectUser();
        }
      });

      window.ethereum.on('networkChanged', (networkId) => {
        getMetamaskBalance(accountAddress);
      });
    }

    return () => {
      if (typeof window?.ethereum !== 'undefined') {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('networkChanged', handleNetworkChanged);
      }
    };
  }, [accountAddress]);

  const handleAccountsChanged = (accounts) => {
    if (accounts.length > 0) {
      setAccountAddress(accounts[0]);
      getMetamaskBalance(accounts[0]);
    } else {
      disconnectUser();
    }
  };

  const handleNetworkChanged = () => {
    getMetamaskBalance(accountAddress);
  };

  return (
    <>
      <Web3WalletContext.Provider value={{
        example: 'example',
        userConnected,
        accountAddress,
        networkName,
        WalletBalance,
        currencyName,
        ProvidermetamaskLogin,
        disconnectUser,
        getMetamaskAccount,
      }} >
        {children}
      </Web3WalletContext.Provider>
    </>
  )
}
