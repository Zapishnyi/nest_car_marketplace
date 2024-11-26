import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthAccessService } from '../../modules/auth/services/auth-access.service';
import { TokenService } from '../../modules/auth/services/token.service';
import { UserRepository } from '../../modules/repository/services/user-repository.service';
export declare class JwtAccessGuard implements CanActivate {
    private readonly reflector;
    private readonly tokenService;
    private readonly authAccessService;
    private readonly userRepository;
    constructor(reflector: Reflector, tokenService: TokenService, authAccessService: AuthAccessService, userRepository: UserRepository);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
