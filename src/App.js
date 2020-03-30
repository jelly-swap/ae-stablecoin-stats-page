import React from 'react';
import { UseWalletProvider } from 'use-wallet';

import { Card } from 'rimble-ui';

import { useMultiSigBalance } from './blockchain/ethereum';
import { useAESInfo } from './blockchain/aeternity';
import Connect from './blockchain/connect';
import Mint from './blockchain/mint';

import { AES_ADDRESS, MULTISIG_ADDRESS } from './config';

import AESLogo from './images/AES.svg';
import DAILogo from './images/DAI.svg';
import JellySwapLogo from './images/jelly-swap.png';
import MediumLogo from './images/medium.png';
import AELogo from './images/ae.png';

import './App.scss';

function App() {
  const daiBalance = useMultiSigBalance({
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    decimals: 18
  });

  const aesInfo = useAESInfo();

  const cutAddress = address => {
    const cuttedAddress =
      address.substr(0, 5) +
      '....' +
      address.substr(address.length - 5, address.length);

    return cuttedAddress;
  };

  return (
    <UseWalletProvider chainId={1}>
      <div className='App'>
        <header>
          <div className='header-content'>
            <img src={AESLogo} alt={'Logo'} />
            <h3>Aeternity Stablecoin</h3>
          </div>
        </header>

        <div className='appWrapper'>
          <Card className='info card'>
            <div className='info-content'>
              <Connect>Connect</Connect>
              <Mint />
            </div>
          </Card>

          <div className='ae-dai-wrapper'>
            <div className='ae-wrapper'>
              <Card className='ae-header card'>
                <div>
                  <strong>AES Contract</strong>
                </div>
                <div className='address'>
                  <a
                    href={`https://explorer.aeternity.io/contracts/transactions/${AES_ADDRESS}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <span className='long-address'>{AES_ADDRESS}</span>
                    <span className='short-address' title={AES_ADDRESS}>
                      {cutAddress(AES_ADDRESS)}{' '}
                    </span>
                  </a>
                </div>
              </Card>

              <Card className='ae-card card'>
                <img src={AESLogo} alt={'Logo'} />
                <h1>Total AES</h1>
                <div className='amount'>{aesInfo.totalSupply}</div>
                <div className='holders'>
                  Holders: {aesInfo.holders} addresses
                </div>
              </Card>
            </div>

            <div className='dai-wrapper'>
              <Card className='dai-header card'>
                <div>
                  <strong>Multisig Contract</strong>
                </div>
                <div className='address'>
                  <a
                    href={`https://etherscan.io/address/${MULTISIG_ADDRESS}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <span className='long-address'>{MULTISIG_ADDRESS}</span>
                    <span className='short-address' title={MULTISIG_ADDRESS}>
                      {cutAddress(MULTISIG_ADDRESS)}{' '}
                    </span>
                  </a>
                </div>
              </Card>

              <Card className='dai-card card'>
                <img src={DAILogo} alt={'Logo'} />
                <h1>DAI Collateral</h1>
                <div className='amount'>{daiBalance}</div>
              </Card>
            </div>
          </div>
        </div>

        <footer>
          <div>Powered by JellySwap@2020</div>
          <a
            className='medium'
            href={'https://medium.com/jelly-market/aes-stablecoin-91bac074a4b3'}
            alt='medium'
            target={'_blank'}
            rel='noopener noreferrer'
          >
            <img src={MediumLogo} alt={'Medium'} />
          </a>

          <img src={JellySwapLogo} alt={'Logo'} />

          <a
            className='ae'
            href={
              'https://forum.aeternity.com/t/jellyswap-ae-stablecoin-progress/6470/20'
            }
            alt='ae-forum'
            target={'_blank'}
            rel='noopener noreferrer'
          >
            <img src={AELogo} alt={'ae'} />
          </a>
        </footer>
      </div>
    </UseWalletProvider>
  );
}

export default App;
