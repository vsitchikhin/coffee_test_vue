import { defineStore } from 'pinia';
import { CoffeeMachineDto, ParameterDto } from 'modules/machines/types/machines.types';

export const machinesStore = defineStore({
  id: 'machines',

  state: () => ({
    currentConfig: null as CoffeeMachineDto | null,
    machineList: null as CoffeeMachineDto[] | null,

    sizeList: null as Required<ParameterDto[]> | null,
    drinkQtyList: null as ParameterDto[] | null,
  }),

  actions: {
    SET_CURRENT_CONFIG(conf: CoffeeMachineDto | null) {
      if (!this.currentConfig) {
        this.currentConfig = conf;
        return;
      }

      this.currentConfig = {
        ...this.currentConfig,
        ...conf,
      };
    },

    SET_MACHINE_LIST_PAYLOAD(payload: CoffeeMachineDto[] | null) {
      this.machineList = payload;
    },

    SET_SIZE_LIST_PAYLOAD(payload: Required<ParameterDto[]> | null) {
      this.sizeList = payload;
    },
    
    SET_DRINK_QTY_LIST_PAYLOAD(payload: ParameterDto[] | null) {
      this.drinkQtyList = payload;
    },
  },
});
