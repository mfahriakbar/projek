document.getElementById('login-button').addEventListener('click', function() {
    this.style.opacity = '0';
    this.style.transform = 'scale(0.8) rotate(-45deg)';
    setTimeout(() => {
        this.style.display = 'none';
        const loginContainer = document.getElementById('login-container');
        loginContainer.style.display = 'block';
        setTimeout(() => {
            loginContainer.classList.add('active');
        }, 50);
    }, 300);
});

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = this.querySelector('input[name="username"]').value;
    const password = this.querySelector('input[name="password"]').value;
    const errorMessage = document.getElementById('error-message');

    // Check credentials
    if (username === 'fahri' && password === 'fahri') {
        errorMessage.style.display = 'none';
        const loginContainer = document.getElementById('login-container');
        const successCheckmark = document.querySelector('.success-checkmark');
        
        loginContainer.classList.add('exit');
        setTimeout(() => {
            loginContainer.style.display = 'none';
            successCheckmark.classList.add('active');
            
            // After success animation, show calculator
            setTimeout(() => {
                successCheckmark.classList.remove('active');
                const calculator = document.getElementById('calculator');
                calculator.style.display = 'block';
                setTimeout(() => {
                    calculator.classList.add('active');
                }, 50);
            }, 1000);
        }, 500);
    } else {
        errorMessage.style.display = 'block';
        this.classList.add('shake');
        setTimeout(() => this.classList.remove('shake'), 400);
    }
});

// Calculator functionality
let display = document.querySelector('.display');
let currentValue = '0';
let previousValue = null;
let operator = null;
let waitingForSecondOperand = false;

function updateDisplay() {
    display.textContent = currentValue;
}

document.querySelector('.calculator-grid').addEventListener('click', (e) => {
    if (!e.target.matches('button')) return;
    
    const button = e.target;
    const buttonValue = button.textContent;

    if (button.classList.contains('operator')) {
        handleOperator(buttonValue);
    } else if (button.classList.contains('clear')) {
        clear();
    } else if (button.classList.contains('equals')) {
        calculate();
    } else {
        handleNumber(buttonValue);
    }

    updateDisplay();
});

function handleNumber(num) {
    if (waitingForSecondOperand) {
        currentValue = num;
        waitingForSecondOperand = false;
    } else {
        currentValue = currentValue === '0' ? num : currentValue + num;
    }
}

function handleOperator(op) {
    if (op === '±') {
        currentValue = (-parseFloat(currentValue)).toString();
        return;
    }
    
    if (op === '%') {
        currentValue = (parseFloat(currentValue) / 100).toString();
        return;
    }

    const inputValue = parseFloat(currentValue);
    
    if (previousValue === null) {
        previousValue = inputValue;
    } else if (operator) {
        const result = calculate();
        currentValue = String(result);
        previousValue = result;
    }
    
    operator = op;
    waitingForSecondOperand = true;
}

function calculate() {
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    let result;
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            if (current === 0) {
                alert('Cannot divide by zero');
                clear();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    
    operator = null;
    previousValue = null;
    currentValue = String(result);
    return result;
}

function clear() {
    currentValue = '0';
    previousValue = null;
    operator = null;
    waitingForSecondOperand = false;
}