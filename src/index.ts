import './style.css';
import {Student} from './student';

function greeter(person: Student) {
    return "Hello, " + person.fullName;
}

let user = new Student("Johnny", "B.", "Good");


document.body.innerHTML = greeter(user);