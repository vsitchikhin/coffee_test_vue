import { ParameterDto } from '../types/machines.types';

export interface ISelectionParameter {
  name: string;
  value: ParameterDto;
}

export function createSelectParametersArray(paramsList: ParameterDto[]) {
  const result: ISelectionParameter[] = [];

  paramsList.forEach(p => {
    result.push({ name: p.name, value: p });
  });

  return result;
}