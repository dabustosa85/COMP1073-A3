// Find the form element and listen for the submit event
const smoothieForm = document.querySelector('#smoothie-form');
smoothieForm.addEventListener('submit', submitHandler);

function submitHandler(event) {
    event.preventDefault();

    // Get the values from the form elements
    const flavor = document.querySelector('input[name="flavor"]:checked').value;
    const size = document.querySelector('input[name="size"]:checked').value;
    const toppings = getToppings();

    // Create a new Smoothie object with the form data
    const smoothie = new Smoothie(flavor, size, toppings);

    // Calculate the price of the smoothie
    const price = smoothie.getPrice();

    // Output the smoothie description to the HTML page
    const flavorRow = document.querySelector('#flavor-row td:last-child');
    const sizeRow = document.querySelector('#size-row td:last-child');
    const toppingsRow = document.querySelector('#toppings-row td:last-child');
    const totalRow = document.querySelector('#total-row td:last-child');

    flavorRow.textContent = `$${smoothie.prices.flavors[flavor]}`;
    sizeRow.textContent = `$${smoothie.prices.sizes[size]}`;
    toppingsRow.textContent = `$${smoothie.getToppingsPrice()}`;
    totalRow.textContent = `$${price}`;

    // Show the smoothie summary section
    const smoothieOutput = document.querySelector('#smoothie-output');
    smoothieOutput.classList.remove('hidden');
}

function getToppings() {
    const checkboxes = document.querySelectorAll('input[name="toppings"]:checked');
    const toppings = [];
    checkboxes.forEach(function(checkbox) {
        toppings.push(checkbox.value);
    });
    return toppings;

}

// Smoothie class
class Smoothie {
    constructor(flavor, size, toppings) {
        this.flavor = flavor;
        this.size = size;
        this.toppings = toppings;
        this.prices = {
            flavors: {
                'strawberry': 2.50,
                'banana': 2.75,
                'pineapple': 3.15
            },
            sizes: {
                'small': 3.00,
                'medium': 4.00,
                'large': 5.00
            },
            toppings: {
                'cream': 0.50,
                'chips': 0.50
            }
        };
    }

    getPrice() {
        let price = this.prices.flavors[this.flavor];
        price += this.prices.sizes[this.size];
        price += this.getToppingsPrice();
        return price;
    }

    getToppingsPrice() {
        let toppingsPrice = 0;
        this.toppings.forEach((topping) => {
            toppingsPrice += this.prices.toppings[topping];
        });
        return toppingsPrice;
    }
}
