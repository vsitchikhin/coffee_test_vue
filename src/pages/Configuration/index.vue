<template>
  <div class="page">
    <h1 class="page__header">{{ pageLabel }}</h1>
    <div class="page__content-container">
      <img :src="selectedSize.image" :alt="pageLabel">
      <div class="page__options-wrapper">
        <v-radio-group v-model="selectedSize">
          <v-radio v-for="item in sizesList" :key="item.id" :value="item" :label="item.name" />
        </v-radio-group>
        <v-radio-group v-model="selectedDrinkQty">
          <v-radio v-for="item in drinkQtyList" :key="item.id" :value="item" :label="item.name" />
        </v-radio-group>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import { MachinesService } from '../../modules/machines/services/machines.service';
import { useEmptyParameter } from '../../modules/machines/utils/useEmptyDataObjects';
import { ParameterDto, ParameterTypesEnum } from '../../modules/machines/types/machines.types';


export default defineComponent({
  setup() {
    const machinesService = new MachinesService();

    const sizesList = computed(() => machinesService.sizeList);
    const drinkQtyList = computed(() => machinesService.drinkQtyList);

    const selectedSize = computed({
      get: () => machinesService.currentConfig?.size || useEmptyParameter(ParameterTypesEnum.size),
      set: newValue => (machinesService.updateCurrentConfiguration({ size: newValue as Required<ParameterDto> })),
    });

    const selectedDrinkQty = computed({
      get: () => machinesService.currentConfig?.qty || useEmptyParameter(ParameterTypesEnum.qty),
      set: newValue => (machinesService.updateCurrentConfiguration({ qty: newValue })),
    });

    const pageLabel = computed({
      get: () => `Кофемашина ${selectedSize.value.name} размер, с выбором из ${selectedDrinkQty.value.name} напитков`,
      set: newValue => (machinesService.updateCurrentConfiguration({ name: newValue })),
    });

    onMounted(async () => {
      await machinesService.loadConfigLists();
    });

    return {
      sizesList,
      drinkQtyList,
      selectedSize,
      selectedDrinkQty,

      pageLabel,
    };
  },
});
</script>

<style scoped>

</style>