import { useState, useEffect } from 'react';

import { Contract, getDefaultProvider, utils } from 'ethers';

import ABI from './abi';

import { MULTISIG_ADDRESS } from '../../config';

export const useMultiSigBalance = token => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    let pollInterval;
    const contract = new Contract(MULTISIG_ADDRESS, ABI, getDefaultProvider());

    const update = () => {
      contract.collateralBalance(token.address).then(result => {
        setBalance(
          utils.formatUnits(result.toString(), token.decimals).toString()
        );
      });
    };

    update();

    pollInterval = setInterval(() => {
      update();
    }, 15000);

    return () => {
      clearInterval(pollInterval);
    };
  }, [token.address, token.decimals]);

  return balance;
};
