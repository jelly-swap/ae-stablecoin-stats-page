import React, { useCallback } from 'react';
import { EthAddress, MetaMaskButton } from 'rimble-ui';
import { useWallet } from 'use-wallet';

import { error } from '../../components/Notify';

import './style.scss';

export default () => {
  const wallet = useWallet();

  const activate = useCallback(
    async providerId => {
      try {
        await wallet.activate(providerId);
      } catch (err) {
        if (err?.message.indexOf('Unsupported chain') !== -1) {
          error('Please switch to Mainnet');
        } else {
          error(err?.message);
        }
      }
    },
    [wallet]
  );

  return (
    <>
      {(() => {
        if (wallet.connected) {
          return (
            <div className="address">
              {wallet.account && (
                <EthAddress
                  address={wallet.account}
                  textLabels
                  maxWidth="80%"
                />
              )}
            </div>
          );
        }

        return (
          <MetaMaskButton.Outline onClick={() => activate()}>
            Connect with MetaMask
          </MetaMaskButton.Outline>
        );
      })()}
    </>
  );
};
