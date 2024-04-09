"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataRepository_1 = __importDefault(require("./DataRepository"));
const FactoryRepository_1 = __importDefault(require("./FactoryRepository"));
class DataManager {
    constructor() {
        this.factoryRepository = new FactoryRepository_1.default();
        this.dataRepository = new DataRepository_1.default();
    }
    addEmployee() {
        return __awaiter(this, void 0, void 0, function* () {
            this.dataRepository.addEmployee(yield this.factoryRepository.startEmployeeCreation());
        });
    }
    listEmployees() {
        console.log(">>> Listando Funcionários");
        console.log(this.dataRepository.listEmployees());
    }
}
exports.default = DataManager;
