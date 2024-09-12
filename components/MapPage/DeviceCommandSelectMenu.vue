<script lang="ts" setup>
  import { useDeviceStore } from '~/stores/devices';
  import { ref, computed } from 'vue';
  const { deviceCommands } = storeToRefs(useDeviceStore())
  const selectCommand = (command: any) => {
    console.log({ command })
    emit('command:select', command)
  }
  const emit = defineEmits(['command:select'])
  const search = ref('')
  const commandFilter = ref(false)
  const queryFilter = ref(false)
  const filteredCommands = computed(() => {
    let results = deviceCommands.value
    if(queryFilter.value) results = results.filter(x => x.commandType === 'Query')
    if(commandFilter.value) results = results.filter(x => x.commandType === 'Command')
    if(!search.value) return results;
    return results.filter((dc) => dc.command.includes(search.value) || dc.description.includes(search.value) || dc.title.includes(search.value))
  })
</script>

<template>
  <v-card max-height="500">
    <v-card-title class="pa-2">
      <v-text-field tile v-model="search" prepend-inner-icon="mdi-filter-variant" placeholder="Filter Commands" hide-details density="compact"
        variant="solo">
        <template v-slot:append>
      <v-chip tile :variant="commandFilter ? 'flat': 'tonal'" :color="commandFilter ? 'orange-darken-4': 'warning'" @click="() => commandFilter = !commandFilter" label class="ml-n2 mr-2">
        C
        <v-tooltip
          activator="parent"
          location="top"
        >Commands</v-tooltip>
      </v-chip>
      <v-chip tile :variant="queryFilter ? 'flat': 'tonal'" :color="queryFilter ? 'purple-darken-4': 'purple'" @click="() => queryFilter = !queryFilter" label>
        Q
        <v-tooltip
          activator="parent"
          location="top"
        >Queries</v-tooltip>
      </v-chip>
    </template>
      </v-text-field>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pa-0" style="max-height: 440px; overflow-y: scroll;">
      <v-alert
      border="start"
      close-label="Close Alert"
      title="No Results"
      class="ma-4"
      type="info"
      variant="tonal"
      prominent
      v-if="!filteredCommands.length"
    >
      No results.
    </v-alert>
      <v-list lines="three" density="compact">
        <v-list-item @click="selectCommand(item)" v-for="(item, index) in filteredCommands" :key="item.id"
          :value="item.command">
          <v-list-item-title>
            {{ item.title }}
            
          </v-list-item-title>
          <v-list-item-subtitle><span>{{ item.command }}</span> - <span style="line-height: 1;" class="text-caption">{{
            item.description }}</span>
          </v-list-item-subtitle>
          <template v-slot:append>
            <v-chip tile size="small" label :color="item.commandType === 'Query' ? 'purple' : 'warning'">{{
              item.commandType.charAt(0)
            }}
            </v-chip>
          </template>

        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>
