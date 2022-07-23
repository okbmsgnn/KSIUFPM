import { ISize } from '../../types/ISize';

export interface ITableObject {
  date: Date;
  id: string;
  size: ISize;
  sizeMultiplier: number;
  tableId: string;
  x: number;
}
