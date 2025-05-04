document.addEventListener('DOMContentLoaded', () => {
    const connectWalletBtn = document.getElementById('connectWallet');
    const statusDiv = document.getElementById('status');

    connectWalletBtn.addEventListener('click', () => {
        statusDiv.textContent = 'Status: Connecting...';
        setTimeout(() => {
            statusDiv.textContent = 'Status: Wallet Connected!';
            connectWalletBtn.textContent = 'Disconnect Wallet';
        }, 2000); // Simulasi delay 2 detik
    });
});
