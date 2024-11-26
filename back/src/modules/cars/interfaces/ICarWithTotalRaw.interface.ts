import { ICarRawBase } from './ICarRawBase.interface';

export interface ICarWithTotalRaw extends ICarRawBase {
  total_count?: string;
}
