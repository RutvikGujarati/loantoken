import React, { createContext, useContext, useEffect, useState } from 'react'
import PSD_ABI_UP from '../Utils/ABI/PSD_ABI_UP.json'
// import PLS_abi from "../Utils/ABI/PLS_abi.json"
import State_abi from '../Utils/ABI/STATE_TOKEN_ABI_UP.json'
import DAVDEFI_abi from '../Utils/ABI/DAVDEFI_abi.json'
import BNBDAV_abi from '../Utils/ABI/BNBDav_abi.json'
import MATICDAV_abi from '../Utils/ABI/MATIC_abi.json'
import DAVMATIC_abi from '../Utils/ABI/DAVMATIC_abi.json'
import PLS_ABI from "../Utils/ABI/PLS_ABI.json"
import Matic_ABI from "../Utils/ABI/MATIC_abi.json"
import PDXN_ABI from "../Utils/ABI/PDXN_abi.json"
import pFENIX_abi from "../Utils/ABI/pFENIX_abi.json"
import { PSD_ADDRESS, bnbDAV, state_token, DAVDEFI, mDXN_token, mFENIX_token, loan_mainnet, rex, hex, ptgc, texan, watt, PFENIX_Address, PDXN_Address, PLS_ADDRESS, DAVMATIC, MATIC_contract, pDXN, pfenix, LOAN, HEX_TOKEN, REX_TOKEN, PTGC_TOKEN, Texan_TOKEN, Loan_mainnet_TOKEN, WATT_TOKEN, XEN, allInOnePopup, bDXN, FENIX, mDXN, mFENIX, mXEN, mXEN_token } from './ADDRESSES/Addresses';
import { Web3WalletContext } from './MetamskConnect';
import { ethers } from 'ethers';
export const functionsContext = createContext();

