import { CoffeeMachineDto, ParameterDto, ParameterTypesEnum } from '../types/machines.types';
import { ID_FOR_NEW_ENTITY } from '../../../consts/base.consts';

export function useEmptyParameter(type: ParameterTypesEnum): ParameterDto {
  return {
    id: ID_FOR_NEW_ENTITY,
    name: '',
    value: '',
    code: type,
    image: type === ParameterTypesEnum.size ? '' : undefined,
  };
}

export function useNewConfig(conf?: Partial<CoffeeMachineDto>): CoffeeMachineDto {
  let result = {
    id: ID_FOR_NEW_ENTITY,
    name: '',
    count: 0,
    size: useEmptyParameter(ParameterTypesEnum.size),
    qty: useEmptyParameter(ParameterTypesEnum.qty),
  };

  result = {
    ...result,
    ...conf,
  };

  return result;
}
