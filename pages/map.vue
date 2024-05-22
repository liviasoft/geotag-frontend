<template>
  <div>
    <div style="height: calc(100vh - 64px); position: relative;">
      <v-card width="500" tile elevation="0" height="48px" style="position: absolute; top: 20px; left: 60px; z-index: 4;" floating>
        <v-card-text class="pa-0 d-flex align-center">
          <v-autocomplete prepend-inner-icon="mdi-map-marker" placeholder="Search by City or State" flat variant="solo" density="compact" hide-details prepend></v-autocomplete>
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
    
      
      <LMap
      :zoom="6"
      style="z-index: 1;"
      :center="[47.21322, -1.559482]"
      >
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
        <LTileLayer
        url="https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png"
        attribution="<a href='https://memomaps.de/'>memomaps.de</a> <a href='http://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, map data &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        name="Airports"
        />
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
        <LCircle
          :lat-lng="[47.21322, -1.559482]"
          :radius="4500"
          :color="'red'"
        />
        <LControlLayers  position="topright" />
      </LMap>
    </div>
  </div>
</template>