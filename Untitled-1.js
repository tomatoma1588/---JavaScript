// Клас Employee
class Employee {
    constructor(firstName, lastName, baseSalary, experience) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.baseSalary = baseSalary;
        this.experience = experience;
    }

    countedSalary() {
        if (this.experience > 5) {
            return this.baseSalary * 1.2 + 500;
        } else if (this.experience > 2) {
            return this.baseSalary + 200;
        } else {
            return this.baseSalary;
        }
    }
}

// Клас Developer - підклас Employee
class Developer extends Employee {
    constructor(firstName, lastName, baseSalary, experience) {
        super(firstName, lastName, baseSalary, experience);
    }
}

// Клас Designer - підклас Employee
class Designer extends Employee {
    constructor(firstName, lastName, baseSalary, experience, effCoeff) {
        super(firstName, lastName, baseSalary, experience);
        this.efficiencyCoefficient = effCoeff;
    }

    countedSalary() {
        let baseSalary = super.countedSalary();
        return baseSalary * this.efficiencyCoefficient;
    }
}

// Клас Manager - підклас Employee
class Manager extends Employee {
    constructor(firstName, lastName, baseSalary, experience, team) {
        super(firstName, lastName, baseSalary, experience);
        this.team = team;
    }

    countedSalary() {
        let baseSalary = super.countedSalary();
        let teamSize = this.team.length;
        let numDevelopers = this.team.filter(emp => emp instanceof Developer).length;
        
        // Bonus for team size
        if (teamSize > 10) {
            baseSalary += 300;
        } else if (teamSize > 5) {
            baseSalary += 200;
        }

        // Bonus for more than half developers in the team
        if (numDevelopers > teamSize / 2) {
            baseSalary *= 1.1;
        }

        return baseSalary;
    }
}

// Клас Department
class Department {
    constructor(managers) {
        this.managers = managers;
    }

    giveSalary() {
        this.managers.forEach(manager => {
            manager.team.forEach(employee => {
                let salary = employee.countedSalary();
                console.log(`${employee.firstName} ${employee.lastName} отримав ${salary} шекелів.`);
            });
        });
    }
}

// Створення працівників
let dev1 = new Developer("John", "Doe", 3000, 3);
let dev2 = new Developer("Jane", "Smith", 3500, 6);

let des1 = new Designer("Emily", "Jones", 4000, 4, 0.8);
let des2 = new Designer("Michael", "Brown", 4500, 7, 0.9);

// Створення менеджерів з командами
let manager1 = new Manager("Tom", "Williams", 5000, 5, [dev1, des1]);
let manager2 = new Manager("Sophia", "Davis", 5500, 8, [dev2, des2]);

// Створення об'єкту Department з менеджерами
let department = new Department([manager1, manager2]);

// Виведення зарплати для всіх працівників департаменту
department.giveSalary();
