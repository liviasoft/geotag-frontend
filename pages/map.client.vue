<script setup lang="ts">
import AddLocationForm from '~/components/MapPage/AddLocationForm.vue';
import LocationMarker from '~/components/MapPage/LocationMarker.vue';
import LocationCard from '../components/MapPage/LocationCard.vue';
import * as changeCase from "change-case";
import { useSideNavStore } from '~/stores/sidenav';
import { useLocationStore } from '~/stores/locations';
import { UseFullscreen } from '@vueuse/components';
import { storeToRefs } from 'pinia';
import { ref, onMounted, computed, watch } from "vue";
import { toast } from '@neoncoder/vuetify-sonner'
import L from 'leaflet';
import { useDisplay } from 'vuetify';
import type { LocationType } from '../types/Locations.types';
import MapSettingsNav from '~/components/MapPage/MapSettingsNav.vue';
import MapSearchInput from '~/components/MapPage/MapSearchInput.vue';

const { xs, smAndDown } = useDisplay();
const { getUserIfLoggedIn } = useAuthStore()
const { getDeviceCommands } = useDeviceStore()

async function getLocations() {
  if (globalLoader.value) return;
  globalLoader.value = true;
  toast.toastOriginal.promise(getSavedLocations(), {
    loading: `Fetching Saved Locations...`,
    success: (data: any) => {
      
      toast.success(data?.response?.message ? data.response.message : 'Fetched Saved Locations')
      return `Marked Saved Locations`
    },
    error: (data: any) => {
      toast.error(data?.response?.message ? data.response.message : 'Error Fetching saved locations')
      
      return `Error: ${data?.response?.message}`
    },
    finally: () => {
      globalLoader.value = false
    }
  })
}

onMounted(() => {
  // console.log({ L })
  getSavedLocations()
  getLocationTypes();
})

const mapModes = {
  DEFAULT: 'DEFAULT',
  SELECTOR: 'SELECTOR',
  POLYGON: 'POLYGON',
  DISTANCE: 'DISTANCE',
  NEARBY: 'NEARBY',
}

type TMode = keyof typeof mapModes

const mode = ref<TMode>('DEFAULT')

function changeMode(newMode: TMode) {
  console.log(`Changing ${mode.value} => ${newMode}`)
  if(newMode === 'DEFAULT') selectedLocation.value = undefined
  mode.value = newMode
}

function isCurrentMode(checkMode: TMode) {
  return mode.value === checkMode
}

const modeCursor = computed(() => {
  return mode.value === 'DEFAULT' ? 'grab' : `url("icons/${mode.value.toLowerCase()}.png") ${mode.value === 'NEARBY' || mode.value === 'DISTANCE' ? '16 16' : '0 0'} , auto`
})

// #region Pinia Navbar logic
const navStore = useSideNavStore()
const { mapSettingsNav, formInputNav, globalLoader, mainNav } = storeToRefs(navStore)
const locationStore = useLocationStore()
const { getLocationTypes, getSavedLocations } = locationStore
const { locationTypes, savedLocations, filteredSavedLocations, selectedLocationTypeFilter } = storeToRefs(useLocationStore())
const highlightedLocation = ref<string | null>(null)
const locationBrowser = ref(false)
const model = ref(null)
const { toggle } = navStore
// #endregion Pinia Navbars logic
const markers = ref<Array<L.LatLngTuple>>([])
const map = ref<any>(null)

// #region Context Menu
const showMenu = ref(false); // For context menu
const markLocation = ref(false);
const x = ref(0);
const y = ref(0);
const selectedLocation = ref<{ lat: number, lng: number, icon?: string } | undefined>(undefined)
const items = ref([
  { title: 'Add Antenna', icon: "mdi-antenna", clickEvent: "addAntenna" },
  { title: 'Mark location', icon: "mdi-map-marker", clickEvent: "markLocation" },
  { title: 'Start Trace', icon: "mdi-draw", clickEvent: "startTrace" },
  { title: 'Historical', icon: "mdi-refresh", clickEvent: "startHistorical" },
  { title: 'Realtime', icon: "mdi-camera-timer", clickEvent: "listenRealtime" },
])

