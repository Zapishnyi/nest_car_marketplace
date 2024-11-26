"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetStoredCarDataFromResponse = void 0;
const common_1 = require("@nestjs/common");
exports.GetStoredCarDataFromResponse = (0, common_1.createParamDecorator)((data, context) => {
    return context.switchToHttp().getRequest().car_data;
});
//# sourceMappingURL=get-stored-car-data-from-response.decorator.js.map