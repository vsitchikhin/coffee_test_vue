<template>
  <div class="page">
    <h1 class="page__header">{{ pageLabel }}</h1>
    <div class="page__content-container">
      <img :src="selectedSize.image" :alt="pageLabel" class="page__img">
      <div class="page__options-wrapper">
        <v-select
          v-model="selectedSize"
          :items="sizesForSelectList"
          label="Размер кофемашины"
          item-title="name"
          item-value="value"
          placeholder="Выберите размер кофемашины"
          variant="outlined"
          class="page__select"
        />
        <v-select
          v-model="selectedDrinkQty"
          :items="drinksForSelectList"
          label="Количество напитков"
          item-title="name"
          item-value="value"
          placeholder="Выберите количество предлагаемых напитков"
          variant="outlined"
          class="page__select"
        />
        <v-btn
          variant="outlined"
          text="Добавить в хранилище"
          size="large"
          class="page__btn"
          @click="addMachine"
        />
      </div>
    </div>
    <v-btn
      variant="outlined"
      text="Перейти в хранилище"
      size="large"
      class="page__btn"
      @click="gotoCart"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, watch } from 'vue';
import { useRouter } from 'vue-router';
import { MachinesService } from '../../modules/machines/services/machines.service';
import { useEmptyParameter } from '../../modules/machines/utils/useEmptyDataObjects';
import { ParameterDto, ParameterTypesEnum } from '../../modules/machines/types/machines.types';
import { createSelectParametersArray } from '../../modules/machines/utils/inputs.utils';


export default defineComponent({
  setup() {
    const machinesService = new MachinesService();
    const router = useRouter();

    const sizesForSelectList = computed(() =>
      createSelectParametersArray(
        machinesService.sizeList || [useEmptyParameter(ParameterTypesEnum.size)],
      ));
    const drinksForSelectList = computed(() =>
      createSelectParametersArray(
        machinesService.drinkQtyList || [useEmptyParameter(ParameterTypesEnum.qty)],
      ));

    const selectedSize = computed({
      get: () => machinesService.currentConfig?.size || useEmptyParameter(ParameterTypesEnum.size),
      set: newValue => (machinesService.updateCurrentConfiguration({ size: newValue as Required<ParameterDto> })),
    });

    const selectedDrinkQty = computed({
      get: () => machinesService.currentConfig?.qty || useEmptyParameter(ParameterTypesEnum.qty),
      set: newValue => (machinesService.updateCurrentConfiguration({ qty: newValue })),
    });

    const pageLabel = computed(() => `Кофемашина: ${selectedSize.value.name} размер, с выбором из ${selectedDrinkQty.value.name} напитков`);

    watch(pageLabel, () => machinesService.updateCurrentConfiguration({ name: pageLabel.value }));

    async function addMachine() {
      await machinesService.sendMachineToCort();
    }

    function gotoCart() {
      router.push({ name: 'cart' });
    }

    onBeforeMount(async () => {
      await machinesService.loadConfigLists();
    });

    return {
      selectedSize,
      selectedDrinkQty,
      sizesForSelectList,
      drinksForSelectList,

      pageLabel,

      addMachine,
      gotoCart,
    };
  },
});
</script>

<style scoped lang="scss">
  .page {
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 800px;

    &__header {
      font-size: 32px;
      font-weight: 600;
      line-height: 36px;
    }

    &__img {
      width: 50%;
      height: 300px;
    }

    &__content-container {
      display: flex;
      gap: 20px;
      flex-grow: 1;
    }

    &__options-wrapper {
      width: 50%;
    }
  }
</style>