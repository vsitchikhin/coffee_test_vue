<template>
  <div class="page">
    <template v-if="showMachinesList">
      <machine-card v-for="item in machinesList" :key="item.id" :machine="item" />
    </template>
    <template v-else>
      <h1 class="page__header">
        На данный момент в хранилище нет ни одной кофемашины.
      </h1>
    </template>
    <v-btn
      variant="outlined"
      text="Перейти к конфигурации"
      size="large"
      class="page__btn"
      @click="gotoConf"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount } from 'vue';
import { MachinesService } from '../../modules/machines/services/machines.service';
import MachineCard from '../../modules/machines/components/MachineCard/MachineCard.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: { MachineCard },
  setup() {
    const machinesService = new MachinesService();
    const router = useRouter();

    // ----------------------------------------------------------------
    // Параметры отображения
    const machinesList = computed(() => machinesService.machineList);

    const showMachinesList = computed(() => !!machinesList.value && !!machinesList.value.length);

    // ----------------------------------------------------------------
    // Роутинг
    function gotoConf() {
      router.push({ name: 'config' });
    }

    // ----------------------------------------------------------------
    // Загрузка данных
    onBeforeMount(async () => {
      await machinesService.loadMachineList();
    });

    return {
      machinesList,
      showMachinesList,

      gotoConf,
    };
  },
});
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 800px;
}

</style>