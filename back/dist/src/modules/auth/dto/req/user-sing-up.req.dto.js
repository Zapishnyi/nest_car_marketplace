"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSingUpReqDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const base_user_auth_req_dto_1 = require("./base-user-auth.req.dto");
class UserSingUpReqDto extends (0, swagger_1.PickType)(base_user_auth_req_dto_1.BaseUserAuthReqDto, [
    'email',
    'password',
    'phone',
    'first_name',
    'last_name',
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UserSingUpReqDto = UserSingUpReqDto;
//# sourceMappingURL=user-sing-up.req.dto.js.map