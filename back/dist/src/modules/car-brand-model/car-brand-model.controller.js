"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarBrandModelController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const car_brand_repository_service_1 = require("../repository/services/car-brand-repository.service");
const get_brand_model_query_req_dto_1 = require("./dto/req/get-brand-model-query.req.dto");
const car_brand_service_1 = require("./services/car-brand.service");
let CarBrandModelController = class CarBrandModelController {
    constructor(carBrandService, carBrandRepository) {
        this.carBrandService = carBrandService;
        this.carBrandRepository = carBrandRepository;
    }
    async getCarBrandsModels(query) {
        return await this.carBrandService.getBrandsModels(query);
    }
};
exports.CarBrandModelController = CarBrandModelController;
__decorate([
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden' }),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: require("./dto/res/car-brand-list.res.dto").CarBrandListResDto }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_brand_model_query_req_dto_1.GetBrandsModelsQueryReqDto]),
    __metadata("design:returntype", Promise)
], CarBrandModelController.prototype, "getCarBrandsModels", null);
exports.CarBrandModelController = CarBrandModelController = __decorate([
    (0, swagger_1.ApiTags)('5.Car brands and models'),
    (0, common_1.Controller)('brands-and-models'),
    __metadata("design:paramtypes", [car_brand_service_1.CarBrandService,
        car_brand_repository_service_1.CarBrandRepository])
], CarBrandModelController);
//# sourceMappingURL=car-brand-model.controller.js.map