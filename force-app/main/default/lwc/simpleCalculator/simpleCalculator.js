import { LightningElement, track } from 'lwc';

export default class SimpleCalculator extends LightningElement {
    @track currentResult;
    @track previousResults = [];
    @track showHistory = false;

    firstNumber;
    secondNumber;

    numberChangeHandler(event) {
        const inputBoxName = event.target.name;
        if (inputBoxName === 'firstNumber')
            this.firstNumber = event.target.value;

        if (inputBoxName === 'secondNumber') 
            this.secondNumber = event.target.value;
    }

    addHandler() {
        const firstNumber = parseInt(this.firstNumber);
        const secondNumber = parseInt(this.secondNumber);
        this.currentResult = `Result: ${firstNumber + secondNumber}`;
        this.previousResults.push(this.currentResult);
    }

    substractHandler() {
        const firstNumber = parseInt(this.firstNumber);
        const secondNumber = parseInt(this.secondNumber);
        this.currentResult = `Result: ${firstNumber - secondNumber}`;
        this.previousResults.push(this.currentResult);
    }

    multiplyaddHandler() {
        const firstNumber = parseInt(this.firstNumber);
        const secondNumber = parseInt(this.secondNumber);
        this.currentResult = `Result: ${firstNumber * secondNumber}`;
        this.previousResults.push(this.currentResult);
    }

    divisionHandler() {
        const firstNumber = parseInt(this.firstNumber);
        const secondNumber = parseInt(this.secondNumber);
        this.currentResult = `Result: ${firstNumber / secondNumber}`;
        this.previousResults.push(this.currentResult);
    }

    showHistoryHandler(event) {
        this.showHistory = event.target.checked;
    }
}