import { LightningElement, track } from 'lwc';

export default class ToDoManager extends LightningElement {
    currentTime = '';
    greeting = '';
    @track todos = [];

    connectedCallback() {
        this.getTime();

        setInterval(() => {
            this.getTime();
        }, 1000*60);
    }

    getTime() {
        const date = new Date();
        const hour = date.getHours();
        const minute = date.getMinutes();

        this.currentTime = `${this.getHours(hour)}:${this.getDoubleDigit(minute)} ${this.getMidDay(hour)}`;
        this.setGreetings(hour);
    }

    getHours(hour) {
        return hour === 0 ? 12 : hour > 12 ? (hour - 12) : hour;
    }

    getMidDay(hour){
        return hour >= 12 ? 'PM' : 'AM';
    }

    getDoubleDigit(digit) {
        return digit<10 ? '0'+digit : digit;
    }

    setGreetings(hour) {
        if (hour < 12) {
            this.greeting = 'Good Morning';
        } else if (hour >= 12 && hour < 17) {
            this.greeting = 'Good Afternoon';
        } else {
            this.greeting = 'Good Evening';
        }
    }

    addTodoHandler() {
        const inputBox = this.template.querySelector('lightning-input');
        
        const todo = {
            todoId: this.todos.length,
            todoName: inputBox.value,
            done: false,
            todoDate: new Date()
        };

        this.todos.push(todo);

        console.log('this.todos', this.todos);

        inputBox.value = '';
    }

    get upcomingTasks() {
        return this.todos && this.todos.length 
        ? this.todos.filter(todo => !todo.done) 
        : [];
    }

    get completedTasks() {
        return this.todos && this.todos.length 
        ? this.todos.filter(todo => todo.done) 
        : [];
    }
}