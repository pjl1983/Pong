import './style.css';
import { Student } from './student';
function greeter(person) {
    return "Hello, " + person.fullName;
}
var user = new Student("Johnny", "B.", "Good");
document.body.innerHTML = greeter(user);
