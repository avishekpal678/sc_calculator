let display = document.getElementById('display');
let isDegree = true; // Default to degrees for trigonometric functions
let pendingFactorial = false; // Flag to track if factorial calculation is pending

function appendToDisplay(value) {
    // Check if the value is a function like sin, cos, tan, etc.
    // If it is, append it with an opening parenthesis
    if (value.startsWith('Math.') && value.endsWith('(')) {
        display.value += value;
    } else {
        display.value += value;
    }
}

function calculate() {
    try {
        // Check if there is a pending factorial calculation
        if (pendingFactorial) {
            display.value = factorial(parseInt(display.value));
            pendingFactorial = false; // Reset the flag after calculating factorial
        } else {
            display.value = eval(display.value); // Evaluate the expression normally
        }
    } catch (error) {
        display.value = 'Error'; // Handle any errors with 'Error' message
    }
}

function clearDisplay() {
    display.value = ''; // Clear the display
}

function backspace() {
    display.value = display.value.slice(0, -1); // Remove the last character from display
}

function memoryClear() {
    localStorage.removeItem('memory'); // Clear memory storage
}

function memoryRecall() {
    let memory = localStorage.getItem('memory');
    if (memory !== null) {
        display.value += memory; // Append memory value to display if it exists
    }
}

function memoryAdd() {
    let memory = localStorage.getItem('memory');
    let currentValue = display.value;
    if (memory === null) {
        localStorage.setItem('memory', currentValue); // Set current value as memory if it doesn't exist
    } else {
        let newValue = parseFloat(memory) + parseFloat(currentValue);
        localStorage.setItem('memory', newValue); // Add current value to memory if it exists
    }
}

function memorySubtract() {
    let memory = localStorage.getItem('memory');
    let currentValue = display.value;
    if (memory === null) {
        localStorage.setItem('memory', -currentValue); // Set negative current value as memory if it doesn't exist
    } else {
        let newValue = parseFloat(memory) - parseFloat(currentValue);
        localStorage.setItem('memory', newValue); // Subtract current value from memory if it exists
    }
}



function factorial(n) {
    if (n === 0 || n === 1) {
        return 1; // Factorial of 0 and 1 is 1
    }
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i; // Calculate factorial iteratively
    }
    return result;
}

// Trigonometric functions
function sine() {
    let value = parseFloat(display.value);
    if (isNaN(value)) {
        display.value = 'Error'; // Handle NaN inputs
        return;
    }
    if (isDegree) value = value * (Math.PI / 180); // Convert degrees to radians if necessary
    display.value = Math.sin(value).toFixed(10).replace(/\.?0+$/, ''); // Display sine value with precision
}

function cosine() {
    let value = parseFloat(display.value);
    if (isNaN(value)) {
        display.value = 'Error'; // Handle NaN inputs
        return;
    }
    if (isDegree) value = value * (Math.PI / 180); // Convert degrees to radians if necessary
    display.value = Math.cos(value).toFixed(10).replace(/\.?0+$/, ''); // Display cosine value with precision
}

function tangent() {
    let value = parseFloat(display.value);
    if (isNaN(value)) {
        display.value = 'Error'; // Handle NaN inputs
        return;
    }
    if (isDegree) value = value * (Math.PI / 180); // Convert degrees to radians if necessary
    display.value = Math.tan(value).toFixed(10).replace(/\.?0+$/, ''); // Display tangent value with precision
}

// Square root function
function squareRoot() {
    let value = parseFloat(display.value);
    if (isNaN(value) || value < 0) {
        display.value = 'Error'; // Handle negative inputs
        return;
    }
    display.value = Math.sqrt(value); // Calculate square root and display result
}

// Logarithm functions
function log() {
    let value = parseFloat(display.value);
    if (isNaN(value) || value <= 0) {
        display.value = 'Error'; // Handle non-positive inputs
        return;
    }
    display.value = Math.log10(value); // Calculate base 10 logarithm and display result
}

function ln() {
    let value = parseFloat(display.value);
    if (isNaN(value) || value <= 0) {
        display.value = 'Error'; // Handle non-positive inputs
        return;
    }
    display.value = Math.log(value); // Calculate natural logarithm and display result
}

// Power functions
function square() {
    display.value = Math.pow(parseFloat(display.value), 2); // Calculate square and display result
}

function cube() {
    display.value = Math.pow(parseFloat(display.value), 3); // Calculate cube and display result
}




// Clear memory when page reloads
window.onload = function() {
    localStorage.removeItem('memory'); // Remove memory storage on page load
};
