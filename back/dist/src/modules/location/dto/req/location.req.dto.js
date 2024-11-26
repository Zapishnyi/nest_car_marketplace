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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationReqDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const Transform_helper_1 = require("../../../../common/helpers/Transform.helper");
const capital_type_enum_1 = require("../../enums/capital-type.enum");
const country_enum_1 = require("../../enums/country.enum");
const country_iso_enum_1 = require("../../enums/country-iso.enum");
class LocationReqDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { city: { required: true, type: () => String, minLength: 3, maxLength: 30 }, lat: { required: true, type: () => Number }, lng: { required: true, type: () => Number }, country: { required: true, type: () => String, enum: require("../../enums/country.enum").CountryEnum }, iso2: { required: true, type: () => String, enum: require("../../enums/country-iso.enum").CountryISOEnum }, region: { required: true, type: () => String, minLength: 3, maxLength: 30 }, capital: { required: true, enum: require("../../enums/capital-type.enum").CapitalTypeEnum } };
    }
}
exports.LocationReqDto = LocationReqDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 30, {
        message: (args) => {
            return `The value '${args.value}' must be between 3 or 30 characters long.`;
        },
    }),
    (0, class_transformer_1.Transform)(Transform_helper_1.TransformHelper.trim),
    (0, swagger_1.ApiProperty)({
        description: 'City name',
        example: 'Odesa',
    }),
    __metadata("design:type", String)
], LocationReqDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsLatitude)(),
    (0, swagger_1.ApiProperty)({
        description: 'Latitude',
        example: 34.2588,
    }),
    __metadata("design:type", Number)
], LocationReqDto.prototype, "lat", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsLongitude)(),
    (0, swagger_1.ApiProperty)({
        description: 'Longitude',
        example: 34.2588,
    }),
    __metadata("design:type", Number)
], LocationReqDto.prototype, "lng", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(country_enum_1.CountryEnum, {
        message: 'Country must be : Ukraine',
    }),
    (0, class_transformer_1.Transform)(Transform_helper_1.TransformHelper.trim),
    (0, swagger_1.ApiProperty)({ enum: country_enum_1.CountryEnum, default: country_enum_1.CountryEnum.UKRAINE }),
    __metadata("design:type", String)
], LocationReqDto.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(country_iso_enum_1.CountryISOEnum, {
        message: 'Country ISO abbreviation must be : UA',
    }),
    (0, class_transformer_1.Transform)(Transform_helper_1.TransformHelper.trim),
    (0, swagger_1.ApiProperty)({ enum: country_iso_enum_1.CountryISOEnum, default: country_iso_enum_1.CountryISOEnum.UKRAINE }),
    __metadata("design:type", String)
], LocationReqDto.prototype, "iso2", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 30),
    (0, class_transformer_1.Transform)(Transform_helper_1.TransformHelper.trim),
    __metadata("design:type", String)
], LocationReqDto.prototype, "region", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(capital_type_enum_1.CapitalTypeEnum, {
        message: 'City role in Area',
    }),
    (0, class_transformer_1.Transform)(Transform_helper_1.TransformHelper.trim),
    (0, swagger_1.ApiProperty)({ enum: capital_type_enum_1.CapitalTypeEnum, default: capital_type_enum_1.CapitalTypeEnum.VOID }),
    __metadata("design:type", String)
], LocationReqDto.prototype, "capital", void 0);
//# sourceMappingURL=location.req.dto.js.map