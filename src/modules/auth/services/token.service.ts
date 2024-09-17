import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { EnvConfigType, JWTConfigType } from '../../../configs/envConfigType';
import { TokenTypeEnum } from '../enums/token-type.enum';
import { IJwtPayload } from '../interfaces/IJWTPayload';
import { ITokenPair } from '../interfaces/ITokenPair';

@Injectable()
export class TokenService {
  private readonly jwtConfig: JWTConfigType;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<EnvConfigType>,
  ) {
    this.jwtConfig = configService.get<JWTConfigType>('jwt');
  }

  public async generateAuthTokens(payload: IJwtPayload): Promise<ITokenPair> {
    const access = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfig.accessSecret,
      expiresIn: this.jwtConfig.accessExpire,
    });
    const refresh = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfig.refreshSecret,
      expiresIn: this.jwtConfig.refreshExpire,
    });
    return { access, refresh };
  }

  private getSecret(type: TokenTypeEnum): string {
    let secret: string;
    switch (type) {
      case TokenTypeEnum.ACCESS:
        secret = this.jwtConfig.accessSecret;
        break;
      case TokenTypeEnum.REFRESH:
        secret = this.jwtConfig.refreshSecret;
        break;
      default:
        throw new Error('Unknown token type: ' + type);
    }
    return secret;
  }

  public async verifyToken(
    token: string,
    type: TokenTypeEnum,
  ): Promise<IJwtPayload> {
    return await this.jwtService.verifyAsync(token, {
      secret: this.getSecret(type),
    });
  }
}
