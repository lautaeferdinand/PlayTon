document.addEventListener('DOMContentLoaded', () => {
    const connectWalletBtn = document.getElementById('connectWallet');
    const statusDiv = document.getElementById('status');

    const tonConnect = new TonConnect({
        manifestUrl: 'http://localhost:3000/tonconnect-manifest.json'
    });

    tonConnect.onStatusChange(wallet => {
        if (wallet) {
            statusDiv.textContent = `Status: Connected to ${wallet.account.address}`;
            connectWalletBtn.textContent = 'Disconnect Wallet';
            const sendBtn = document.createElement('button');
            sendBtn.textContent = 'Send 0.01 TON';
            sendBtn.id = 'sendTransaction';
            document.querySelector('main').appendChild(sendBtn);

            sendBtn.addEventListener('click', async () => {
                try {
                    const transaction = {
                        validUntil: Math.floor(Date.now() / 1000) + 60,
                        messages: [
                            {
                                address: 'EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c',
                                amount: '10000000' // 0.01 TON
                            }
                        ]
                    };
                    const result = await tonConnect.sendTransaction(transaction);
                    statusDiv.textContent = 'Transaction sent: ' + JSON.stringify(result);
                } catch (e) {
                    statusDiv.textContent = 'Transaction failed: ' + e.message;
                }
            });
        } else {
            statusDiv.textContent = 'Status: Disconnected';
            connectWalletBtn.textContent = 'Connect Wallet';
            const sendBtn = document.getElementById('sendTransaction');
            if (sendBtn) sendBtn.remove();
        }
    });

    connectWalletBtn.addEventListener('click', async () => {
        if (!tonConnect.connected) {
            await tonConnect.connect();
        } else {
            await tonConnect.disconnect();
        }
    });
});
