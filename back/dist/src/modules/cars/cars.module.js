"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarsModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../auth/auth.module");
const aws_storage_module_1 = require("../aws-storage/aws-storage.module");
const car_brand_model_module_1 = require("../car-brand-model/car-brand-model.module");
const mail_module_1 = require("../mailer/mail.module");
const repository_module_1 = require("../repository/repository.module");
const users_module_1 = require("../users/users.module");
const cars_controller_1 = require("./cars.controller");
const car_presenter_service_1 = require("./services/car-presenter.service");
const cars_service_1 = require("./services/cars.service");
let CarsModule = class CarsModule {
};
exports.CarsModule = CarsModule;
exports.CarsModule = CarsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            repository_module_1.RepositoryModule,
            users_module_1.UsersModule,
            car_brand_model_module_1.CarBrandModelModule,
            aws_storage_module_1.AwsStorageModule,
            mail_module_1.MailModule,
        ],
        controllers: [cars_controller_1.CarsController],
        providers: [cars_service_1.CarsService, car_presenter_service_1.CarPresenterService],
        exports: [cars_service_1.CarsService],
    })
], CarsModule);
//# sourceMappingURL=cars.module.js.map