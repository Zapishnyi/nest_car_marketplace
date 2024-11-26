import { ValidatorConstraintInterface } from 'class-validator';
export declare class IsMinPrise implements ValidatorConstraintInterface {
    validate(value: string, args: any): boolean;
    defaultMessage(args: any): string;
}
