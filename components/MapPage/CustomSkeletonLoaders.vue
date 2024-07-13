<script lang="ts" setup>
  import { onMounted } from "vue";
  import { ref } from "vue";
  const interval = ref<NodeJS.Timeout | null>(null)
  const loaders = ref<Array<number>>([])
  const props = defineProps({
    skeletonTypeA: {
      type: String,
      default: 'list-item-avatar'
    },
    skeletonTypeB: {
      type: String,
      default: 'list-item-avatar-two-line'
    },
    itemCount: {
      type: Number,
      default: 5,
    },
    animationInterval: {
      type: Number,
      default: 1000,
    }
  })
  function stopAnimation(){
    if(interval.value) {
      clearInterval(interval.value)
      interval.value = null;
    } else {
      animateLoaders()
    }
  }
  function animateLoaders(){
    interval.value = setInterval(() => {
      loaders.value.unshift(loaders.value[0] + 1)
      if (loaders.value.length > props.itemCount - 1) {
        loaders.value.pop()
      }
    }, props.animationInterval)
  }
  onMounted(() => {
    loaders.value = Array.from(Array(props.itemCount)).map((_, i) => props.itemCount - i);
    animateLoaders()
  })
</script>

<template>
  <!-- <pre>{{ loaders }}</pre> -->
  <v-slide-y-transition group hide-on-leave>
    <v-skeleton-loader
      v-for="i in loaders"
      :key="i"
      :boilerplate="false"
      :type="i % 2 === 0 ? skeletonTypeA : skeletonTypeB ? skeletonTypeB : skeletonTypeA"
      class="mx-auto py-2 pr-6 pl-2"
    ></v-skeleton-loader>
  </v-slide-y-transition>
</template>
