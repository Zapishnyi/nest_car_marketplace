import { CarBrandRepository } from '../repository/services/car-brand-repository.service';
import { GetBrandsModelsQueryReqDto } from './dto/req/get-brand-model-query.req.dto';
import { CarBrandListResDto } from './dto/res/car-brand-list.res.dto';
import { CarBrandService } from './services/car-brand.service';
export declare class CarBrandModelController {
    private readonly carBrandService;
    private readonly carBrandRepository;
    constructor(carBrandService: CarBrandService, carBrandRepository: CarBrandRepository);
    getCarBrandsModels(query: GetBrandsModelsQueryReqDto): Promise<CarBrandListResDto>;
}
