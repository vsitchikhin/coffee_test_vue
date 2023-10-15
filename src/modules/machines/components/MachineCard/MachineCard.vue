<template>
  <v-card class="machine-card">
    <h2 class="machine-card__name">
      {{ currentMachine.name }}
    </h2>
    <div class="machine-card__info">
      <img :src="currentMachine.size.image" :alt="currentMachine.name" class="machine-card__image">
      <div class="machine-card__options">
        <div class="machine-card__option">Размер: {{ currentMachine.size.name }}</div>
        <div class="machine-card__option">Кол-во напитков: {{ currentMachine.qty.name }}</div>
      </div>
      <div class="machine-card__count-block">
        <v-btn text="+" size="large" variant="outlined" class="machine-card__count-input" @click="incrementCount" />
        <v-text-field v-model="currentMachine.count" density="compact" variant="outlined" label="Количество" class="machine-card__count-input" />
        <v-btn text="-" size="large" variant="outlined" class="machine-card__count-input" @click="decrementCount" />
      </div>
    </div>
    <v-btn text="Удалить из хранилища" variant="outlined" color="red" class="machine-card__delete" @click="deleteMachine" />
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { CoffeeMachineDto } from '../../types/machines.types';
import { MachinesService } from '../../services/machines.service';
import { deepCopyObject } from '../../utils/objects.utils';

export default defineComponent({
  props: {
    machine: {
      type: Object as PropType<CoffeeMachineDto>,
      required: true,
    },
  },

  setup(props) {
    const machineService = new MachinesService();
    const currentMachine = ref<CoffeeMachineDto>(deepCopyObject(props.machine));

    async function incrementCount() {
      currentMachine.value.count = currentMachine.value.count + 1;
      await machineService.updateMachinesCount(currentMachine.value);
    }

    async function decrementCount() {
      currentMachine.value.count = currentMachine.value.count - 1;

      if (!currentMachine.value.count) {
        await deleteMachine();
        return;
      }

      await machineService.updateMachinesCount(currentMachine.value);
    }

    async function deleteMachine() {
      await machineService.deleteMachineFromCort(currentMachine.value);
    }

    return {
      currentMachine,

      incrementCount,
      decrementCount,
      deleteMachine,
    };
  },
});
</script>

<style scoped lang="scss">
  .machine-card {
    padding: 20px;
    display: flex;
    flex-direction: column;

    gap: 20px;

    &__name {
      font-size: 24px;
      font-weight: 600;
      line-height: 28px;
    }

    &__image {
      width: 180px;
      height: 120px;
    }

    &__info {
      display: flex;
      justify-content: space-between;
    }

    &__options {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    &__option {
      font-size: 20px;
      font-weight: 400;
      line-height: 24px;
    }

    &__count-block {
      display: flex;
      max-width: 600px;
      max-height: 68px;
      gap: 5px;
    }

    &__count-input {
      max-width: 120px;
    }
  }

</style>