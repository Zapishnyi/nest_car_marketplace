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
exports.CarsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_file_decorator_1 = require("../../common/custom_decorators/api-file.decorator");
const file_limitation_decorator_1 = require("../../common/custom_decorators/file-limitation.decorator");
const get_stored_brand_data_from_response_decorator_1 = require("../../common/custom_decorators/get-stored-brand-data-from-response.decorator");
const get_stored_car_data_from_response_decorator_1 = require("../../common/custom_decorators/get-stored-car-data-from-response.decorator");
const get_stored_location_data_from_response_decorator_1 = require("../../common/custom_decorators/get-stored-location-data-from-response.decorator");
const get_stored_user_data_from_response_decorator_1 = require("../../common/custom_decorators/get-stored-user-data-from-response.decorator");
const ban_guard_1 = require("../../common/guards/ban.guard");
const brand_validate_guard_1 = require("../../common/guards/brand-validate.guard");
const car_update_brand_validate_guard_1 = require("../../common/guards/car-update-brand-validate.guard");
const jwt_access_guard_1 = require("../../common/guards/jwt-access.guard");
const location_validate_guard_1 = require("../../common/guards/location-validate.guard");
const ownership_guard_1 = require("../../common/guards/ownership.guard");
const user_plan_guard_1 = require("../../common/guards/user-plan.guard");
const bad_words_pipe_1 = require("../../common/pipes/bad-words.pipe");
const car_req_dto_1 = require("./dto/req/car.req.dto");
const car_image_type_query_req_dto_1 = require("./dto/req/car-image-type-query.req.dto");
const car_query_req_dto_1 = require("./dto/req/car-query.req.dto");
const car_query_statistic_req_dto_1 = require("./dto/req/car-query-statistic.req.dto");
const car_update_req_dto_1 = require("./dto/req/car-update.req.dto");
const cars_query_req_dto_1 = require("./dto/req/cars-query.req.dto");
const car_presenter_service_1 = require("./services/car-presenter.service");
const cars_service_1 = require("./services/cars.service");
let CarsController = class CarsController {
    constructor(carsService, carPresenter) {
        this.carsService = carsService;
        this.carPresenter = carPresenter;
    }
    async search(query) {
        return this.carPresenter.toResponseListDto(await this.carsService.search(query), query);
    }
    async getCar(car_id, query) {
        return this.carPresenter.RawToResponseDto(await this.carsService.getCar(car_id, query));
    }
    async create(userData, brandData, locationData, dto) {
        return this.carPresenter.entityToResponseDto(await this.carsService.create(userData, brandData, locationData, dto));
    }
    async update(carData, userData, brandData, car_id, dto) {
        return this.carPresenter.entityToResponseDto(await this.carsService.update(carData, brandData, userData, dto));
    }
    async delete(car_id, car_data) {
        return await this.carsService.delete(car_data);
    }
    async uploadImage(image, query, car_id, user_data, car_data) {
        await this.carsService.uploadImage(user_data, car_data, image, query);
    }
    async deleteImage(car_id, image_id, user_data, car_data) {
        await this.carsService.deleteImage(user_data, car_data, car_id, image_id);
    }
    async getCarStatistic(car_id, query) {
        return this.carPresenter.RawToResponseDto(await this.carsService.getCar(car_id, query));
    }
};
exports.CarsController = CarsController;
__decorate([
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Unauthorized',
        example: {
            statusCode: 401,
            messages: 'Unauthorized',
            timestamp: new Date(),
            path: '/car',
        },
    }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden' }),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: require("./dto/res/car-list.res.dto").CarListResDto }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cars_query_req_dto_1.CarsQueryReqDto]),
    __metadata("design:returntype", Promise)
], CarsController.prototype, "search", null);
__decorate([
    (0, swagger_1.ApiNotFoundResponse)({
        example: {
            statusCode: 404,
            messages: 'Car does not exist',
            timestamp: '2024-09-29T16:44:02.125Z',
            path: '/car/:car_id',
        },
    }),
    (0, swagger_1.ApiConflictResponse)({
        example: {
            statusCode: 409,
            messages: 'invalid input syntax for type uuid: "248784cb-0c61-4fba-92b3-cdf0077c266r"',
            timestamp: '2024-09-29T16:47:36.137Z',
            path: '/car/:car_id',
        },
    }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden' }),
    (0, common_1.Get)(':car_id'),
    openapi.ApiResponse({ status: 200, type: require("./dto/res/car.res.dto").CarResDto }),
    __param(0, (0, common_1.Param)('car_id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, car_query_req_dto_1.CarQueryReqDto]),
    __metadata("design:returntype", Promise)
], CarsController.prototype, "getCar", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Unauthorized',
        example: {
            statusCode: 401,
            messages: 'Unauthorized',
            timestamp: new Date(),
            path: '/car/:car_id',
        },
    }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden' }),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, ban_guard_1.BanGuard, brand_validate_guard_1.BrandValidateGuard, location_validate_guard_1.LocationValidateGuard),
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./dto/res/car-create.res.dto").CarCreateResDto }),
    __param(0, (0, get_stored_user_data_from_response_decorator_1.GetStoredUserDataFromResponse)()),
    __param(1, (0, get_stored_brand_data_from_response_decorator_1.GetStoredBrandDataFromResponse)()),
    __param(2, (0, get_stored_location_data_from_response_decorator_1.GetStoredLocationDataFromResponse)()),
    __param(3, (0, common_1.Body)(bad_words_pipe_1.BadWordsPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, car_req_dto_1.CarReqDto]),
    __metadata("design:returntype", Promise)
], CarsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Unauthorized',
        example: {
            statusCode: 401,
            messages: 'Unauthorized',
            timestamp: new Date(),
            path: '/car/:car_id',
        },
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        example: {
            statusCode: 404,
            messages: 'Car does not exist',
            timestamp: '2024-09-29T16:44:02.125Z',
            path: '/car/:car_id',
        },
    }),
    (0, swagger_1.ApiConflictResponse)({
        example: {
            statusCode: 409,
            messages: 'invalid input syntax for type uuid: "248784cb-0c61-4fba-92b3-cdf0077c266r"',
            timestamp: '2024-09-29T16:47:36.137Z',
            path: '/car/:car_id',
        },
    }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden' }),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, ownership_guard_1.OwnershipGuard, car_update_brand_validate_guard_1.CarUpdateBrandValidateGuard),
    (0, common_1.Patch)(':car_id'),
    openapi.ApiResponse({ status: 200, type: require("./dto/res/car.res.dto").CarResDto }),
    __param(0, (0, get_stored_car_data_from_response_decorator_1.GetStoredCarDataFromResponse)()),
    __param(1, (0, get_stored_user_data_from_response_decorator_1.GetStoredUserDataFromResponse)()),
    __param(2, (0, get_stored_brand_data_from_response_decorator_1.GetStoredBrandDataFromResponse)()),
    __param(3, (0, common_1.Param)('car_id', common_1.ParseUUIDPipe)),
    __param(4, (0, common_1.Body)(bad_words_pipe_1.BadWordsPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, String, car_update_req_dto_1.CarUpdateReqDto]),
    __metadata("design:returntype", Promise)
], CarsController.prototype, "update", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiNoContentResponse)({ description: 'Car deleted successfully' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Unauthorized',
        example: {
            statusCode: 401,
            messages: 'Unauthorized',
            timestamp: new Date(),
            path: '/car/:car_id',
        },
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        example: {
            statusCode: 404,
            messages: 'Car does not exist',
            timestamp: '2024-09-29T16:44:02.125Z',
            path: '/car/b795b60b-4d8f-41ac-87b8-b4ac3f7d1619',
        },
    }),
    (0, swagger_1.ApiConflictResponse)({
        example: {
            statusCode: 409,
            messages: 'invalid input syntax for type uuid: "248784cb-0c61-4fba-92b3-cdf0077c266r"',
            timestamp: '2024-09-29T16:47:36.137Z',
            path: '/car/248784cb-0c61-4fba-92b3-cdf0077c266r',
        },
    }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden' }),
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, ownership_guard_1.OwnershipGuard),
    (0, common_1.Delete)(':car_id'),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Param)('car_id', common_1.ParseUUIDPipe)),
    __param(1, (0, get_stored_car_data_from_response_decorator_1.GetStoredCarDataFromResponse)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CarsController.prototype, "delete", null);
