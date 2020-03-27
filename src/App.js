import React from 'react';
import './App.scss';

import Logo from './images/logo.svg';
import DAILogo from './images/DAI.svg';
import JellySwapLogo from './images/jelly-swap.png';

import { useMultiSigBalance } from './blockchain/ethereum';
import { useAESInfo } from './blockchain/aeternity';
import { Card } from './components/Card';
import { AES_ADDRESS, MULTISIG_ADDRESS } from './config';

function App() {
  const daiBalance = useMultiSigBalance({
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    decimals: 18
  });

  const aesInfo = useAESInfo();

  return (
    <div className="App">
      <header>
        <div className="header-content">
          <img src={Logo} alt={'Logo'} />
          <div className="header-caption">
            <h3>Aeternity Stablecoin</h3>
          </div>
        </div>
      </header>

      <Card className="info">
        <div>
          The Aeternity Stablecoin is collateral-backed cryptocurrency
          hard-pegged to the DAI Stablecoin. Every single AES token is backed by
          exactly 1 DAI.
        </div>
        <a
          href={
            'https://forum.aeternity.com/t/jellyswap-ae-stablecoin-progress/6470'
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          Read more about it on the Aeternity Forum
        </a>
      </Card>

      <Card className="dai-header">
        <div>
          <strong>Multisig Contract</strong>
        </div>
        <div className="address">
          <a
            href={`https://etherscan.io/address/${MULTISIG_ADDRESS}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {MULTISIG_ADDRESS}
          </a>
        </div>
      </Card>

      <Card className="dai-card">
        <img src={DAILogo} alt={'Logo'} />
        <h1>DAI Collateral</h1>
        <div className="amount">{daiBalance}</div>
      </Card>

      <Card className="ae-header">
        <div>
          <strong>AES Contract</strong>
        </div>
        <div className="address">
          <a
            href={`https://explorer.aeternity.io/contracts/transactions/${AES_ADDRESS}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {AES_ADDRESS}
          </a>
        </div>
      </Card>

      <Card className="ae-card">
        <img src={Logo} alt={'Logo'} />
        <h1>Total AES</h1>
        <div className="amount">{aesInfo.totalSupply}</div>
        <div className="holders">Holders: {aesInfo.holders} addresses</div>
      </Card>

      <footer>
        <div>Powered by JellySwap@2020</div>
        <img src={JellySwapLogo} alt={'Logo'} />
      </footer>
    </div>
  );
}

export default App;