function onMapReady() {
  // Access the Leaflet map instance
  console.log(map?.value?.leafletObject)
  console.log('Map Ready')
}

function clearMap(){
  markers.value = []
  userLocation.value = null
  selectedLocation.value = undefined
}

async function refreshMap(){
  globalLoader.value = true;
  
  try {   
    await getSavedLocations()
    await getLocationTypes()
    await getDeviceCommands()
    await getUserIfLoggedIn()
    clearMap()
  } catch (error: any) {
    console.log({ error })
  } finally {
    globalLoader.value = false;
  }
}

function changePerspective({ lat, lng, zoom = 10, select = false }: { lat: number, lng: number, zoom?: number, select?: boolean }) {
  mapCenter.value = [lat, lng];
  console.log({ map: map.value?.leafletObject })
  setTimeout(() => {
    mapZoom.value = zoom
    if (select) {
      selectedLocation.value = { lat, lng }
    } else {
      selectedLocation.value = undefined
    }
  }, 200);
}

const mapCenter = ref<L.PointExpression>([9.054803167454951, 7.483062744140626])
const mapZoom = ref<number>(14)
const userLocation = ref<L.LatLngExpression | null>(null)
const mouseLocation = ref<L.LatLngTuple>([0, 0])

function mouseMove(e: any) {
  if (mode.value === 'DISTANCE' || mode.value === 'POLYGON') {
    const { latlng, layerPoint } = e
    const { x: X, y: Y } = layerPoint
    const { lat, lng } = latlng
    x.value = X
    y.value = Y
    mouseLocation.value = [lat, lng]
  }
}

function show(e: any) {
  console.log({ e });
  // e.preventDefault()

  showMenu.value = false
  selectedLocation.value = e.latlng
  x.value = e.originalEvent.clientX
  y.value = e.originalEvent.clientY
  nextTick(() => {
    showMenu.value = true
  })
}
const { query } = useRoute()
if (Object.keys(query).length) {
  const { lat, lng, location } = query
  if(lat && lng){
    changePerspective({lat: Number(lat), lng: Number(lng), zoom: 15})
    if(location) {
      // locationBrowser.value = true
      highlightedLocation.value = String(location)
    }
  }
  // if (!selectedLocation.value) selectedLocation.value = { lat: Number(lat) ?? 0, lng: Number(lng) ?? 0 }
}

function context(e: any) {
  console.log({ e });
  switch (e) {
    case 'markLocation':
      markLocation.value = true
      break;
    default:
      break;
  }
}

function mapClick(e: any) {
  switch (mode.value) {
    case 'SELECTOR':
    case 'NEARBY': {
      const { lat, lng } = e.latlng
      selectedLocation.value = { lat, lng }
    }
      toggle('formInputNav', true)
      break;
    case 'DISTANCE':
    case 'POLYGON': {
      const { lat, lng } = e.latlng
      markers.value.push([lat, lng])
    }
    default:
      break;
  }
  console.log({ e, markers });
}

async function getUserLocation(): Promise<GeolocationPosition | GeolocationPositionError> {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject(new Error('Geolocation is not available.'));
    }
    navigator.geolocation.getCurrentPosition(pos => {
      resolve(pos);
    }, err => {
      reject(err);
    });
  })
}

function markerClick(e: any) {
  if (mode.value === 'DISTANCE') {
    const { latlng } = e
    const { lat, lng } = latlng
    markers.value.push([lat, lng])
  }
  if (mode.value === 'POLYGON') {
    mode.value = 'DEFAULT'
  }
  console.log({ e, fxn: 'markerClick', event: 'Marker Clicked' });
}

function createMarkerIcon({ url, type = 'dot' }: { url?: string, type?: string }) {
  const iconTypeAnchors: { [key: string]: [number, number] } = {
    myLocation: [8, 32],
    dot: [16, 16]
  }
  return L.icon({
    iconUrl: url ? url : `icons/${type}.png`,
    iconSize: [32, 32],
    iconAnchor: url ? iconTypeAnchors['dot'] : iconTypeAnchors[type],
    shadowAnchor: [13, 46],
  })
}

