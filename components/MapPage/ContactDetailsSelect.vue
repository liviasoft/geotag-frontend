<script setup lang="ts">
  import type { LocationContact } from '~/types/Locations.types';
import AddContactModal from './AddContactModal.vue';
  import { ref, computed, defineModel } from 'vue';
  const config = useRuntimeConfig();
  const contacts = ref<Array<LocationContact>>([]);
  // const dialog = ref(false);
  const apiBaseUrl = config.public.API_BASE_URL;
  // const props = defineProps({
  //   selectedContactIds: {
  //     type: Array as () => Array<string>,
  //     default: () => ([])
  //   }
  // })
  const loading = ref(false);
  const url = computed(() => {
    return new URL(`${apiBaseUrl}/api/v1/settings/contacts`).href
  })
  const emit = defineEmits(['update:selectedContacts'])
  const selectedContacts = defineModel<Array<LocationContact>>('selectedContacts', {default: []})
  const query = async () => {
    if(loading.value) return;
    loading.value = true;
    try {
      const res = await fetch(url.value);
      const {data: {contacts: fetchedContacts}} = await res.json();
      console.log({sample: fetchedContacts[0]})
      contacts.value = fetchedContacts;
      // selectedContacts.value = []
      // if(props.selectedContactIds){
      //   selectedContacts.value = 
      // }
    } catch (error: any) {
      console.log({error});
    } finally {
      loading.value = false;
    }
  }
  function removeContact(index: number){
    console.log({index});
    selectedContacts.value = selectedContacts.value.filter((_, i) => i !== index)
  }
  onMounted(() => {
    query()
  })
</script>

<template>
  <div>
    <h4 class="mt-4">Contact Info</h4>
    <v-divider class="mb-4"></v-divider>

    <!-- @update:modelValue="(e: LocationContact) => emit('update:selectedContacts', e)" -->
    <v-select :loading="loading" placeholder="Select Contacts" :items="contacts" v-model="selectedContacts" item-title="name" item-value="id" @update:modelValue="(e: LocationContact) => emit('update:selectedContacts', e)" hide-details multiple class="mb-2" variant="outlined" density="compact" label="Link Contacts" return-object>
      <template v-slot:item="{ props, item }">
        <v-list-item v-bind="props" v-if="item" color="primary">
          <!-- <v-list-item-title>{{ item.raw.name }}</v-list-item-title> -->
          <v-list-item-subtitle>{{ item.raw.email }} - {{ item.raw.phone }}</v-list-item-subtitle>
        </v-list-item>
      </template>
      <template #selection="{index}">
        <v-chip v-if="index > -1 && index === 0">
        <span
          class="text-grey text-caption align-self-center"
        >
          ({{ selectedContacts.length }} contacts selected)
        </span>
      </v-chip>
      </template>
    </v-select>
    <div class="mb-2">
      <v-expand-transition
        class="py-0"
        tag="v-list"
        group
        leave-absolute
      >
      <div  v-for="(c, i) in selectedContacts" class="d-flex align-start elevation-2 mb-2 py-1 rounded" :key="i" style="width: 100%;">
        <v-avatar icon="mdi-account-box"></v-avatar>
        <div style="width: 100%;">
          <div class="d-flex align-center">

            <p class="mb-0">{{ c.name }}</p>
            <v-spacer></v-spacer>
            <v-icon @click="removeContact(i)" class="mr-2">mdi-close</v-icon>
          </div>
          <p class="mb-0">{{ c.email }} - {{ c.phone }}</p>
        </div>
      </div>
    </v-expand-transition>
    </div>
    <AddContactModal @update:contact-created="query" />
  </div>
</template>
