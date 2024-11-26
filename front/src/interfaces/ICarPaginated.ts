import { CurrencyEnum } from '@/enums/currency.enum';
import { OrderEnum } from '@/enums/order.enum';
import ICar from '@/interfaces/ICar';

export default interface ICarPaginated {
  data: ICar[],
  total: number,
  limit: number,
  page: number,
  pages: number,
  order: OrderEnum,
  orderBy: string,
  currency: CurrencyEnum,
  brand: string,
  model: string,
  city: string,
  area: string,
  price_min: number,
  price_max: number,
  build_min: number,
  build_max: number,
  mileage_min: number,
  mileage_max: number
}