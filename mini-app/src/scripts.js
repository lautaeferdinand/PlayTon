document.addEventListener('DOMContentLoaded', () => {
    const connectWalletBtn = document.getElementById('connectWallet');
    const statusDiv = document.getElementById('status');

    const tonConnect = new TonConnect({
        manifestUrl: 'http://localhost:3000/tonconnect-manifest.json'
    });

    let contractData = null;

    // Ambil data kontrak dari server
    fetch('/api/contract')
        .then(response => response.json())
        .then(data => {
            contractData = data;
        })
        .catch(error => console.error('Error fetching contract data:', error));

    tonConnect.onStatusChange(wallet => {
        if (wallet) {
            statusDiv.textContent = `Status: Connected to ${wallet.account.address}`;
            connectWalletBtn.textContent = 'Disconnect Wallet';
            const sendBtn = document.createElement('button');
            sendBtn.textContent = 'Send 0.01 TON & Mint Jetton';
            sendBtn.id = 'sendTransaction';
            document.querySelector('main').appendChild(sendBtn);

            sendBtn.addEventListener('click', async () => {
                if (!contractData) {
                    statusDiv.textContent = 'Error: Contract data not loaded';
                    return;
                }
                try {
                    const transaction = {
                        validUntil: Math.floor(Date.now() / 1000) + 60,
                        messages: [
                            {
                                address: wallet.account.address,
                                amount: '10000000', // 0.01 TON
                                payload: tonConnect.createPayload({
                                    to: wallet.account.address,
                                    value: '10000000',
                                    abi: contractData.abi,
                                    call_set: {
                                        function_name: 'mint',
                                        input: {
                                            amount: '1000000' // 1 jetton
                                        }
                                    },
                                    tvc: contractData.tvc
                                })
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
