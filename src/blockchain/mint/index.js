import React, { useState } from 'react';
import { Button, Input } from 'rimble-ui';
import { useWallet } from 'use-wallet';
import { isAddressValid } from '@aeternity/aepp-sdk/es/utils/crypto';
import { Contract, utils, constants } from 'ethers';
import { Web3Provider } from 'ethers/providers';

import ERC20_ABI from '../ethereum/erc20.abi';
import MULTISIG_ABI from '../ethereum/abi';
import { MULTISIG_ADDRESS } from '../../config';

import { error, processing } from '../../components/Notify';

import './style.scss';

const TOKEN_ADDRESS = '0x6b175474e89094c44da98b954eedeac495271d0f';
const TOKEN_DECIMALS = 18;

function App() {
  const wallet = useWallet();

  const [amountError, setAmountError] = useState(false);
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');

  const onAmountInputChange = input => {
    setAmount(input);

    try {
      utils.parseUnits(input, TOKEN_DECIMALS);
      setAmountError(false);
    } catch (err) {
      setAmountError(true);
    }
  };

  const mint = async () => {
    if (!wallet.connected || !wallet.ethereum) {
      error('Connect with Metamask');
      return;
    }

    if (!isAddressValid(address)) {
      error('Invalid AE Address');
      return;
    }

    if (!amount) {
      error('Invalid amount');
      return;
    }

    const provider = new Web3Provider(wallet.ethereum);

    const signer = provider.getSigner();

    const token = new Contract(TOKEN_ADDRESS, ERC20_ABI, signer);

    const multisig = new Contract(MULTISIG_ADDRESS, MULTISIG_ABI, signer);

    const allowance = await token.allowance(wallet.account, MULTISIG_ADDRESS);

    const bigAmount = utils.parseUnits(amount, TOKEN_DECIMALS);

    if (allowance.lt(bigAmount)) {
      await token.approve(MULTISIG_ADDRESS, constants.MaxUint256);
    }

    let tx;
    try {
      tx = await multisig.deposit(bigAmount, TOKEN_ADDRESS, address);
    } catch (err) {
      tx = await multisig.deposit(bigAmount, TOKEN_ADDRESS, address, {
        gasLimit: 150000
      });
    }

    if (tx) {
      processing(
        'Processing deposit...',
        'Check progress on Etherscan',
        `https://etherscan.io/tx/${tx.hash}`,
        'Check'
      );
    }
  };

  return (
    <div>
      <Input
        style={{
          borderColor: amountError && 'red'
        }}
        type="number"
        required={true}
        placeholder="0.00"
        onChange={e => onAmountInputChange(e.target.value)}
        value={amount}
        my={4}
        mx={2}
      ></Input>

      <Input
        type="text"
        required={true}
        placeholder="AE Address"
        onChange={e => setAddress(e.target.value)}
        value={address}
        my={4}
        mx={2}
      />

      <Button onClick={() => mint()} my={4} mx={2}>
        Mint
      </Button>
    </div>
  );
}

export default () => {
  return <App />;
};
