import { isBoolean } from '@neoncoder/validator-utils';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSideNavStore = defineStore('sidenav', () => {

  const mainNav = ref(false);
  const mapSettingsNav = ref(false);
  const formInputNav = ref(false);
  const globalLoader = ref(false);

  type TNavIds = 'mainNav' | 'mapSettingsNav' | 'formInputNav';

  function toggle(id: TNavIds, show?: boolean) {
    switch (id) {
      case 'formInputNav':
        formInputNav.value = isBoolean(show) ? show! : !formInputNav.value
        break;
      case 'mapSettingsNav':
        mapSettingsNav.value = isBoolean(show) ? show! : !mapSettingsNav.value
        break;
      case 'mainNav':
        mainNav.value = isBoolean(show) ? show! : !mainNav.value
        break;
      default:
        break;
    }
  }

  return {
    toggle,
    mainNav,
    mapSettingsNav,
    formInputNav,
    globalLoader,
  };
})