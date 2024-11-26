import { CarBrandEntity } from '../../../database/entities/car-brand.entity';
import { GetBrandsModelsQueryReqDto } from '../dto/req/get-brand-model-query.req.dto';
import { CarBrandResDto } from '../dto/res/car-brand.res.dto';
import { CarBrandListResDto } from '../dto/res/car-brand-list.res.dto';
import { CarModelPresenterService } from './to_delete/car-model-presenter.service';
export declare class CarBrandPresenterService {
    private readonly carModelPresenter;
    constructor(carModelPresenter: CarModelPresenterService);
    toResponseDto({ name, models }: CarBrandEntity): CarBrandResDto;
    toResponseListDto(entities: CarBrandEntity[], query: GetBrandsModelsQueryReqDto, total: number): CarBrandListResDto;
}
