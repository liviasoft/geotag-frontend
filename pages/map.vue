<template>
  <div>
    <div style="height: calc(100vh - 64px); position: relative;">
      <!-- Location Search bar -->
      <v-card width="500" tile elevation="0" height="48px"
        style="position: absolute; top: 20px; left: 60px; z-index: 4;" floating>
        <v-card-text class="pa-0 d-flex align-center">
          <v-autocomplete prepend-inner-icon="mdi-map-marker" placeholder="Search by City or State" flat variant="solo"
            density="compact" hide-details prepend></v-autocomplete>
          <v-btn stacked style="height: 48px;" tile color="primary"><v-icon>mdi-magnify</v-icon></v-btn>
          <!-- <v-toolbar
            dense
            floating
          >
            <v-text-field
              prepend-icon="mdi-magnify"
              hide-details
              single-line
            ></v-text-field>

            <v-btn icon>
              <v-icon>mdi-crosshairs-gps</v-icon>
            </v-btn>

            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-toolbar> -->
        </v-card-text>
      </v-card>
      <!-- Move to user location button -->
      <v-card tile elevation="0" style="position: absolute; bottom: 20px; right: 140px; z-index: 4;" floating>
        <v-card-text class="pa-0 d-flex align-center justify-center" style="width: 48px">
          <v-btn @click="moveToUserLocation" stacked style="height: 48px; width: 48px" class="px-0" tile
            color="primary"><v-icon>mdi-crosshairs-gps</v-icon>
            <v-tooltip activator="parent" location="top">Move to current location</v-tooltip>
          </v-btn>
        </v-card-text>
      </v-card>
      <!-- Menu Open button -->
      <v-card tile elevation="0" style="position: absolute; bottom: 80px; right: 20px; z-index: 4;" floating>
        <v-card-text class="pa-0 d-flex align-center justify-center" style="width: 48px">
          <v-btn stacked style="height: 48px; width: 48px" class="px-0" tile color="primary"><v-icon>mdi-chevron-left</v-icon>
            <v-tooltip activator="parent" location="top">Settings</v-tooltip>
          </v-btn>
        </v-card-text>
      </v-card>
      <!-- Settings open button -->
      <v-card tile elevation="0" style="position: absolute; bottom: 20px; right: 20px; z-index: 4;" floating>
        <v-card-text class="pa-0 d-flex align-center justify-center" style="width: 48px">
          <v-btn stacked style="height: 48px; width: 48px" class="px-0" tile color="primary"><v-icon>mdi-cog</v-icon>
            <v-tooltip activator="parent" location="top">Settings</v-tooltip>
          </v-btn>
        </v-card-text>
      </v-card>
      <!-- Request full screen button -->
      <v-card tile elevation="0" style="position: absolute; bottom: 20px; right: 80px; z-index: 4;" floating>
        <v-card-text class="pa-0 d-flex align-center justify-center" style="width: 48px">
          <v-btn stacked style="height: 48px; width: 48px" class="px-0" tile
            color="primary"><v-icon>mdi-overscan</v-icon>
            <v-tooltip activator="parent" location="top">Full screen</v-tooltip>
          </v-btn>
        </v-card-text>
      </v-card>
      <!-- View Historical timeline button -->
      <v-card tile elevation="0" style="position: absolute; bottom: 20px; left: 20px; z-index: 4;" floating>
        <v-card-text class="pa-0 d-flex align-center justify-center" style="width: 48px">
          <v-btn stacked style="height: 48px; width: 48px" class="px-0" tile
            color="primary"><v-icon>mdi-clock-time-eight</v-icon>
            <v-tooltip activator="parent" location="top">Historical</v-tooltip>
          </v-btn>
        </v-card-text>
      </v-card>
      <!-- X Y coorindates display -->
      <v-card tile elevation="0" style="position: absolute; bottom: 20px; left: 80px; z-index: 4;" floating>
        <v-card-text class="pa-0 d-flex align-center justify-center">
          <!-- <v-btn stacked style="height: 48px; width: 48px" class="px-0" tile color="primary"><v-icon>mdi-clock-time-eight</v-icon>
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
      <LMap :zoom="6" style="z-index: 1; position: relative" :center="[47.21322, -1.559482]"
        @contextmenu="show">
        <v-menu :target="[x, y]"
          v-model="showMenu" transition="slide-x-transition" :close-on-content-click="false">
          <v-list density="compact" slim>
            <v-list-item v-for="(item, index) in items" :key="index" :value="index" @click="selectMapOption(item.clickEvent)">
              <template v-slot:prepend>
                <v-icon :icon="item.icon"></v-icon>
              </template>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <!-- <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
          layer-type="base"
          name="OpenStreetMap"
        />
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
        <LTileLayer url="https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png"
          attribution="<a href='https://memomaps.de/'>memomaps.de</a> <a href='http://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, map data &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          name="Airports" />
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
      </LMap>
    </div>
    <v-navigation-drawer location="right" :disable-resize-watcher="true" :disable-route-watcher="true" v-model="markLocation">
      
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  data: () => ({
    showMenu: false,
    markLocation: false,
    x: 0,
    y: 0,
    selectedLocation: {
      lng: 0,
      lat: 0,
    },
    items: [
      { title: 'Add Antenna', icon: "mdi-antenna", clickEvent: "addAntenna" },
      { title: 'Mark location', icon: "mdi-map-marker", clickEvent: "markLocation" },
      { title: 'Start Trace', icon: "mdi-draw", clickEvent: "startTrace" },
      { title: 'Historical', icon: "mdi-refresh", clickEvent: "startHistorical" },
      { title: 'Realtime', icon: "mdi-camera-timer", clickEvent: "listenRealtime" },
    ],
  }),
  methods: {
    show(e) {
      console.log({ e });
      // e.preventDefault()

      this.showMenu = false
      this.selectedLocation = e.latlng
      this.x = e.originalEvent.clientX
      this.y = e.originalEvent.clientY
      console.log({ x: this.x, y: this.y, location: this.selectedLocation });
      this.$nextTick(() => {
        this.showMenu = true
      })
    },
    selectMapOption(e){
      console.log({e});
      switch (e) {
        case 'markLocation':
          this.markLocation = true
          break;
      
        default:
          break;
      }
    },
    mapClick(e) {
      console.log({ e });
    },
    moveToUserLocation(e){
      console.log("Move to user location");
      console.log({e});
    }
  },
}
</script>