export default function Functions({ children }) {
    const { accountAddress } = useContext(Web3WalletContext)
    const [socket, setSocket] = useState(false);


    const [reward, setReward] = useState('0')
    const [depositedAmount, setDepositedAmount] = useState('0')

    const getProvider = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            return provider;
        } catch (error) {
            console.error('getProvider error:', error);
        }
    }
    const getContract = async (contractAddress, contractABI) => {
        try {
            const provider = await getProvider();
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            return contract;
        } catch (error) {
            console.error('getContract:', error);
        }
    };

    //{Minting contracts}
    const getStatetokenContract = async () => {
        return await getContract(state_token, State_abi);
    }
    const getDAVDEFIContract = async () => {
        return await getContract(DAVDEFI, DAVDEFI_abi);
    }
    const getBNBDAVContract = async () => {
        return await getContract(bnbDAV, BNBDAV_abi);
    }
    const getPolygonDAVContract = async () => {
        return await getContract(DAVMATIC, DAVMATIC_abi);
    }


    // {
    //Tokens for using approving
    //}
    const xenToken = async () => {
        return await getContract(XEN, State_abi);
    }
    const pDXNToken = async () => {
        return await getContract(pDXN, State_abi);
    }
    const bDXNToken = async () => {
        return await getContract(bDXN, BNBDAV_abi);
    }
    const BFENIXToken = async () => {
        return await getContract(FENIX, State_abi);
    }
    const mDXNToken = async () => {
        return await getContract(mDXN_token, State_abi);
    }
    const mFENIXToken = async () => {
        return await getContract(mFENIX_token, State_abi);
    }
    const mXENToken = async () => {
        return await getContract(mXEN_token, State_abi);
    }
    const HEXToken = async () => {
        return await getContract(HEX_TOKEN, State_abi);
    };
    const REXToken = async () => {
        return await getContract(REX_TOKEN, State_abi);
    };
    const TEXANToken = async () => {
        return await getContract(Texan_TOKEN, State_abi);
    };
    const PTGCToken = async () => {
        return await getContract(PTGC_TOKEN, State_abi);
    };
    const LOAN_MAINNET_Token = async () => {
        return await getContract(Loan_mainnet_TOKEN, State_abi);
    };
    const WATTToken = async () => {
        return await getContract(WATT_TOKEN, State_abi);
    };
    const pFenixToken = async () => {
        return await getContract(pfenix, State_abi);
    };

    //{Main  Contracts}
    const getHexContract = async () => {
        return await getContract(hex, PSD_ABI_UP);
    }
    const getRexContract = async () => {
        return await getContract(rex, PDXN_ABI);
    }
    const getPtgcContract = async () => {
        return await getContract(ptgc, PDXN_ABI);
    }
    const getTexanContract = async () => {
        return await getContract(texan, PLS_ABI);
    }
    const getWattContract = async () => {
        return await getContract(watt, PLS_ABI);
    };
    const getloanMainnetContract = async () => {
        return await getContract(loan_mainnet, PLS_ABI);
    };

    const getPLSContract = async () => {
        return await getContract(PLS_ADDRESS, PLS_ABI);
    }
    const getMATICContract = async () => {
        return await getContract(MATIC_contract, Matic_ABI);
    }

    const getPsdContract = async () => {
        return await getContract(PSD_ADDRESS, PSD_ABI_UP);
    };

    const getPDXNContract = async () => {
        return await getContract(PDXN_Address, PDXN_ABI);
    };

    const getPFENIXContract = async () => {
        return await getContract(PFENIX_Address, pFENIX_abi);
    };
    const getmDXNContract = async () => {
        return await getContract(mDXN, PDXN_ABI);
    };

    const getmFENIXContract = async () => {
        return await getContract(mFENIX, pFENIX_abi);
    };
    const getmXENContract = async () => {
        return await getContract(mXEN, pFENIX_abi);
    };


    const getParseEther = async (amount) => {
        try {
            amount = amount.replace(/,/g, '')
            const value = ethers.utils.parseEther(amount || '0').toString()
            console.log('getParseEther', amount, ' ', value)
            return value;
        } catch (error) {
            console.error('getParseEther:', error);
        }
    }
    const getFormatEther = async (amount) => {
        try {
            const value = ethers.utils.formatEther(amount || '0').toString()
            return value;
        } catch (error) {
            console.error('getFormatEther error:', error);
        }
    }
    const getPrice = async () => {
        try {
            const contract = await getPsdContract()
            const price = await contract?.price();
            const priceInStr = await price?.toString()
            console.log("price from functions", priceInStr)
            return priceInStr
        } catch (error) {
            console.error('getPrice error:', error);
        }
    }
    const getPLSPrice = async () => {
        try {
            const contract = await getPLSContract()
            const price = await contract?.price();
            const priceInStr = await price?.toString()
            return priceInStr
        } catch (error) {
            console.error('getPrice error:', error);
        }
    }

    const onlyPSDclaimed = async (address) => {
        try {
            const contract = await getPsdContract();
            const psdValue = await contract.getOnlyPSDClaimed();

            return psdValue;
        } catch (error) {
            console.error('getPSDclaimed error:', error);
        }
    }
    const onlyPLSPSDclaimed = async (address) => {
        try {
            const contract = await getPLSContract();
            const psdValue = await contract.getOnlyPSDClaimed();

            return psdValue;
        } catch (error) {
            console.error('getPSDclaimed error:', error);
        }
    }


    const getTimeStampForCreateValut = async () => {
        try {
            const contract = await getPsdContract();

            if (!contract) {
                console.error('Contract not available.');
                return; // Or handle the absence of the contract instance.
            }
            const daysTimeStamp = await contract.Deployed_Time();
            const timestampInSeconds = daysTimeStamp;
            const timestampInMilliseconds = timestampInSeconds * 1000;
            const currentTimeInMilliseconds = Date.now();
            const timeDifferenceInMilliseconds = currentTimeInMilliseconds - timestampInMilliseconds;
            const daysDifference = timeDifferenceInMilliseconds / (24 * 60 * 60 * 1000);
            const netValue = Math.ceil(daysDifference)
            return netValue;

        } catch (error) {
            console.error('getTimeStampForCreateValut:', error);
        }
    }

    const getPLSTimeStampForCreateValut = async () => {
        try {
            const contract = await getPLSContract();

            if (!contract) {
                console.error('Contract not available.');
                return; // Or handle the absence of the contract instance.
            }
            const daysTimeStamp = await contract.Deployed_Time();
            const timestampInSeconds = daysTimeStamp;
            const timestampInMilliseconds = timestampInSeconds * 1000;
            const currentTimeInMilliseconds = Date.now();
            const timeDifferenceInMilliseconds = currentTimeInMilliseconds - timestampInMilliseconds;
            const daysDifference = timeDifferenceInMilliseconds / (24 * 60 * 60 * 1000);
            const netValue = Math.ceil(daysDifference)
            return netValue;

        } catch (error) {
            console.error('getTimeStampForCreateValut:', error);
        }
    }
    const BalanceOfXenTokenContract = async (contractType = 'PSD') => {
        const contracts = {
            'PDXN': { getContract: pDXNToken, address: PDXN_Address },
            'BNB': { getContract: bDXNToken, address: PDXN_Address },
            'PFENIX': { getContract: pFenixToken, address: PFENIX_Address },
            'HEX': { getContract: HEXToken, address: hex },
            'mdxn': { getContract: mDXNToken, address: mDXN },
            'mfenix': { getContract: mFENIXToken, address: mFENIX },
            'mxen': { getContract: mXENToken, address: mXEN },
            'TEXAN': { getContract: TEXANToken, address: texan },
            'REX': { getContract: REXToken, address: rex },
            'PTGC': { getContract: PTGCToken, address: ptgc },
            'LOAN_M': { getContract: LOAN_MAINNET_Token, address: loan_mainnet },
            'WATT': { getContract: WATTToken, address: watt },
            'PSD': { getContract: xenToken, address: PSD_ADDRESS }
        };

        const { getContract, address } = contracts[contractType] || contracts['PSD'];

        try {
            const contract = await getContract();
            const balance = await contract.balanceOf(address);
            return ethers.utils.formatEther(balance);
        } catch (error) {
            console.error(`Error fetching balance for ${contractType}:`, error);
            return 0;
        }
    };

    const BalanceOfPLSContract = async () => {

        try {
            const contract = await getPLSContract()
            const balance = await contract.contractTokenBalance();
            const formatted = ethers.utils.formatEther(balance);
            console.log("balance of contract from function", formatted)
            return formatted;
        } catch (error) {
            console.log(error);
        }
    }
    const BalanceOfMATICContract = async () => {

        try {
            const contract = await getMATICContract()
            const balance = await contract.contractTokenBalance();
            const formatted = ethers.utils.formatEther(balance);
            console.log("balance of contract from function", formatted)
            return formatted;
        } catch (error) {
            console.log(error);
        }
    }

    const getTotalNumberOfReward = async () => {
        const contract = await getPsdContract();
        try {

            const profit = await contract?.getTotalTokenValueInVaults();
            // const price = await getPrice();
            // const dollarValueLocked = profit.mul(price);
            // Convert BigNumber to a string representation
            const bigNumberString = ethers.utils.formatEther(profit);

            // Convert BigNumber to JavaScript number
            const dollarValueLockedNumber = parseFloat(bigNumberString);

            // Set reward and return the number
            setReward(dollarValueLockedNumber);
            return dollarValueLockedNumber;
        } catch (err) {
            console.log(err)
        }
    }
    const getUserUsdValue = async (amount) => {
        try {
            let price = await getPrice();
            let formattedPrice = await ethers.utils.formatEther(price)
            let userUsdValue = await (Number(amount) * Number(formattedPrice))
            return userUsdValue
        } catch (error) {
            console.error('getUserUsdValue error:', error);
        }
    }

    const getDistributedTokens = async (accountAddress) => {
        try {
            let contract = await getPsdContract();

            const tokens = await contract.getDistributedTokens(accountAddress);

            // Convert the BigNumber values to readable format
            const PSDTokens = ethers.utils.formatUnits(tokens[0], 18); // Assuming 18 decimals for PSD token
            const PSTTokens = ethers.utils.formatUnits(tokens[1], 18);

            return {
                PSDTokens,
                PSTTokens
            };

        } catch (error) {
            console.log(error)
        }
    }
    const handleDeposit = async (amount) => {
        console.log('amountx:', amount);

        try {
            // allInOnePopup(null, 'Connecting...', 'Please wait for Depositing.', `OK`, null)
            allInOnePopup(null, 'Create a New Vault', null, `OK`, null)
            const parsedAmount = await getParseEther(amount);
            let contract = await getPLSContract();
            let depositTx = await contract.deposit({
                value: parsedAmount
            })
            await depositTx.wait();
            // allInOnePopup(`success`, `Successful Deposit`, null, `OK`, true)
            allInOnePopup(null, 'Done', null, `OK`, null)
            console.log('depositTx:', depositTx);
            setSocket(prevBool => !prevBool);
            return true
        } catch (error) {
            // allInOnePopup(`error`, `Error`, `An error occurred. Please try again.`, `OK`, true);
            allInOnePopup(null, 'Transaction Rejected', null, `OK`, null)
            console.error('handleDeposit error:', error);
        }
    }
    const handleDepositMATIC = async (amount) => {
        console.log('amountx:', amount);

        try {
            // allInOnePopup(null, 'Connecting...', 'Please wait for Depositing.', `OK`, null)
            allInOnePopup(null, 'Create a New Vault', null, `OK`, null)
            const parsedAmount = await getParseEther(amount);
            let contract = await getMATICContract();
            let depositTx = await contract.deposit({
                value: parsedAmount
            })
            await depositTx.wait();
            // allInOnePopup(`success`, `Successful Deposit`, null, `OK`, true)
            allInOnePopup(null, 'Done', null, `OK`, null)
            console.log('depositTx:', depositTx);
            setSocket(prevBool => !prevBool);
            return true
        } catch (error) {
            // allInOnePopup(`error`, `Error`, `An error occurred. Please try again.`, `OK`, true);
            allInOnePopup(null, 'Transaction Rejected', null, `OK`, null)
            console.error('handleDeposit error:', error);
        }
    }

    async function approveAndDeposit(amount, contractType = 'PSD') {
        try {
            const decimals = contractType === 'HEX' ? 8 : 18;
            const amountInWei = ethers.utils.parseUnits(amount, decimals);

            const contracts = {
                PSD: { token: xenToken, address: PSD_ADDRESS, contract: getPsdContract },
                mdxn: { token: mDXNToken, address: mDXN, contract: getmDXNContract },
                mfenix: { token: mFENIXToken, address: mFENIX, contract: getmFENIXContract },
                mxen: { token: mXENToken, address: mXEN, contract: getmXENContract },
                PDXN: { token: pDXNToken, address: PDXN_Address, contract: getPDXNContract },
                PFENIX: { token: pFenixToken, address: PFENIX_Address, contract: getPFENIXContract },
                HEX: { token: HEXToken, address: hex, contract: getHexContract },
                TEXAN: { token: TEXANToken, address: texan, contract: getTexanContract },
                REX: { token: REXToken, address: rex, contract: getRexContract },
                PTGC: { token: PTGCToken, address: ptgc, contract: getPtgcContract },
                LOAN: { token: LOAN_MAINNET_Token, address: loan_mainnet, contract: getloanMainnetContract },
                WATT: { token: WATTToken, address: watt, contract: getWattContract }
            };

            const { token, address, contract } = contracts[contractType] || contracts['PSD'];

            const contract1 = await token();
            if (!address) throw new Error(`No address found for contract type: ${contractType}`);

            const currentAllowance = await contract1.allowance(accountAddress, address);
            if (currentAllowance.lt(amountInWei)) {
                allInOnePopup(null, 'Step 1 - Token Approval', null, `OK`, null);
                const approveTx = await contract1.approve(address, amountInWei);
                await approveTx.wait();
            }

            allInOnePopup(null, 'Create New Auto-Vaults', null, `OK`, null);
            const depositContract = await contract();
            const depositTx = await depositContract.deposit(amountInWei);
            await depositTx.wait();

            allInOnePopup(null, 'Done', null, `OK`, null);
            console.log("Tokens deposited successfully");
            return true;
        } catch (error) {
            allInOnePopup(null, 'Transaction Rejected', null, `OK`, null);
            console.error("Error during token deposit:", error);
            return false;
        }
    }



    const buyTokens = async (quantity, price, tokenCount, contractType = "DAV") => {
        try {
            const contract = await (contractType === 'DAVDEFI' ? getDAVDEFIContract() :
                contractType === 'BNBDAV' ? getBNBDAVContract() :
                    contractType === 'DAVMATIC' ? getPolygonDAVContract() :
                        getStatetokenContract());

            console.log("selected contract for mint",contract.address);  // Debugging step

            allInOnePopup(null, `Minting ${contractType}`, null, `OK`, null);

            const value = ethers.utils.parseEther(price.toString());

            let BuyTx;
            if (contractType === 'BNBDAV') {
                const mintFunction = tokenCount === 2 ? 'MintTwoBNBTokens' : tokenCount === 5 ? 'MintFiveBNBTokens' : tokenCount === 8 ? 'MintEightBNBTokens' : 'MintThirteenBNBTokens';
                BuyTx = await contract[mintFunction](quantity, { value });
            } else if (contractType === 'DAVMATIC') {
                const mintFunction = tokenCount === 2 ? 'MintTwoPOLYGONTokens' : tokenCount === 5 ? 'MintFivePOLYGONTokens' : tokenCount === 8 ? 'MintEightPOLYGONTokens' : 'MintThirteenPOLYGONTokens';
                console.log(`Calling function: ${mintFunction}`);  // Debugging step

                BuyTx = await contract[mintFunction](quantity, { value });
            } else if (contractType === 'DAVDEFI') {
                const mintFunction = tokenCount === 2 ? 'MintTwoPLSTokens' : tokenCount === 5 ? 'MintFivePLSTokens' : tokenCount === 8 ? 'MintEightPLSTokens' : 'MintThirteenPLSTokens';
                BuyTx = await contract[mintFunction](quantity, { value });
            } else {
                const mintFunction = tokenCount === 2 ? 'MintTwoPLSTokens' : tokenCount === 5 ? 'MintFivePLSTokens' : tokenCount === 8 ? 'MintEightPLSTokens' : 'MintThirteenPLSTokens';
                BuyTx = await contract[mintFunction](quantity, { value });
            }

            await BuyTx.wait();

            allInOnePopup(null, 'Successfully Minted', null, `OK`, null);
            setSocket(prevBool => !prevBool);
            return true;
        } catch (error) {
            allInOnePopup(null, 'Transaction Rejected', null, `OK`, null);
            console.error(error);
            return false;
        }
    };


    // Usage:
    // buyTokens(quantity, price, 2, 'BNBDAV');
    // buyTokens(quantity, price, 5, 'DAVMATIC');
    // buyTokens(quantity, price, 8, 'DAV');
    // buyTokens(quantity, price, 13, 'DAVDEFI');



    const totalSupply = async (contractType = "DAV") => {
        let contract;
        switch (contractType) {
            case 'DAVDEFI':
                contract = await getDAVDEFIContract();
                break;
            case 'BNBDAV':
                contract = await getBNBDAVContract();
                break;
            case 'DAVMATIC':
                contract = await getPolygonDAVContract();
                break;
            case 'DAV':
            default:
                contract = await getStatetokenContract();
                break;
        }
        try {
            const totalSupply = contract.totalSupply();
            return totalSupply;
        } catch (error) {
            console.log(error)
        }
    }

    const mintWithToken = async (quantity, price, tokenType, contractType = "DAVDEFI") => {
        try {
            allInOnePopup(null, 'Step 1 - Approving Mint', null, `OK`, null);

            // Get the correct token contract based on the tokenType
            let contract;
            let approveAddress;
            let mintFunction;

            switch (tokenType) {
                case 'PDXN':
                    contract = await pDXNToken();
                    approveAddress = state_token;
                    mintFunction = 'mintWithPDXN';
                    break;
                case 'BDXN':
                    contract = await bDXNToken();
                    approveAddress = bnbDAV;
                    mintFunction = 'mintWithBDXN';
                    break;
                case 'MDXN':
                    contract = await mDXNToken();
                    approveAddress = DAVMATIC;
                    mintFunction = 'mintWithMDXN';
                    break;
                case 'HEX':
                    contract = await HEXToken();
                    approveAddress = DAVDEFI;
                    mintFunction = 'MintOneHEX';
                    break;
                case 'TEXAN':
                    contract = await TEXANToken();
                    approveAddress = DAVDEFI;
                    mintFunction = 'MintOneTEXAN';
                    break;
                case 'LOAN':
                    contract = await LOAN_MAINNET_Token();
                    approveAddress = DAVDEFI;
                    mintFunction = 'MintOneLOAN';
                    break;
                case 'PTGC':
                    contract = await PTGCToken();
                    approveAddress = DAVDEFI;
                    mintFunction = 'MintOnePTGC';
                    break;
                case 'WATT':
                    contract = await WATTToken();
                    approveAddress = DAVDEFI;
                    mintFunction = 'MintOneWATT';
                    break;
                case 'REX':
                    contract = await REXToken();
                    approveAddress = DAVDEFI;
                    mintFunction = 'MintOneREX';
                    break;
                default:
                    throw new Error("Unknown token type");
            }
            // Approve the transaction
            let value = ethers.utils.parseEther(price.toString());

            const approveTx = await contract.approve(approveAddress, value);
            await approveTx.wait();

            allInOnePopup(null, `Step 2 - Minting ${contractType}`, null, `OK`, null);

            // Get the correct state contract based on contractType
            let state;
            if (contractType === "DAV") {
                state = await getStatetokenContract();
            } else if (contractType === "DAVDEFI") {
                state = await getDAVDEFIContract();
            } else if (contractType === "BNBDAV") {
                state = await getBNBDAVContract();
            } else if (contractType === "DAVMATIC") {
                state = await getPolygonDAVContract();
            }

            // Call the mint function
            const BuyTx = await state[mintFunction](quantity);
            await BuyTx.wait();

            allInOnePopup(null, 'Successfully Minted', null, `OK`, null);
            setSocket(prevBool => !prevBool);
            return true;
        } catch (error) {
            allInOnePopup(null, 'Transaction Rejected', null, `OK`, null);
            console.log(error);
            return false;
        }
    };

    const mintWithPDXN = async (quantity, price) => {
        return mintWithToken(quantity, price, 'PDXN');
    };
    const mintWithBDXN = async (quantity, price) => {
        return mintWithToken(quantity, price, 'BDXN');
    }
    const mintWithMDXN = async (quantity, price) => {
        return mintWithToken(quantity, price, 'MDXN');
    }
    const mintWithHEX = async (quantity, price) => {
        try {
            allInOnePopup(null, 'Step 1 - Approving Mint', null, `OK`, null);

            const contract = await HEXToken();
            const state = await getDAVDEFIContract();

            const value = ethers.BigNumber.from(price).mul(ethers.BigNumber.from(10).pow(8));

            const approveTx = await contract.approve(DAVDEFI, value);
            await approveTx.wait();

            allInOnePopup(null, 'Step 2 - Minting DAVDEFI', null, `OK`, null);

            let BuyTx = await state.MintOneHEX(quantity);
            await BuyTx.wait();

            allInOnePopup(null, 'Successfully Minted', null, `OK`, null);
            setSocket(prevBool => !prevBool);
            return true;
        } catch (error) {
            allInOnePopup(null, 'Transaction Rejected', null, `OK`, null);
            console.log(error);
        }
    };
    const mintWithTEXAN = async (quantity, price) => {
        return mintWithToken(quantity, price, 'TEXAN');
    }
    const mintWithLOAN = async (quantity, price) => {
        return mintWithToken(quantity, price, 'LOAN');
    }
    const mintWithPTGC = async (quantity, price) => {
        return mintWithToken(quantity, price, 'PTGC');
    }
    const mintWithWATT = async (quantity, price) => {
        return mintWithToken(quantity, price, 'WATT');
    }
    const mintWithREX = async (quantity, price) => {
        return mintWithToken(quantity, price, 'REX');
    }


    const mintWithPFENIX = async (quantity, price, contractType = "DAV") => {
        let state, contractAddress;
        switch (contractType) {
            case 'BNBDAV':
                state = await getBNBDAVContract();
                contractAddress = bnbDAV;
                break;
            case 'DAVMATIC':
                state = await getPolygonDAVContract();
                contractAddress = DAVMATIC;
                break;
            case 'DAV':
            default:
                state = await getStatetokenContract();
                contractAddress = state_token
                break;
        }
        try {
            allInOnePopup(null, 'Step 1 - Approving Mint', null, `OK`, null)

            let contract;
            if (contractType === 'BNBDAV') {
                contract = await BFENIXToken(); // Use BFENIXToken for BNBDAV
            } else if (contractType === 'DAVMATIC') {
                contract = await mFENIXToken();
            }
            else {
                contract = await pFenixToken(); // Use pFenixToken for DAV
            }

            const value = ethers.utils.parseEther(price.toString());

            const approveTx = await contract.approve(contractAddress, value);
            await approveTx.wait();

            allInOnePopup(null, 'Step 2 - Minting DAVPLS', null, `OK`, null)

            let BuyTx = await state.MintWIthPFNIX(
                quantity
            )
            await BuyTx.wait();
            allInOnePopup(null, 'Successfully Minted', null, `OK`, null)
            setSocket(prevBool => !prevBool);
            return true
        } catch (error) {
            allInOnePopup(null, 'Transaction Rejected', null, `OK`, null)

            console.log(error)
        }
    }

    const isHolder = async (contractType) => {
        let state;
        switch (contractType) {
            case 'DAVDEFI':
                state = await getDAVDEFIContract();
                break;
            case 'DAVBNB':
                state = await getBNBDAVContract();
                break;
            case 'DAVMATIC':
                state = await getPolygonDAVContract();
                break;
            case 'DAV':
            default:
                state = await getStatetokenContract();
                break;
        }
        try {
            if (!state) {
                throw new Error("Contract is not initialized");
            }

            console.log("account address from function", accountAddress)
            let isHoldingTokens = await state.isHolder(
                // "0x52886846db6c7f159f0262ebECD6203C72Dda9E8"
                accountAddress
            )
            return isHoldingTokens
        } catch (error) {

            console.log(error)
        }
    }
    const isDAVDEFIHolder = async () => {

        let state = await getDAVDEFIContract();
        try {
            if (!state) {
                throw new Error("Contract is not initialized");
            }

            console.log("account address from function", accountAddress)
            let isHoldingTokens = await state.isHolder(
                // "0x52886846db6c7f159f0262ebECD6203C72Dda9E8"
                accountAddress
            )
            return isHoldingTokens
        } catch (error) {

            console.log(error)
        }
    }

    const checkDeposited = () => {
        const depositAddress = "0x3Bdbb84B90aBAf52814aAB54B9622408F2dCA483"
        if (depositAddress === accountAddress) {
            return true;
        }
    }

    const holdTokens = async (accountAddress, contractType = "DAV") => {
        let contract;
        switch (contractType) {
            case 'DAVDEFI':
                contract = await getDAVDEFIContract();
                break;
            case 'BNBDAV':
                contract = await getBNBDAVContract();
                break;
            case 'DAVMATIC':
                contract = await getMATICContract();
                break;
            case 'PSD':
            default:
                contract = await getStatetokenContract();
                break;
        }
        try {
            if (!contract) {
                throw new Error("Contract is not initialized");
            }
            const holdTokens = await contract.balanceOf(accountAddress); // Use balanceOf instead of balanceOfUser
            console.log("holdsssss tokens", holdTokens)
            return holdTokens;
        } catch (error) {
            console.log(error);
        }
    };
    const getuserAllDetails = async (contractType = 'PSD') => {
        let contract;
        switch (contractType) {
            case 'PDXN':
                contract = await getPDXNContract();
                break;
            case 'mdxn':
                contract = await getmDXNContract();
                break;
            case 'mfenix':
                contract = await getmFENIXContract();
                break;
            case 'mxen':
                contract = await getmXENContract();
                break;
            case 'PFENIX':
                contract = await getPFENIXContract();
                break;
            case 'PLS':
                contract = await getPLSContract();
                break;
            case 'MATIC':
                contract = await getMATICContract();
                break;
            case 'HEX':
                contract = await getHexContract();
                break;
            case 'TEXAN':
                contract = await getTexanContract();
                break;
            case 'REX':
                contract = await getRexContract();
                break;
            case 'PTGC':
                contract = await getPtgcContract();
                break;
            case 'LOAN_M':
                contract = await getloanMainnetContract();
                break;
            case 'WATT':
                contract = await getWattContract();
                break;
            case 'PSD':
            default:
                contract = await getPsdContract();
                break;
        }
        try {
            const userDetails = await contract.getUserAutoVaults();
            console.log("userDetails", userDetails);
            return { userDetails };
        } catch (error) {
            console.log(error);
        }
    };

    const getTotalMaxLimits = async () => {
        try {
            const contract = await getStatetokenContract();
            const maxLimits = await contract.getLimitOfAllButtons();

            // Destructure the returned array
            const [pdxnMinted, pFENIXMinted, PLSTWOTokenMinted, PLSFIVETokenMinted, PLSEightTokenMinted, PLSThirteenTokenMinted] = maxLimits;

            // Convert BigNumber to string
            const pdxnMintedStr = ethers.utils.formatEther(pdxnMinted.toString());
            const pFENIXMintedStr = ethers.utils.formatEther(pFENIXMinted.toString());
            const PLSTWOTokenMintedStr = ethers.utils.formatEther(PLSTWOTokenMinted.toString());
            const PLSFIVETokenMintedStr = ethers.utils.formatEther(PLSFIVETokenMinted.toString());
            const PLSEightTokenMintedStr = ethers.utils.formatEther(PLSEightTokenMinted.toString());
            const PLSThirteenTokenMintedStr = ethers.utils.formatEther(PLSThirteenTokenMinted.toString());

            console.log("PDXN Minted:", pdxnMintedStr);
            console.log("PFENIX Minted:", pFENIXMintedStr);
            console.log("PLS Two Token Minted:", PLSTWOTokenMintedStr);
            console.log("PLS Five Token Minted:", PLSFIVETokenMintedStr);
            console.log("PLS Eight Token Minted:", PLSEightTokenMintedStr);
            console.log("PLS Thirteen Token Minted:", PLSThirteenTokenMintedStr);

            return {
                pdxnMinted: pdxnMintedStr,
                pFENIXMinted: pFENIXMintedStr,
                PLSTWOTokenMinted: PLSTWOTokenMintedStr,
                PLSFIVETokenMinted: PLSFIVETokenMintedStr,
                PLSEightTokenMinted: PLSEightTokenMintedStr,
                PLSThirteenTokenMinted: PLSThirteenTokenMintedStr
            };
        } catch (error) {
            console.log(error);
        }
    }


    const getTotalMintedTokens = async () => {
        try {
            const contract = await getStatetokenContract();
            const totalSupply = await contract.totalSupply();
            const formattedTotalSupply = ethers.utils.formatEther(totalSupply);
            return formattedTotalSupply;
        } catch (error) {
            console.error('Error getting total minted tokens:', error);
            throw error;
        }
    };
    const handleDepositAutovault = async (contractType = 'PSD') => {
        let contract;
        switch (contractType) {
            case 'PDXN':
                contract = await getPDXNContract();
                break;
            case 'PLS':
                contract = await getPLSContract();
                break;
            case 'mdxn':
                contract = await getmDXNContract();
                break;
            case 'mfenix':
                contract = await getmFENIXContract();
                break;
            case 'mxen':
                contract = await getmXENContract();
                break;
            case 'PFENIX':
                contract = await getPFENIXContract();
                break;
            case 'HEX':
                contract = await getHexContract();
                break;
            case 'TEXAN':
                contract = await getTexanContract();
                break;
            case 'REX':
                contract = await getRexContract();
                break;
            case 'PTGC':
                contract = await getPtgcContract();
                break;
            case 'LOAN_M':
                contract = await getloanMainnetContract();
                break;
            case 'WATT':
                contract = await getWattContract();
                break;
            case 'PSD':
            default:
                contract = await getPsdContract();
                break;
        }
        try {
            allInOnePopup(null, 'Process Auto-Vault', null, `OK`, null);

            // Estimate gas manually to get more information

            let depositTx = await contract.depositAndAutoVaults();

            await depositTx.wait();
            allInOnePopup(null, 'Done', null, `OK`, null);
            console.log('depositTx:', depositTx);
            setSocket(prevBool => !prevBool);
            return true;
        } catch (error) {
            allInOnePopup(null, 'Transaction Rejected', null, `OK`, null);
            console.error('handleDeposit error:', error);
        }
    }
    const handleDepositAutovaults = async (amount, contractType = 'PLS') => {
        console.log('amountx:', amount);

        try {
            allInOnePopup(null, 'Create a New Vault', null, `OK`, null);
            let contract
            const parsedAmount = await getParseEther(amount);
            if (contractType === "PLS") {

                contract = await getPLSContract();
            } else {
                contract = await getMATICContract();
            }

            // Estimate gas manually to get more information
            let gasEstimate;
            try {
                gasEstimate = await contract.estimateGas.depositAndAutoVaults({
                    value: parsedAmount
                });
                console.log('Estimated gas:', gasEstimate.toString());
            } catch (gasError) {
                console.error('Gas estimation failed:', gasError);
                allInOnePopup(null, 'Gas estimation failed', null, `OK`, null);
                return;
            }

            let depositTx = await contract.depositAndAutoVaults({
                value: parsedAmount,
                gasLimit: gasEstimate // Use the manually estimated gas limit
            });

            await depositTx.wait();
            allInOnePopup(null, 'Done', null, `OK`, null);
            console.log('depositTx:', depositTx);
            setSocket(prevBool => !prevBool);
            return true;
        } catch (error) {
            allInOnePopup(null, 'Transaction Rejected', null, `OK`, null);
            console.error('handleDeposit error:', error);
        }
    }
    const fetchAutoVaultAmount = async (contractType = 'PSD') => {
        let contract;
        switch (contractType) {
            case 'PDXN':
                contract = await getPDXNContract();
                break;
            case 'mdxn':
                contract = await getmDXNContract();
                break;
            case 'mfenix':
                contract = await getmFENIXContract();
                break;
            case 'mxen':
                contract = await getmXENContract();
                break;
            case 'PFENIX':
                contract = await getPFENIXContract();
                break;
            case 'HEX':
                contract = await getHexContract();
                break;
            case 'TEXAN':
                contract = await getTexanContract();
                break;
            case 'REX':
                contract = await getRexContract();
                break;
            case 'PTGC':
                contract = await getPtgcContract();
                break;
            case 'LOAN':
                contract = await getloanMainnetContract();
                break;
            case 'WATT':
                contract = await getWattContract();
                break;
            case 'Matic':
                contract = await getMATICContract();
                break;
            case 'PSD':
            default:
                contract = await getPsdContract();
                break;
        }
        try {
            if (!accountAddress) {
                throw new Error("Address is required");
            }

            let autoVaultAmount = await contract.getAutovaults(accountAddress);
            let parsedAmount = ethers.utils.formatEther(autoVaultAmount);

            console.log(`AutoVault amount for ${contractType}:`, parsedAmount);
            return parsedAmount;
        } catch (error) {
            console.error(`fetchAutoVaultAmount error for ${contractType}:`, error);
            return "0"; // Return "0" as a string to indicate an error or absence of value
        }
    };



    const fetchTotalAV = async (contractType = 'PSD') => {
        let contract;
        switch (contractType) {
            case 'PDXN':
                contract = await getPDXNContract();
                break;
            case 'mdxn':
                contract = await getmDXNContract();
                break;
            case 'mfenix':
                contract = await getmFENIXContract();
                break;
            case 'mxen':
                contract = await getmXENContract();
                break;
            case 'PFENIX':
                contract = await getPFENIXContract();
                break;
            case 'HEX':
                contract = await getHexContract();
                break;
            case 'TEXAN':
                contract = await getTexanContract();
                break;
            case 'REX':
                contract = await getRexContract();
                break;
            case 'PTGC':
                contract = await getPtgcContract();
                break;
            case 'LOAN_M':
                contract = await getloanMainnetContract();
                break;
            case 'WATT':
                contract = await getWattContract();
                break;
            case 'PLS':
                contract = await getPLSContract();
                break;
            case 'matic':
                contract = await getMATICContract();
                break;
            case 'PSD':
            default:
                contract = await getPsdContract();
                break;
        }
        try {
            let autoVaultAmount = await contract.getTotalAutoVaults();
            let parsedAmount = ethers.utils.formatEther(autoVaultAmount);


            return parsedAmount;
        } catch (error) {
            console.error('fetchAutoVaultAmount error:', error);
            return "0"; // Return "0" as a string to indicate an error or absence of value
        }
    };

    const fetchPLSAutoVaultAmount = async (address) => {
        try {
            if (!address) {
                throw new Error("Address is required");
            }

            let contract = await getPLSContract(); // Replace getPsdContract with the function to get your contract instance
            let autoVaultAmount = await contract.getAutovaults(address);
            let parsedAmount = ethers.utils.formatEther(autoVaultAmount);

            console.log("AutoVault amount:", parsedAmount);
            return parsedAmount;
        } catch (error) {
            console.error('fetchAutoVaultAmount error:', error);
            return "0"; // Return "0" as a string to indicate an error or absence of value
        }
    };
    const fetchMaticAutoVaultAmount = async (address) => {
        try {
            if (!address) {
                throw new Error("Address is required");
            }

            let contract = await getMATICContract(); // Replace getPsdContract with the function to get your contract instance
            let autoVaultAmount = await contract.getAutovaults(address);
            let parsedAmount = ethers.utils.formatEther(autoVaultAmount);

            console.log("AutoVault amount:", parsedAmount);
            return parsedAmount;
        } catch (error) {
            console.error('fetchAutoVaultAmount error:', error);
            return "0"; // Return "0" as a string to indicate an error or absence of value
        }
    };



    const getProtocolFee = async (address) => {
        if (address) {
            try {
                let contract = await getPsdContract()
                let protocolFee = await contract.getProtocolFee(address)
                let protocolAmount = await protocolFee?.protocolAmount
                let formattedValue = await getFormatEther(protocolAmount)
                let holdTokens = await protocolFee?.holdTokens
                let formatted_holdTokens = await getFormatEther(holdTokens)
                return { protocolAmount: Number(formattedValue), holdTokens: Number(formatted_holdTokens) }
            } catch (error) {
                console.error('getProtocolFee error:', error);
            }
        }
    }
    const getPLSProtocolFee = async (address) => {
        if (address) {
            try {
                let contract = await getPLSContract()
                let protocolFee = await contract.getProtocolFee(address)
                let protocolAmount = await protocolFee?.protocolAmount
                let formattedValue = await getFormatEther(protocolAmount)
                let holdTokens = await protocolFee?.holdTokens
                let formatted_holdTokens = await getFormatEther(holdTokens)
                return { protocolAmount: Number(formattedValue), holdTokens: Number(formatted_holdTokens) }
            } catch (error) {
                console.error('getProtocolFee error:', error);
            }
        }
    }


    const getOnlyProtocolFee = async (address) => {
        if (address) {
            try {
                let contract = await getPsdContract();
                let protocolFee = await contract.getProtocolFee(address)
                let protocolAmount = await protocolFee?.protocolAmount
                let formattedValue = await getFormatEther(protocolAmount)
                return formattedValue;
            } catch (error) {
                console.error('getProtocolFee error:', error);
            }
        }
    }
    const handle_Claim_Protocol_Fee = async (address) => {
        if (address) {
            let contract = await getPsdContract()
            let protocolFee = await contract.getProtocolFee(address)
            let protocolAmount = await protocolFee?.protocolAmount
            let formattedValue = await getFormatEther(protocolAmount)
            console.log('protocol fee:', Number(formattedValue));

            if (0 >= Number(formattedValue)) {
                // allInOnePopup(`info`, `Insufficient Balance`, `You don't have protocol fee for claim.`, `OK`, true)
                allInOnePopup(null, `You don't have protocol fee for claim.`, null, `OK`, null)
                return
            }
            allInOnePopup(null, 'Processing Claim', null, `OK`, null)

            try {
                let claimProtocolFee = await contract.claimProtoColFees();
                await claimProtocolFee.wait()
                // allInOnePopup(`success`, `Successful Claimed`, null, `OK`, true)
                allInOnePopup(null, `Successful Claimed`, null, `OK`, null)
                console.log('claimProtocolFee:', claimProtocolFee);
                setSocket(prevBool => !prevBool);
            } catch (error) {
                // allInOnePopup(`error`, `Error`, `An error occurred. Please try again.`, `OK`, true);
                allInOnePopup(null, `An error occurred. Please try again.`, null, `OK`, null)
                console.error('handle_Claim_Protocol_Fee error:', error);
            }
        }
    }

    const getParityReached = async (address) => {
        if (address) {
            try {
                // Get the user's deposited PST tokens
                let contract = await getPsdContract();
                let isParityReachedOrExceed = await contract.isParityReachedOrExceeded(address);
                console.log(`isParityReachedOrExceed for ${address}:`, isParityReachedOrExceed);

                // Get previous parity state from session storage
                const parityStateKey = `parityState_${address}`;
                const previousParityState = sessionStorage.getItem(parityStateKey);
                console.log(`previousParityState for ${address}:`, previousParityState);

                // Determine the new parity state
                let newParityState = isParityReachedOrExceed ? 'reached' : 'not_reached';
                console.log(`newParityState for ${address}:`, newParityState);

                // Show the popup only if the parity state has changed to 'reached'
                if (newParityState === 'reached' && previousParityState !== 'reached') {
                    // allInOnePopup(null, "The 10% parity fee will stop once the user reaches token parity", null, `OK`, null);
                    sessionStorage.setItem(parityStateKey, 'reached');
                } else if (newParityState === 'not_reached' && previousParityState !== 'not_reached') {
                    // Clear session storage if parity is not reached or exceeded
                    sessionStorage.setItem(parityStateKey, 'not_reached');
                }

                // Return whether token parity is reached or exceeded
                return { isParityReachedOrExceed };

            } catch (error) {
                console.error('getParityReached error:', error);
            }
        }
    };
    const getPLSParityReached = async (address) => {
        if (address) {
            try {
                // Get the user's deposited PST tokens
                let contract = await getPLSContract();
                let isParityReachedOrExceed = await contract.isParityReachedOrExceeded(address);
                console.log(`isParityReachedOrExceed for ${address}:`, isParityReachedOrExceed);

                // Get previous parity state from session storage
                const parityStateKey = `parityState_${address}`;
                const previousParityState = sessionStorage.getItem(parityStateKey);
                console.log(`previousParityState for ${address}:`, previousParityState);

                // Determine the new parity state
                let newParityState = isParityReachedOrExceed ? 'reached' : 'not_reached';
                console.log(`newParityState for ${address}:`, newParityState);

                // Show the popup only if the parity state has changed to 'reached'
                if (newParityState === 'reached' && previousParityState !== 'reached') {
                    // allInOnePopup(null, "The 10% parity fee will stop once the user reaches token parity", null, `OK`, null);
                    sessionStorage.setItem(parityStateKey, 'reached');
                } else if (newParityState === 'not_reached' && previousParityState !== 'not_reached') {
                    // Clear session storage if parity is not reached or exceeded
                    sessionStorage.setItem(parityStateKey, 'not_reached');
                }

                // Return whether token parity is reached or exceeded
                return { isParityReachedOrExceed };

            } catch (error) {
                console.error('getParityReached error:', error);
            }
        }
    };


    const handle_Claim_Parity_Tokens = async (address) => {
        if (address) {
            try {
                let ParityShareTokensDetail = await getParityDollarClaimed(address)
                let parityClaimableAmount = ParityShareTokensDetail?.parityClaimableAmount
                let parityClaimableAmountFormatted = await getFormatEther(parityClaimableAmount)

                if (0 >= Number(parityClaimableAmountFormatted)) {
                    // allInOnePopup(`info`, `Insufficient Balance`, `You don't have parity tokens for claim.`, `OK`, true)
                    allInOnePopup(null, `You don't have parity tokens for claim.`, null, `OK`, null)
                    return
                }
                // allInOnePopup(null, 'Processing Claim', `Please wait for Claiming Parity Tokens : ${parityClaimableAmountFormatted + ' ' + currencyName}. `, `OK`, null)
                allInOnePopup(null, 'Processing Claim', null, `OK`, null)
                let contract = await getPsdContract()
                let claimParityAmount_Tx = await contract.claimParityAmount()
                await claimParityAmount_Tx.wait()
                // allInOnePopup(`success`, `Successful Claimed`, null, `OK`, true)
                allInOnePopup(null, `Successful Claimed`, null, `OK`, null)
                console.log('claimParityAmount_Tx', claimParityAmount_Tx);
                setSocket(prevBool => !prevBool);

            } catch (error) {
                // allInOnePopup(`error`, `Error`, `An error occurred. Please try again.`, `OK`, true);
                allInOnePopup(null, `An error occurred. Please try again.`, null, `OK`, null)
                console.error('handle_Claim_Parity_Tokens Error: ', error);
            }
        }
    }
    const handle_Claim_All_Reward_Amount = async (address) => {
        if (address) {
            try {
                let userBucketBalance = await getToBeClaimed(accountAddress)
                let formattedToBeClaimed = await getFormatEther(userBucketBalance || '0')

                let ParityShareTokensDetail = await getParityDollarClaimed(accountAddress)
                let parityClaimableAmount = ParityShareTokensDetail?.parityClaimableAmount
                let parityClaimableAmountFormatted = await getFormatEther(parityClaimableAmount)

                let protocolFee = await getProtocolFee(accountAddress);
                let protocolAmount = await protocolFee?.protocolAmount

                let AllFee = Number(formattedToBeClaimed) + Number(parityClaimableAmountFormatted) + Number(protocolAmount)
                let fixed = AllFee.toFixed(4)
                if (0 >= Number(fixed)) {
                    allInOnePopup(null, `You don't have any reward for claim.`, null, `OK`, null)
                    return
                }
                allInOnePopup(null, 'Processing Claim', null, `OK`, null)
                let contract = await getPsdContract()

                let claimAllRewardAmount_Tx = await contract.claimAllReward()
                await claimAllRewardAmount_Tx.wait()
                allInOnePopup(null, `Successful Claimed`, null, `OK`, null)
                console.log('claimParityAmount_Tx', claimAllRewardAmount_Tx);
                setSocket(prevBool => !prevBool);

            } catch (error) {
                allInOnePopup(null, `An error occurred. Please try again.`, null, `OK`, null)
                console.error('handle_Claim_All_Reward_Amount Error: ', error);
            }
        }
    }
    const getToBeClaimed = async (accountAddress) => {
        try {
            if (accountAddress) {
                let contract = await getPsdContract()
                let userBucketBalance = await contract.depositAmount(accountAddress)
                console.log("bucket balance", userBucketBalance);
                let BucketInStr = await userBucketBalance.toString()
                return (BucketInStr)
            }
        } catch (error) {
            console.error('getToBeClaimed error:', error);
        }
    }
    const getPLSToBeClaimed = async (accountAddress) => {
        try {
            if (accountAddress) {
                let contract = await getPLSContract()
                let userBucketBalance = await contract.depositAmount(accountAddress)
                let BucketInStr = await userBucketBalance.toString()
                return (BucketInStr)
            }
        } catch (error) {
            console.error('getToBeClaimed error:', error);
        }
    }
    const getMaticToBeClaimed = async (accountAddress) => {
        try {
            if (accountAddress) {
                let contract = await getMATICContract()
                let userBucketBalance = await contract.depositAmount(accountAddress)
                let BucketInStr = await userBucketBalance.toString()
                return (BucketInStr)
            }
        } catch (error) {
            console.error('getToBeClaimed error:', error);
        }
    }


    const isClaimed = async (accountAddress) => {
        try {
            let contract = await getPsdContract();
            let isClaim = await contract.isClaimed(accountAddress);
            return isClaim;
        } catch (error) {
            console.log(error);
        }
    }
    const isPLSClaimed = async (accountAddress) => {
        try {
            let contract = await getPLSContract();
            let isClaim = await contract.isClaimed(accountAddress);
            return isClaim;
        } catch (error) {
            console.log(error);
        }
    }
    const isMaticClaimed = async (accountAddress) => {
        try {
            let contract = await getMATICContract();
            let isClaim = await contract.isClaimed(accountAddress);
            return isClaim;
        } catch (error) {
            console.log(error);
        }
    }
    const getUserDistributedTokens = async (address) => {
        try {
            let contract = await getPsdContract();
            // Fetch the distributed tokens for the user
            let distributedTokens = await contract.getUserReceivedTokens(address);
            let formattedDistributedTokens = await getFormatEther(distributedTokens);

            console.log("distributed amount,,...... ", formattedDistributedTokens)

            return formattedDistributedTokens;
        } catch (error) {
            console.error(error);
        }
    }

    const getDistributedAmount = async () => {
        try {
            let contract = await getPsdContract();
            let distributedAmount = await contract.calculateTotalReachedTargetAmount(accountAddress);
            let Instr = await getFormatEther(distributedAmount);
            console.log("distributed amount from function getDistributed", distributedAmount)
            return Instr

        } catch (error) { console.log(error) }
    }

    const getPLSUserDistributedTokens = async (address) => {
        try {
            let contract = await getPLSContract();
            // Fetch the distributed tokens for the user
            let distributedTokens = await contract.getUserReceivedTokens(address);
            let formattedDistributedTokens = await getFormatEther(distributedTokens);

            console.log("distributed amount,,...... ", formattedDistributedTokens)

            return formattedDistributedTokens;
        } catch (error) {
            console.error(error);
        }
    }

    const getClaimedAmount = async (accountAddress) => {
        try {
            let contract = await getPsdContract();
            let getClaimedAmount = await contract.getClaimedAmount(accountAddress);
            let getClaimedAmountInstr = await getClaimedAmount.toString()
            return getClaimedAmountInstr
        } catch (error) {
            console.log(error);
        }
    }

    const getPLSClaimedAmount = async (accountAddress) => {
        try {
            let contract = await getPLSContract();
            let getClaimedAmount = await contract.getClaimedAmount(accountAddress);
            let getClaimedAmountInstr = await getClaimedAmount.toString()
            return getClaimedAmountInstr
        } catch (error) {
            console.log(error);
        }
    }
    const getMaticClaimedAmount = async (accountAddress) => {
        try {
            let contract = await getMATICContract();
            let getClaimedAmount = await contract.getClaimedAmount(accountAddress);
            let getClaimedAmountInstr = await getClaimedAmount.toString()
            return getClaimedAmountInstr
        } catch (error) {
            console.log(error);
        }
    }

    const getTargetTransferDetails = async (accountAddress) => {
        try {
            let contract = await getPsdContract();
            let getTargetTransferDetails = await contract.getTargetTransferDetails(accountAddress);
            let closeVaultsValues = await getTargetTransferDetails?.targetAmounts;
            let formattedValue = await getFormatEther(closeVaultsValues);
            return formattedValue;
        } catch (error) {
            console.log(error);
        }
    };
    const getPLSMATICTargetTransferDetails = async (accountAddress, { network = 'PLS' } = {}) => {
        try {
            let contract;

            switch (network) {
                case 'MATIC':
                    contract = await getMATICContract();
                    break;
                case 'PLS':
                default:
                    contract = await getPLSContract();
                    break;
            }

            let getTargetTransferDetails = await contract.getTargetTransferDetails(accountAddress);
            let closeVaultsValues = await getTargetTransferDetails?.targetAmounts;
            let formattedValue = await getFormatEther(closeVaultsValues);

            return formattedValue;
        } catch (error) {
            console.log(error);
        }
    };

    const getClaimableAmount = async (accountAddress) => {
        try {
            let contract = await getPsdContract();
            let getClaimableAmount = await contract.getClaimableAmount(accountAddress);
            let formattedClaimAmount = await getFormatEther(getClaimableAmount);
            return formattedClaimAmount;
        } catch (error) {
            console.log(error);
        }
    }
    const getPLSClaimableAmount = async (accountAddress) => {
        try {
            let contract = await getPLSContract();
            let getClaimableAmount = await contract.getClaimableAmount(accountAddress);
            let formattedClaimAmount = await getFormatEther(getClaimableAmount);
            return formattedClaimAmount;
        } catch (error) {
            console.log(error);
        }
    }
    const getMaticClaimableAmount = async (accountAddress) => {
        try {
            let contract = await getMATICContract();
            let getClaimableAmount = await contract.getClaimableAmount(accountAddress);
            let formattedClaimAmount = await getFormatEther(getClaimableAmount);
            return formattedClaimAmount;
        } catch (error) {
            console.log(error);
        }
    }
    const getTotalValueLockedInDollar = async () => {
        try {
            let contract = await getPsdContract()
            // let getTotalPsdShare = await contract.getTotalPsdShare()
            // let getTotalPsdShare = await contract.getActualTotalPsdShare()
            let contractBalance_Matic = await contract.getContractBalance()
            let contractBalance_Matic_Str = contractBalance_Matic?.toString()
            let contractBalanceUsdValue = await getUserUsdValue(contractBalance_Matic_Str || '0')
            let getTotalPsdShareInStr = await contractBalanceUsdValue.toString()
            return getTotalPsdShareInStr
        } catch (error) {
            console.error('getTotalValueLockedInDollar error:', error);
        }
    }

    const contractBalance = async () => {
        try {
            let contract = await getPsdContract();
            let contractBalance = await contract.getContractBalance();
            return contractBalance;
        } catch (error) {
            console.error('ContractBalance error:', error);
        }
    }
    const getParityDollardeposits = async (address) => {
        try {
            if (address) {
                let contract = await getPsdContract()
                // let PSD_Share_This_User = await contract.PSDdistributionPercentageMapping(address)
                let PSD_Share_This_User = await contract.PSDSharePerUser(address)
                let PSD_Share_This_User_InStr = await PSD_Share_This_User.toString()
                return PSD_Share_This_User_InStr
            }
        } catch (error) {
            console.error('getParityDollardeposits error:', error);
        }
    }
    const getPLSParityDollardeposits = async (address) => {
        try {
            if (address) {
                let contract = await getPLSContract()
                // let PSD_Share_This_User = await contract.PSDdistributionPercentageMapping(address)
                let PSD_Share_This_User = await contract.PSDSharePerUser(address)
                let PSD_Share_This_User_InStr = await PSD_Share_This_User.toString()
                return PSD_Share_This_User_InStr
            }
        } catch (error) {
            console.error('getParityDollardeposits error:', error);
        }
    }
    const getParityTokensDeposits = async (address) => {
        try {
            if (address) {
                let contract = await getPsdContract()
                // let PST_Share_This_User = await contract.PSTdistributionPercentageMapping(address)
                let PST_Share_This_User = await contract.PSTSharePerUser(address)
                let PST_Share_This_User_InStr = await PST_Share_This_User.toString()
                return PST_Share_This_User_InStr
            }
        } catch (error) {
            console.error('getParityTokensDeposits error:', error);
        }
    }
    const getPLSParityTokensDeposits = async (address) => {
        try {
            if (address) {
                let contract = await getPLSContract()
                // let PST_Share_This_User = await contract.PSTdistributionPercentageMapping(address)
                let PST_Share_This_User = await contract.PSTSharePerUser(address)
                let PST_Share_This_User_InStr = await PST_Share_This_User.toString()
                return PST_Share_This_User_InStr
            }
        } catch (error) {
            console.error('getParityTokensDeposits error:', error);
        }
    }
    const getParityAmountDistributed = async (address) => {
        try {
            if (address) {
                let contract = await getPsdContract()
                let ParityAmountDistributed = await contract.getParityAmountDistributed(address)
                let ParityAmountDistributed_InStr = await ParityAmountDistributed.toString()
                return ParityAmountDistributed_InStr;
            }
        } catch (error) {
            console.log('getParityAmountDistributed error: ', error);
        }

    }
    const getPLSParityAmountDistributed = async (address) => {
        try {
            if (address) {
                let contract = await getPLSContract()
                let ParityAmountDistributed = await contract.getParityAmountDistributed(address)
                let ParityAmountDistributed_InStr = await ParityAmountDistributed.toString()
                return ParityAmountDistributed_InStr;
            }
        } catch (error) {
            console.log('getParityAmountDistributed error: ', error);
        }

    }

    const get_PSD_Claimed = async (address) => {
        try {
            if (address) {
                let contract = await getPsdContract()
                let PSD_Claimed_This_User = await contract.getPSDClaimed(address)
                let PSD_Claimed_This_User_InStr = await PSD_Claimed_This_User.toString()
                return PSD_Claimed_This_User_InStr
            }
        } catch (error) {
            console.error('get_PSD_Claimed error:', error);
        }
    }
    const getPLS_PSD_Claimed = async (address) => {
        try {
            if (address) {
                let contract = await getPLSContract()
                let PSD_Claimed_This_User = await contract.getPSDClaimed(address)
                let PSD_Claimed_This_User_InStr = await PSD_Claimed_This_User.toString()
                return PSD_Claimed_This_User_InStr
            }
        } catch (error) {
            console.error('get_PSD_Claimed error:', error);
        }
    }
    const get_PST_Claimed = async (contractType = 'PSD') => {
        let contract;
        switch (contractType) {
            case 'PDXN':
                contract = await getPDXNContract();
                break;
            case 'Matic':
                contract = await getMATICContract();
                break;
            case 'mdxn':
                contract = await getmDXNContract();
                break;
            case 'mfenix':
                contract = await getmFENIXContract();
                break;
            case 'mxen':
                contract = await getmXENContract();
                break;
            case 'PFENIX':
                contract = await getPFENIXContract();
                break;
            case 'HEX':
                contract = await getHexContract();
                break;
            case 'TEXAN':
                contract = await getTexanContract();
                break;
            case 'REX':
                contract = await getRexContract();
                break;
            case 'PTGC':
                contract = await getPtgcContract();
                break;
            case 'LOAN_M':
                contract = await getloanMainnetContract();
                break;
            case 'WATT':
                contract = await getWattContract();
                break;
            case 'PSD':
            default:
                contract = await getPsdContract();
                break;
        }
        try {
            if (!accountAddress) {
                throw new Error("Address is required");
            }

            const PST_Claimed_This_User = await contract.getPSTClaimed(accountAddress);
            return PST_Claimed_This_User.toString();
        } catch (error) {
            console.error('get_PST_Claimed error:', error);
            return "0"; // Return "0" as a string to indicate an error or absence of value
        }
    };


    const getPLS_PST_Claimed = async (address) => {
        try {
            if (address) {
                let contract = await getPLSContract()
                let PST_Claimed_This_User = await contract?.getPSTClaimed(address)
                let PST_Claimed_This_User_InStr = await PST_Claimed_This_User.toString()
                return PST_Claimed_This_User_InStr
            }
        } catch (error) {
            console.error('get_PST_Claimed error:', error);
        }
    }

    const getMatic_PST_Claimed = async (address) => {
        try {
            if (address) {
                let contract = await getMATICContract()
                let PST_Claimed_This_User = await contract?.getPSTClaimed(address)
                let PST_Claimed_This_User_InStr = await PST_Claimed_This_User.toString()
                return PST_Claimed_This_User_InStr
            }
        } catch (error) {
            console.error('get_PST_Claimed error:', error);
        }
    }

    const getAndMarkReachedTarget = async (accountAddress) => {
        try {
            let contract = await getPsdContract();
            let getAndMarkReachedTarget = await contract.getAndMarkReachedTargets(accountAddress);
            let getAndMarkReachedTarget_InStr = await getAndMarkReachedTarget.toString();

            return getAndMarkReachedTarget_InStr;
        } catch (error) {
            console.log(error)
        }
    }
    // unused
    const getParityDollarClaimed = async (contractType = 'PSD') => {
        let contract;
        switch (contractType) {
            case 'PDXN':
                contract = await getPDXNContract();
                break;
            case 'MATIC':
                contract = await getMATICContract();
                break;
            case 'mdxn':
                contract = await getmDXNContract();
                break;
            case 'mfenix':
                contract = await getmFENIXContract();
                break;
            case 'mxen':
                contract = await getmXENContract();
                break;
            case 'Matic':
                contract = await getMATICContract();
                break;
            case 'PFENIX':
                contract = await getPFENIXContract();
                break;
            case 'HEX':
                contract = await getHexContract();
                break;
            case 'TEXAN':
                contract = await getTexanContract();
                break;
            case 'REX':
                contract = await getRexContract();
                break;
            case 'PTGC':
                contract = await getPtgcContract();
                break;
            case 'LOAN_M':
                contract = await getloanMainnetContract();
                break;
            case 'WATT':
                contract = await getWattContract();
                break;
            case 'PSD':
            default:
                contract = await getPsdContract();
                break;
        }
        try {
            let ParityShareTokensDetail = await contract.getParityShareTokensDetail(accountAddress);
            let parityAmount = ParityShareTokensDetail.parityAmount.toString();
            let claimableAmount = ParityShareTokensDetail.claimableAmount.toString();

            console.log("claimable amount", claimableAmount);
            return { parityAmount: parityAmount, parityClaimableAmount: claimableAmount };

        } catch (error) {
            console.error('getParityDollarClaimed error:', error);
        }
    }

    const getPLSParityDollarClaimed = async (address) => {
        // address = accountAddress
        try {
            if (address) {
                let contract = await getPLSContract()
                let ParityShareTokensDetail = await contract.getParityShareTokensDetail(address)
                let parityAmount = await ParityShareTokensDetail.parityAmount.toString()
                let claimableAmount = await ParityShareTokensDetail.claimableAmount.toString()
                return { parityAmount: parityAmount, parityClaimableAmount: claimableAmount }
            }
        } catch (error) {
            console.error('getParityDollarClaimed error:', error);
        }
    }

    const getRatioPriceTargets = async (address) => {
        try {
            if (address) {
                let contract = await getPsdContract()
                let getTargets = await contract.getTargets(address)
                return getTargets
            }
        } catch (error) {
            console.error('getRatioPriceTargets error:', error);
        }
    }
    const getPLSRatioPriceTargets = async (address) => {
        try {
            if (address) {
                let contract = await getPLSContract()
                let getTargets = await contract.getTargets(address)
                return getTargets
            }
        } catch (error) {
            console.error('getRatioPriceTargets error:', error);
        }
    }

    const getIncrementPriceTargets = async (address) => {
        try {
            if (address) {
                let contract = await getPsdContract()
                let getIncrementPriceTarget = await contract.getEscrowDetails(address)
                return getIncrementPriceTarget
            }
        } catch (error) {
            console.error('getIncrementPriceTargets error:', error);
        }
    }
    const getPLSIncrementPriceTargets = async (address) => {
        try {
            if (address) {
                let contract = await getPLSContract()
                let getIncrementPriceTarget = await contract.getEscrowDetails(address)
                return getIncrementPriceTarget
            }
        } catch (error) {
            console.error('getIncrementPriceTargets error:', error);
        }
    }
    const getDepositors = async () => {
        try {
            let contract = await getPsdContract()
            let Depositors_Address = await contract.getDepositors()
            return Depositors_Address || []
        } catch (error) {
            console.error('getDepositors error:', error);
        }
    }
    const getPLSDepositors = async () => {
        try {
            let contract = await getPLSContract()
            let Depositors_Address = await contract.getDepositors()
            return Depositors_Address || []
        } catch (error) {
            console.error('getDepositors error:', error);
        }
    }

    const getClaimAllReward = async (address, contractType = 'PSD') => {
        let contract;
        switch (contractType) {
            case 'PDXN':
                contract = await getPDXNContract();
                break;
            case 'mdxn':
                contract = await getmDXNContract();
                break;
            case 'mfenix':
                contract = await getmFENIXContract();
                break;
            case 'mxen':
                contract = await getmXENContract();
                break;
            case 'PFENIX':
                contract = await getPFENIXContract();
                break;
            case 'HEX':
                contract = await getHexContract();
                break;
            case 'TEXAN':
                contract = await getTexanContract();
                break;
            case 'REX':
                contract = await getRexContract();
                break;
            case 'PTGC':
                contract = await getPtgcContract();
                break;
            case 'LOAN_M':
                contract = await getloanMainnetContract();
                break;
            case 'WATT':
                contract = await getWattContract();
                break;
            case 'PSD':
            default:
                contract = await getPsdContract();
                break;
        }

        try {
            const claimAllReward = await contract?.claimAllReward();
            await claimAllReward.wait();
            setSocket(prevBool => !prevBool);
            return claimAllReward;
        } catch (err) {
            allInOnePopup(null, 'Claim failed. Please try again.', null, `OK`, null);
            console.log('claimAllReward', err);
        }
    };


    const getPLSClaimAllReward = async (address) => {
        const contract = await getPLSContract();
        try {
            const claimAllReward = await contract?.claimAllReward();

            await claimAllReward.wait();
            setSocket(prevBool => !prevBool);
            return claimAllReward;
        } catch (err) {
            allInOnePopup(null, 'Claim failed. Please try again.', null, `OK`, null)
            console.log('claimAllReward', err)
        }
    }

    const getMaticClaimAllReward = async (address) => {
        const contract = await getMATICContract();
        try {
            const claimAllReward = await contract?.claimAllReward();

            await claimAllReward.wait();
            setSocket(prevBool => !prevBool);
            return claimAllReward;
        } catch (err) {
            allInOnePopup(null, 'Claim failed. Please try again.', null, `OK`, null)
            console.log('claimAllReward', err)
        }
    }
    const getTotalTokenValueInVaults = async () => {
        const contract = await getPsdContract();
        try {
            const TotalTokenVaultValue = await contract?.getTotalTokenValueInVaults();

            await TotalTokenVaultValue.wait();
            return TotalTokenVaultValue;
        } catch (err) {
            console.log('TotalTokenVaultValue', err)
        }
    }

    const getDepositeValues = async () => {
        const contract = await getPsdContract();
        try {
            // const _id = await contract?.ID();
            const depostedValues = await contract?.getDeposited(1);
            setDepositedAmount(depostedValues[0].depositAmount)
            return depostedValues;

        } catch (error) {
        }
    }

    const getNumberOfStateProtocolUsers = async () => {
        try {
            let contract = await getPsdContract();
            let users = await contract?.NumberOfUser();
            const usersInStr = await users?.toString()
            return usersInStr
        } catch (error) {
            console.error('getNumberOfStateProtocolUsers: ', error);
        }
    }

    useEffect(() => {

        getuserAllDetails()
        fetchAutoVaultAmount()
        getTotalMaxLimits()
        totalSupply()
        checkDeposited()
        BalanceOfPLSContract()
        BalanceOfMATICContract();
        BalanceOfXenTokenContract()
    },);

    // useEffect(() => {
    //     if (accountAddress) {
    //         fetchAndUpdatePrice()
    //         // fetchPLSPrice()
    //         const interval = setInterval(() => {
    //             fetchAndUpdatePrice();
    //             // fetchPLSPrice()
    //         }, 300000); // 300,000 ms = 5 minutes

    //         return () => clearInterval(interval);
    //     }
    // })


    return (
        <>

            <functionsContext.Provider value={{
                getFormatEther,
                socket,
                getParityReached,
                handleDeposit,
                fetchAutoVaultAmount,
                handle_Claim_Protocol_Fee,
                handle_Claim_Parity_Tokens,
                handle_Claim_All_Reward_Amount,
                getPrice,
                getDistributedTokens,
                mintWithBDXN,
                onlyPSDclaimed,
                // PriceFeedForXEN,
                BalanceOfPLSContract,
                holdTokens,
                getTotalMintedTokens,
                getToBeClaimed,
                getTotalValueLockedInDollar,
                getMaticClaimAllReward,
                checkDeposited,
                getParityDollardeposits,
                getParityTokensDeposits,
                get_PSD_Claimed,
                getClaimedAmount,
                get_PST_Claimed,
                getPsdContract,
                approveAndDeposit,
                mintWithREX,
                mintWithTEXAN,
                mintWithLOAN,
                BalanceOfMATICContract,
                mintWithWATT,
                handleDepositMATIC,
                mintWithPTGC,
                getTotalMaxLimits,
                getTargetTransferDetails,
                getParityDollarClaimed,
                getParityAmountDistributed,
                getRatioPriceTargets,
                getIncrementPriceTargets,
                getProtocolFee,
                getClaimableAmount,
                // fetchAndUpdatePrice,
                // fetchPLSPrice,
                getOnlyProtocolFee,
                getDepositors,
                handleDepositAutovault,
                buyTokens,
                mintWithHEX,
                getUserUsdValue,
                getTotalTokenValueInVaults,
                contractBalance,
                getTotalNumberOfReward,
                reward,
                BalanceOfXenTokenContract,

                isHolder,
                mintWithMDXN,
                getAndMarkReachedTarget,
                isClaimed,
                mintWithPDXN,
                getUserDistributedTokens,
                getTimeStampForCreateValut,
                getClaimAllReward,
                getDepositeValues,
                depositedAmount,
                getNumberOfStateProtocolUsers,
                getPLSPrice,
                mintWithPFENIX,
                getPLSDepositors,
                onlyPLSPSDclaimed,
                getPLSTimeStampForCreateValut,
                handleDepositAutovaults,
                getMatic_PST_Claimed,
                getPLSProtocolFee,
                fetchPLSAutoVaultAmount,
                getPLSParityReached,
                getPLSClaimAllReward,
                isDAVDEFIHolder,
                getPLSToBeClaimed,
                fetchTotalAV,
                getDistributedAmount,
                getPLSRatioPriceTargets,
                isPLSClaimed,
                getPLSUserDistributedTokens,
                getPLSMATICTargetTransferDetails,
                getuserAllDetails,
                getPLSClaimedAmount,
                getPLSParityAmountDistributed,
                getPLS_PST_Claimed, getPLSIncrementPriceTargets,
                getPLSClaimableAmount,
                getPLSParityDollardeposits,
                fetchMaticAutoVaultAmount,
                getPLSParityTokensDeposits,
                getPLSParityDollarClaimed,
                totalSupply,
                getPLS_PSD_Claimed
            }}>
                {children}
            </functionsContext.Provider>

        </>
    )
}