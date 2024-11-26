import { CarBrandResDto } from '../../car-brand-model/dto/res/car-brand.res.dto';
import { CarBrandService } from '../../car-brand-model/services/car-brand.service';
import { LocationResDto } from '../../location/dto/res/location.res.dto';
import { LocationService } from '../../location/services/location.service';
import { UserCreateByAdminReqDto } from '../dto/req/user-create-by-admin.req.dto';
import { UserUpdateByAdminReqDto } from '../dto/req/user-update-by-admin.req.dto';
import { UserResDto } from '../dto/res/user.res.dto';
import { UserPresenterService } from '../services/user-presenter.service';
import { UsersService } from '../services/users.service';
export declare class AdminController {
    private readonly usersService;
    private readonly userPresenter;
    private readonly carBrandService;
    private readonly locationService;
    constructor(usersService: UsersService, userPresenter: UserPresenterService, carBrandService: CarBrandService, locationService: LocationService);
    createUser(dto: UserCreateByAdminReqDto): Promise<UserResDto>;
    updateUser(user_id: string, dto: UserUpdateByAdminReqDto): Promise<UserResDto>;
    populateCarBrands(): Promise<CarBrandResDto[]>;
    populateLocations(): Promise<LocationResDto[]>;
}