__decorate([
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, ownership_guard_1.OwnershipGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiPayloadTooLargeResponse)({
        description: 'Filesize is more than 0.5MB',
        example: {
            statusCode: 413,
            messages: 'File too large',
            timestamp: '2024-10-09T14:25:21.476Z',
            path: '/car/2d56d0df-cf5f-4d13-bab0-28b1ec775527/image?image_type=primary_car_image',
        },
    }),
    (0, swagger_1.ApiNoContentResponse)({ description: 'Car image saved successfully' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, file_limitation_decorator_1.FileLimitation)('image', 1024 * 500),
    (0, api_file_decorator_1.ApiFile)('image', false, true, '0.5MB'),
    (0, common_1.Post)(':car_id/image'),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Param)('car_id', common_1.ParseUUIDPipe)),
    __param(3, (0, get_stored_user_data_from_response_decorator_1.GetStoredUserDataFromResponse)()),
    __param(4, (0, get_stored_car_data_from_response_decorator_1.GetStoredCarDataFromResponse)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, car_image_type_query_req_dto_1.CarImageQueryReqDto, String, Object, Object]),
    __metadata("design:returntype", Promise)
], CarsController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, ownership_guard_1.OwnershipGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiNoContentResponse)({ description: 'Car image removed successfully' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)(':car_id/image/:image_id'),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Param)('car_id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Param)('image_id', common_1.ParseUUIDPipe)),
    __param(2, (0, get_stored_user_data_from_response_decorator_1.GetStoredUserDataFromResponse)()),
    __param(3, (0, get_stored_car_data_from_response_decorator_1.GetStoredCarDataFromResponse)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], CarsController.prototype, "deleteImage", null);
__decorate([
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, ownership_guard_1.OwnershipGuard, user_plan_guard_1.UserPlanGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiNotFoundResponse)({
        example: {
            statusCode: 404,
            messages: 'Car does not exist',
            timestamp: '2024-09-29T16:44:02.125Z',
            path: '/car/:car_id',
        },
    }),
    (0, swagger_1.ApiConflictResponse)({
        example: {
            statusCode: 409,
            messages: 'invalid input syntax for type uuid: "248784cb-0c61-4fba-92b3-cdf0077c266r"',
            timestamp: '2024-09-29T16:47:36.137Z',
            path: '/car/:car_id',
        },
    }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden' }),
    (0, common_1.Get)(':car_id/statistic/'),
    openapi.ApiResponse({ status: 200, type: require("./dto/res/car.res.dto").CarResDto }),
    __param(0, (0, common_1.Param)('car_id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, car_query_statistic_req_dto_1.CarQueryStatisticReqDto]),
    __metadata("design:returntype", Promise)
], CarsController.prototype, "getCarStatistic", null);
exports.CarsController = CarsController = __decorate([
    (0, swagger_1.ApiTags)('7.Car'),
    (0, common_1.Controller)('car'),
    __metadata("design:paramtypes", [cars_service_1.CarsService,
        car_presenter_service_1.CarPresenterService])
], CarsController);
//# sourceMappingURL=cars.controller.js.map