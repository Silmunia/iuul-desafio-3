"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DataRepository {
    constructor() {
        this.employees = [];
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    getEmployees() {
        return [...this.employees];
    }
    clearEmployees() {
        this.employees = [];
    }
}
exports.default = DataRepository;