async function moveToUserLocation() {
  const result = await getUserLocation()
  console.log({result})
  if (result instanceof GeolocationPosition) {
    const { coords: { latitude: lat, longitude: lng } } = result
    mapCenter.value = [lat, lng]
    userLocation.value = [lat, lng];
    setTimeout(() => {
      mapZoom.value = mapZoom.value > 15 ? mapZoom.value + 1 : 15
    }, 800);
    console.log("Move to user location");
    console.log({ result });
  }
}
const selectedLocationType = ref<LocationType | undefined>(undefined)
function updateSelectedLocationType(e: any) {
  console.log({ e });
  selectedLocationType.value = e;
}

watch([highlightedLocation, locationBrowser], ([newHighlightedLocationValue, newLocationBrowserValue]) => {
  if (newHighlightedLocationValue) {
    const highlight = savedLocations.value.find(x => x.id === newHighlightedLocationValue)
    
    if (highlight) {
      let shift = 0
      if(locationBrowser.value) shift +=  0.02
      if(mainNav.value) shift -= 0.010
      mapCenter.value = [Number(highlight.latitude), Number(highlight.longitude) + shift]
    }
  }
})

const polyline = computed(() => [...markers.value, mouseLocation.value])
async function handleLocationCreated() {
  selectedLocation.value = undefined
  toggle('formInputNav', false)
  await getLocations()
}

function updateSearch(e: any){
  console.log({e})
  if(e && typeof e === 'object'){
    const { latitude, longitude, type, value } = e;
    if(latitude && longitude){
      changePerspective({ lat: Number(latitude), lng: Number(longitude), zoom: type !== 'Location' ? 12 : mapZoom.value < 15 ? mapZoom.value + 1 : mapZoom.value })
    }
    if(type === 'Location' && latitude && longitude){
      highlightedLocation.value = value
    }
  }
}

