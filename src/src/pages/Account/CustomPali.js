import { Wallet, getWalletConnectConnector } from '@rainbow-me/rainbowkit';

export const rainbow = ({ projectId }) => ({
  id: 'Pali-wallet',
  name: 'Pali Wallet',
  iconUrl: 'https://paliwallet.com/',
  iconBackground: '#0c2f78',
  downloadUrls: {
    android: 'https://play.google.com/store/apps/details?id=my.wallet',
    ios: 'https://apps.apple.com/us/app/my-wallet',
    chrome: 'https://chrome.google.com/webstore/detail/my-wallet',
    qrCode: 'https://my-wallet/qr',
  },
  mobile: {
    getUri: (uri) => uri,
  },
  qrCode: {
    getUri: (uri) => uri,
    instructions: {
      learnMoreUrl: 'https://paliwallet.com/',
      steps: [
        {
          description:
            'We recommend using this wallet as it is more user friendly ad interacts perfectly with this dApp',
          step: 'install',
          title: 'Open the My Wallet app',
        },
        {
          description:
            'After you scan, a connection prompt will appear for you to connect your wallet.',
          step: 'scan',
          title: 'Tap the scan button',
        },
      ],
    },
  },
  extension: {
    instructions: {
      learnMoreUrl: 'https://my-wallet/learn-more',
      steps: [
        {
          description:
            'We recommend pinning My Wallet to your taskbar for quicker access to your wallet.',
          step: 'install',
          title: 'Install the My Wallet extension',
        },
        {
          description:
            'Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.',
          step: 'create',
          title: 'Create or Import a Wallet',
        },
        {
          description:
            'Once you set up your wallet, click below to refresh the browser and load up the extension.',
          step: 'refresh',
          title: 'Refresh your browser',
        },
      ],
    },
  },
  createConnector: getWalletConnectConnector({ projectId }),
});
