import { CurrencyEnum } from '@/enums/currency.enum';

export default interface ICar {
  model: string,
  description: string,
  mileage: number,
  build: number,
  image: string[  ],
  price_initial: number,
  currency_initial: CurrencyEnum,
  price_calculated: number,
  currency_requested: CurrencyEnum,
  location_city: string,
  location_region: string,
  location_country: string,
  owner_id: string,
  owner_first_name: string,
  owner_last_name: string,
  owner_email: string,
  owner_phone: string
}
