import { Service } from '../../service';
import { machinesStore } from './machines.store';
import { CoffeeMachineDto, IResponse, ParameterDto, ParameterTypesEnum } from '../types/machines.types';
import axios from 'axios';
import { useNewConfig } from '../utils/useEmptyDataObjects';


export class MachinesService extends Service {
  private store;
  private apiPath = `${this.baseUrl}/machines`;

  public constructor() {
    super();
    this.store = machinesStore();
  }

  // ------------------------------------------------------------------
  // Геттеры данных
  public get currentConfig(): CoffeeMachineDto | null {
    return this.store.currentConfig;
  }

  public get machineList(): CoffeeMachineDto[] | null {
    return this.store.machineList;
  }

  public get sizeList(): Required<ParameterDto[]> | null {
    return this.store.sizeList;
  }

  public get drinkQtyList(): ParameterDto[] | null {
    return this.store.drinkQtyList;
  }

  // ------------------------------------------------------------------
  // API запросы
  public async loadMachineList() {
    try {
      const { data } = await axios.get<IResponse<CoffeeMachineDto[]>>(`${this.apiPath}/`);

      if (data?.payload) {
        this.store.SET_MACHINE_LIST_PAYLOAD(data.payload);
      }
    } catch(e) {
      console.log(e);
    }
  }

  public async loadConfigLists() {
    try {
      const { data } = await axios.get<IResponse<ParameterDto[]>>(`${this.apiPath}/parameters`);

      if (data.payload) {
        this.updateConfigValues(data.payload);
      }
    } catch(e) {
      console.log(e);
    }
  }

  public async sendMachineToCort(payload: CoffeeMachineDto) {
    try {
      await axios.post<IResponse<boolean>>(`${this.apiPath}/`, payload);
    } catch(e) {
      console.log(e);
    }
  }

  public async deleteMachineFromCort(payload: CoffeeMachineDto) {
    try {
      await axios.delete<IResponse<boolean>>(`${this.apiPath}/${payload.id}`);
    } catch(e) {
      console.log(e);
    }
  }

  public async updateMachinesCount(payload: CoffeeMachineDto) {
    try {
      await axios.patch<IResponse<boolean>>(`${this.apiPath}/${payload.id}`, payload);
    } catch(e) {
      console.log(e);
    }
  }

  // ------------------------------------------------------------------
  // Методы обновления стора
  private updateConfigValues(payload: ParameterDto[]) {
    const sizes = payload.filter(p => p.code === ParameterTypesEnum.size);
    const qtys = payload.filter(p => p.code === ParameterTypesEnum.qty);

    this.store.SET_DRINK_QTY_LIST_PAYLOAD(qtys);
    this.store.SET_SIZE_LIST_PAYLOAD(sizes);
  }

  public updateCurrentConfiguration(conf: Partial<CoffeeMachineDto>) {
    if (!this.currentConfig) {
      this.store.SET_CURRENT_CONFIG(useNewConfig(conf));
      return;
    }

    const config: CoffeeMachineDto = {
      ...this.currentConfig,
      ...conf,
    };
    this.store.SET_CURRENT_CONFIG(config);
  }
}