export interface ParameterDto {
  id: string | number;
  name: string
  value: string;
  code: ParameterTypesEnum;
  image?: string;
}

export interface CoffeeMachineDto {
  id: string | number;
  name: string;
  count: number;
  size: Required<ParameterDto>;
  qty: ParameterDto;
}

export interface IResponse<T> {
  payload: T;
  error: boolean;
  errorCode: string;
  msg: string;
}

export enum ParameterTypesEnum {
  qty = 'DRINKS_QTY',
  size = 'SIZE',
}