function clearSearch(){
  if(highlightedLocation.value) highlightedLocation.value = null;
  if(locationBrowser.value) locationBrowser.value = false;
}
</script>
<template>
  <UseFullscreen v-slot="{ toggle: toggleMapFullscreen, isFullscreen }">
    <div>
      <div :style="{ height: isFullscreen ? '100vh' : 'calc(100vh - 64px)', position: 'relative', cursor: modeCursor }">
        <!-- Location Search bar -->
        <v-card v-if="!smAndDown" width="500" tile elevation="0" height="48px"
          style="position: absolute; top: 20px; left: 60px; z-index: 4;" floating>
          <v-card-text class="pa-0 d-flex align-center">
            <v-btn @click="locationBrowser = !locationBrowser" stacked style="height: 48px;" tile
              :color="locationBrowser ? 'warning' : 'primary'"><v-icon>mdi-format-list-text</v-icon></v-btn>
            <MapSearchInput @update:search="updateSearch" @clear:search="clearSearch" />
            
          </v-card-text>
        </v-card>
        <!-- Move to user location button -->
        <v-card tile elevation="0" style="position: absolute; bottom: 20px; right: 134px; z-index: 4;" floating>
          <v-card-text class="pa-0 d-flex align-center justify-center" style="width: 48px">
            <v-btn @click="moveToUserLocation" stacked style="height: 36px; width: 36px" class="px-0" tile
              color="primary"><v-icon>mdi-crosshairs-gps</v-icon>
              <v-tooltip activator="parent" location="top">My current location</v-tooltip>
            </v-btn>
          </v-card-text>
        </v-card>
        <!-- Menu Open button -->
        <v-card tile elevation="0" style="position: absolute; bottom: 108px; right: 20px; z-index: 4;" floating>
          <v-card-text class="pa-0 d-flex align-center justify-center" style="width: 48px">
            <v-btn @click="changeMode('NEARBY')" stacked style="height: 36px; width: 36px" class="px-0" tile
              :color="isCurrentMode('NEARBY') ? 'warning' : 'primary'"><v-icon>mdi-map-marker-circle</v-icon>
              <v-tooltip activator="parent" location="left">Find Nearby</v-tooltip>
            </v-btn>
          </v-card-text>
        </v-card>
        <!-- Menu Open button -->
        <v-card tile elevation="0" style="position: absolute; bottom: 152px; right: 20px; z-index: 4;" floating>
          <v-card-text class="pa-0 d-flex align-center justify-center" style="width: 48px">
            <v-btn @click="changeMode('DISTANCE')" stacked style="height: 36px; width: 36px" class="px-0" tile
              :color="isCurrentMode('DISTANCE') ? 'warning' : 'primary'"><v-icon>mdi-map-marker-distance</v-icon>
              <v-tooltip activator="parent" location="left">Distance between</v-tooltip>
            </v-btn>
          </v-card-text>
        </v-card>
        <!-- Menu Open button -->
        <v-card tile elevation="0" style="position: absolute; bottom: 196px; right: 20px; z-index: 4;" floating>
          <v-card-text class="pa-0 d-flex align-center justify-center" style="width: 48px">
            <v-btn @click="changeMode('POLYGON')" stacked style="height: 36px; width: 36px" class="px-0" tile
              :color="isCurrentMode('POLYGON') ? 'warning' : 'primary'"><v-icon>mdi-vector-triangle</v-icon>
              <v-tooltip activator="parent" location="left">Draw Polygon</v-tooltip>
            </v-btn>
          </v-card-text>
        </v-card>
        <!-- Menu Open button -->
        <v-card tile elevation="0" style="position: absolute; bottom: 240px; right: 20px; z-index: 4;" floating>
          <v-card-text class="pa-0 d-flex align-center justify-center" style="width: 48px">
            <v-btn @click="changeMode('SELECTOR')" stacked style="height: 36px; width: 36px" class="px-0" tile
              :color="isCurrentMode('SELECTOR') ? 'warning' : 'primary'"><v-icon>mdi-cursor-default</v-icon>
              <v-tooltip activator="parent" location="left">Mark / Select Location</v-tooltip>
            </v-btn>
          </v-card-text>
        </v-card>
        <!-- Menu Open button -->
        <v-card tile elevation="0" style="position: absolute; bottom: 284px; right: 20px; z-index: 4;" floating>
          <v-card-text class="pa-0 d-flex align-center justify-center" style="width: 48px">
            <v-btn @click="changeMode('DEFAULT')" stacked style="height: 36px; width: 36px" class="px-0" tile
              :color="isCurrentMode('DEFAULT') ? 'warning' : 'primary'"><v-icon>mdi-cursor-pointer</v-icon>
              <v-tooltip activator="parent" location="left">Mark / Select Location</v-tooltip>
            </v-btn>
          </v-card-text>
        </v-card>
        <!-- Menu Open button -->
        <v-card tile elevation="0" style="position: absolute; bottom: 64px; right: 20px; z-index: 4;" floating>
          <v-card-text class="pa-0 d-flex align-center justify-center" style="width: 48px">
            <v-btn @click="toggle('formInputNav')" stacked style="height: 36px; width: 36px" class="px-0" tile
              :color="formInputNav ? 'warning' : 'primary'"><v-icon>mdi-chevron-left</v-icon>
              <v-tooltip activator="parent" location="left">Settings</v-tooltip>
            </v-btn>
          </v-card-text>
        </v-card>
        <!-- Settings open button -->
        <v-card tile elevation="0" style="position: absolute; bottom: 20px; right: 20px; z-index: 4;" floating>
          <v-card-text class="pa-0 d-flex align-center justify-center" style="width: 48px">
            <v-btn @click="toggle('mapSettingsNav')" stacked style="height: 36px; width: 36px" class="px-0" tile
              :color="mapSettingsNav ? 'warning' : 'primary'"><v-icon>mdi-cog</v-icon>
              <v-tooltip activator="parent" location="top">Settings</v-tooltip>
            </v-btn>
          </v-card-text>
        </v-card>
        <!-- Request full screen button -->
        <v-card tile elevation="0" style="position: absolute; bottom: 20px; right: 77px; z-index: 4;" floating>
          <v-card-text class="pa-0 d-flex align-center justify-center" style="width: 48px">
            <v-btn @click="toggleMapFullscreen" stacked style="height: 36px; width: 36px" class="px-0" tile
              :color="isFullscreen ? 'warning' : 'primary'"><v-icon>{{ isFullscreen ? 'mdi-fullscreen-exit' :
                'mdi-overscan' }}</v-icon>
              <v-tooltip activator="parent" location="top">Full screen</v-tooltip>
            </v-btn>
          </v-card-text>
        </v-card>

        <!-- Refresh Map Button -->
        <v-card tile elevation="0" style="position: absolute; bottom: 64px; right: 134px; z-index: 4;" floating>
          <v-card-text class="pa-0 d-flex align-center justify-center" style="width: 48px">
            <v-btn @click="clearMap" stacked style="height: 36px; width: 36px" class="px-0"
              tile :color="'primary'"><v-icon>mdi-new-box</v-icon>
              <v-tooltip activator="parent" location="top">Clear Map</v-tooltip>
            </v-btn>
          </v-card-text>
        </v-card>

        <!-- Refresh Map Button -->
        <v-card tile elevation="0" style="position: absolute; bottom: 64px; right: 77px; z-index: 4;" floating>
          <v-card-text class="pa-0 d-flex align-center justify-center" style="width: 48px">
            <v-btn @click="refreshMap" stacked style="height: 36px; width: 36px" class="px-0"
              tile :color="'primary'"><v-icon>mdi-refresh</v-icon>
              <v-tooltip activator="parent" location="top">Refresh Map</v-tooltip>
            </v-btn>
          </v-card-text>
        </v-card>

        <!-- Location Browser Toggle Button -->
        <v-card tile elevation="0" style="position: absolute; bottom: 20px; right: 191px; z-index: 4;" floating>
          <v-card-text class="pa-0 d-flex align-center justify-center" style="width: 48px">
            <v-btn @click="locationBrowser = !locationBrowser" stacked style="height: 36px; width: 36px" class="px-0"
              tile :color="locationBrowser ? 'warning' : 'primary'"><v-icon>{{ isFullscreen ? 'mdi-format-list-text' :
                'mdi-format-list-text' }}</v-icon>
              <v-tooltip activator="parent" location="top">Location List</v-tooltip>
            </v-btn>
          </v-card-text>
        </v-card>
        <!-- View Historical timeline button -->
        <v-card tile elevation="0" style="position: absolute; bottom: 20px; left: 20px; z-index: 4;" floating>
          <v-card-text class="pa-0 d-flex align-center justify-center" style="width: 48px">
            <v-btn @click="toast('Test message')" stacked style="height: 36px; width: 36px" class="px-0" tile
              color="primary"><v-icon>mdi-clock-time-eight</v-icon>
              <v-tooltip activator="parent" location="top">Historical</v-tooltip>
            </v-btn>
          </v-card-text>
        </v-card>
        <!-- X Y coorindates display -->
        <v-card tile elevation="0" style="position: absolute; bottom: 20px; left: 80px; z-index: 4;" floating>
          <v-card-text class="pa-0 d-flex align-center justify-center">
            <!-- <v-btn stacked style="height: 36px; width: 36px" class="px-0" tile color="primary"><v-icon>mdi-clock-time-eight</v-icon>
              <v-tooltip activator="parent" location="top">Historical</v-tooltip>
            </v-btn> -->
            <div class="px-4 py-3">
              x: {{ x }}, y: {{ y }}
            </div>
          </v-card-text>
        </v-card>

        <!-- <v-menu v-model="showMenu" :position-x="x" :position-y="y" absolute offset-y>
          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu> -->

        <LMap :zoom="mapZoom" @mouseMove="mouseMove" :style="{ 'z-index': 1, position: 'relative', cursor: 'inherit' }"
          ref="map" @ready="onMapReady" :center="mapCenter" @contextmenu="show" @click="mapClick">
          <v-menu :target="[x, y]" v-model="showMenu" transition="slide-x-transition" :close-on-content-click="false">
            <v-list density="compact" slim>
              <v-list-item v-for="(item, index) in items" :key="index" :value="index" @click="context(item.clickEvent)">
                <template v-slot:prepend>
                  <v-icon :icon="item.icon"></v-icon>
                </template>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          
          <!-- <LTileLayer url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.jpg"
            attribution="<a href='https://memomaps.de/'>memomaps.de</a> <a href='http://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, map data &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            layer-type="base" name="Satellite" /> -->
          <LTileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
            attribution="<a href='https://memomaps.de/'>memomaps.de</a> <a href='http://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, map data &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            layer-type="base" name="Stadia.Light" />
          <LTileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            attribution="<a href='https://memomaps.de/'>memomaps.de</a> <a href='http://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, map data &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            layer-type="base" name="Stadia.Dark" />
          <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
            layer-type="base" name="OpenStreetMap" />
          <!-- <LCircle :lat-lng="[0, 0]" :radius="1000000" :color="'green'" /> -->
          <LPolyline v-if="mode === 'DISTANCE'" :lat-lngs="polyline" :key="`${x}${y}`" :no-clip="false"
            :interactive="true" color="#5153ff" />
          <LPolygon v-if="mode === 'POLYGON' || mode === 'DEFAULT'" :lat-lngs="polyline" :key="`${x}${y}`" :fill="true"
            :fill-opacity="0.4" o-clip="false" :interactive="true" color="#5153ff" />
          <div v-if="mode !== 'SELECTOR'">
            <LMarker v-for="(m, i) in markers" :key="i" @click="markerClick" :icon="createMarkerIcon({})" :lat-lng="m"
              style="cursor: inherit" />
          </div>
          <LMarker v-if="userLocation" @click="markerClick" :icon="createMarkerIcon({ type: 'myLocation' })"
            :lat-lng="userLocation" style="cursor: inherit" />
          <LMarker v-if="selectedLocation && (mode === 'DEFAULT' || mode === 'SELECTOR')" @click="markerClick"
            :icon="createMarkerIcon({ url: selectedLocationType?.iconUrl })" :key="String(selectedLocation)"
            :lat-lng="[selectedLocation.lat, selectedLocation.lng]" style="cursor: inherit" />
          <LocationMarker v-for="loc in savedLocations" :lat="Number(loc.latitude)" :lng="Number(loc.longitude)"
            :location="loc" :highlight="loc.id === highlightedLocation"
            @location:deleted="refreshMap"
            :excluded="!(filteredSavedLocations.map(x => x.id).includes(loc.id))" />
          <!-- <LMarker  @click.stop="markerClick" :icon="createMarkerIcon()" :lat-lng="mapCenter" /> -->
          <!-- <LMarker  @click.stop="markerClick" :lat-lng="mapCenter" /> -->
          <!--
          <LTileLayer
          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          attribution="<a href='https://blog.safecast.org/about/'>SafeCast</a> (<a href='https://creativecommons.org/licenses/by-sa/3.0/'>CC-BY-SA</a>"
          :min-zoom="5"
          layer-type="base"
          :max-zoom="12"
          name="Topography map"
          />
          <LTileLayer
          url="https://s3.amazonaws.com/te512.safecast.org/{z}/{x}/{y}.png"
          attribution="<a href='https://blog.safecast.org/about/'>SafeCast</a> (<a href='https://creativecommons.org/licenses/by-sa/3.0/'>CC-BY-SA</a>"
          :min-zoom="5"
          :visible="true"
          :max-zoom="12"
          name="Another Layer"
          /> -->
          <!-- <LTileLayer url="https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png"
            attribution="<a href='https://memomaps.de/'>memomaps.de</a> <a href='http://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, map data &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            name="Airports" /> -->
          <!-- <LTileLayer
          url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.jpg"
          attribution="<a href='https://memomaps.de/'>memomaps.de</a> <a href='http://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, map data &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          name="Airports"
          /> -->
          <!-- https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.{ext} -->
          <!-- <LTileLayer
          url="https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.png"
          attribution="<a href='https://memomaps.de/'>memomaps.de</a> <a href='http://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, map data &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          name="Airports"
          /> -->

          <LCircle :lat-lng="[47.21322, -1.559482]" :radius="4500" :color="'red'" />
          <LControlLayers position="topright" />
          <LControlScale position="topright" :imperial="true" :metric="false">
            <template #default="slotProps">{{ slotProps }}</template>
          </LControlScale>
        </LMap>
        <v-navigation-drawer width="370" v-model="locationBrowser">
          <v-card tile elevation="0">
            <v-card-title class="d-flex align-center bg-primary" style="height: 52px">
              <p>Saved Locations</p>
            </v-card-title>
            <v-card-title class="d-flex align-center bg-grey-lighten-4 px-0" style="height: 52px">
              <v-slide-group v-model="selectedLocationTypeFilter" center-active show-arrows>
                <v-slide-group-item v-slot="{ isSelected, toggle }" value="all">
                  <v-chip tile class="ma-2" :color="isSelected ? 'primary' : ''" label @click="toggle">
                    <v-icon icon="mdi-label" start></v-icon>
                    All
                  </v-chip>
                </v-slide-group-item>
                <v-slide-group-item v-for="n in locationTypes" :key="n" v-slot="{ isSelected, toggle }" :value="n.id">
                  <v-chip tile class="ma-2" :color="isSelected ? 'primary' : ''" label @click="toggle">
                    <v-avatar :image="n.iconUrl" start></v-avatar>
                    {{ changeCase.capitalCase(n.name) }}
                    <span class="text-medium-emphasis"
                      :class="isSelected && n._count?.locations > 0 ? 'text-warning' : 'text-medium-emphasis'"
                      v-if="n._count">
                      &nbsp;({{ n._count?.locations }})
                    </span>
                  </v-chip>
                </v-slide-group-item>
              </v-slide-group>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="pa-0"
              style="height: calc(100vh - calc(64px + 64px + 64px)); overflow-y: scroll; overflow-x: hidden;">
              <v-item-group selected-class="bg-primary" v-model="highlightedLocation">
                <v-container>
                  <v-row>
                    <v-col cols="12" v-if="!filteredSavedLocations.length">
                      <v-alert
                        border="start"
                        close-label="Close Alert"
                        title="No Results"
                        class="mx-0"
                        type="info"
                        variant="tonal"
                        prominent
                        v-if="!filteredSavedLocations.length"
                      >
                        No results.
                      </v-alert>
                    </v-col>
                    <v-slide-y-transition group>
                      <v-col v-for="n in filteredSavedLocations" :key="n" cols="12" md="12">
                        <v-item v-slot="{ isSelected, selectedClass, toggle }" :value="n.id">

                          <LocationCard :is-selected="isSelected" :location="n" @click="toggle" />
                        </v-item>

                      </v-col>
                    </v-slide-y-transition>
                  </v-row>
                </v-container>
              </v-item-group>
            </v-card-text>
            <v-divider></v-divider>
          </v-card>

        </v-navigation-drawer>
      </div>
      <v-navigation-drawer location="right" :minHeight="isFullscreen ? '100vh' : 'auto'"
        :disable-resize-watcher="true" :disable-route-watcher="true" v-model="formInputNav">
        <AddLocationForm v-model:location="selectedLocation" @update:location-type="updateSelectedLocationType"
        @cancel="toggle('formInputNav', false)"
          :location-type="selectedLocationType" @update:location-created="handleLocationCreated" />
      </v-navigation-drawer>
    </div>
    <v-navigation-drawer :style="{ minWidth: xs && mapSettingsNav ? '90vw' : 'auto' }" location="right"
      :disable-resize-watcher="true" :disable-route-watcher="true" v-model="mapSettingsNav">
      <MapSettingsNav
        @update:selected-city="(e) => changePerspective({ lat: e?.latitude || 0, lng: e?.longitude || 0, zoom: 12, select: Boolean(true) })"
        @update:selected-state="(e) => changePerspective({ lat: e?.latitude || 0, lng: e?.longitude || 0, zoom: 9 })"
        @update:selected-country="(e) => changePerspective({ lat: e?.latitude || 0, lng: e?.longitude || 0, zoom: 6 })" />
    </v-navigation-drawer>
  </UseFullscreen>
</template>