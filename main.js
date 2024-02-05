async function fetchData(itemId) {
    try {
        let response = await fetch(`http://api.coinlayer.com/live?access_key=4de0806d2a4bf96902bf859801fdb158&symbols=BTC,ETH,ELF,LUN,DOGE,INK&target=USD`);

        if (!response.ok) {
            throw new Error("Could not fetch data");
        }

        const data = await response.json();
        console.log(data);

        // Extract price based on item ID
        const symbolMap = {
            item_1: 'BTC',
            item_2: 'ETH',
            item_3: 'ELF',
            item_4: 'LUN',
            item_5: 'DOGE',
            item_6: 'INK'

        };

        const symbol = symbolMap[itemId];
        const price = data.rates[symbol];

        // Update button label with corresponding cryptocurrency price
        const button = document.querySelector(`button[data-id="${itemId}"]`);
        button.querySelector('label').textContent = `${symbol} Price: ${price} USD`;
    } catch(error) {
        console.error(error)
    }
}

// Attach click event listeners to all buttons
const buttons = document.querySelectorAll('.data-btn');
buttons.forEach(button => {
    button.addEventListener('click', function() {
        const itemId = this.getAttribute('data-id');
        fetchData(itemId);
        // add new class for styling
        this.classList.add('clicked')
    });
});
