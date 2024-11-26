import { CarBaseReqDto } from './car-base.req.dto';
declare const CarReqDto_base: import("@nestjs/common").Type<Pick<CarBaseReqDto, "model" | "brand" | "city" | "mileage" | "build" | "price" | "currency" | "description">>;
export declare class CarReqDto extends CarReqDto_base {
}
export {};
