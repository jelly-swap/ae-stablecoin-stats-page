import { useState, useEffect } from 'react';

import { Node, Universal } from '@aeternity/aepp-sdk/es';

import { utils } from 'ethers';

import ContractSource from './source';

import { AES_ADDRESS } from '../../config';

export const useAESInfo = () => {
  const [totalSupply, setTotalSupply] = useState(0);
  const [holders, setHolders] = useState(0);

  useEffect(() => {
    let pollInterval;
    getContractInstance().then(contract => {
      const update = () => {
        contract.methods.total_supply().then(supply => {
          setTotalSupply(utils.formatUnits(supply?.decodedResult, 18));
        });

        contract.methods
          .balances()
          .then(b => setHolders(b?.decodedResult?.length));
      };

      update();

      pollInterval = setInterval(() => {
        update();
      }, 15000);
    });

    return () => {
      clearInterval(pollInterval);
    };
  }, []);

  return { totalSupply, holders };
};

const getContractInstance = async () => {
  const node = await Node({
    url: 'https://sdk-mainnet.aepps.com/',
    internalUrl: 'https://sdk-mainnet.aepps.com/'
  });

  const client = await Universal({
    nodes: [{ name: 'AES', instance: node }],
    compilerUrl: 'https://latest.compiler.aepps.com'
  });

  return await client.getContractInstance(ContractSource, {
    contractAddress: AES_ADDRESS
  });
};
