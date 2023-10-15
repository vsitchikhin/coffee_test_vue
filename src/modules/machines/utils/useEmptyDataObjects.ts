import { CoffeeMachineDto, ParameterDto, ParameterTypesEnum } from '../types/machines.types';
import { ID_FOR_NEW_ENTITY } from '../../../consts/base.consts';

export function useEmptyParameter(type: ParameterTypesEnum): ParameterDto {
  return {
    id: ID_FOR_NEW_ENTITY,
    name: 'не указан',
    value: '',
    code: type,
    image: type === ParameterTypesEnum.size ? '' : undefined,
  };
}

export function useNewConfig(conf?: Partial<CoffeeMachineDto>): CoffeeMachineDto {
  let result: CoffeeMachineDto = {
    id: ID_FOR_NEW_ENTITY,
    name: 'не указан',
    count: 0,
    size: <Required<ParameterDto>>useEmptyParameter(ParameterTypesEnum.size),
    qty: useEmptyParameter(ParameterTypesEnum.qty),
  };

  result = {
    ...result,
    ...conf,
  };

  return result;
}
