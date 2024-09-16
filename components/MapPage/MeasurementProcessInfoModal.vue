<script lang="ts" setup>
  import { ref } from 'vue' ;
  import { useDeviceStore } from '~/stores/devices';

  const {restoreDefaultMeasurementParams} = useDeviceStore()
  const { bandResolution, bandResolutionUnit, freqSweepTime, freqSweepTimeUnit, freqUnits, startFreq, startFreqUnit, stopFreq, stopFreqUnit, timeUnits, axisDwellTime, axisDwellTimeUnit, measurementTime, measurementTimeUnit} = storeToRefs(useDeviceStore())
  const dialog = ref(false)
</script>


<template>
  <div class="text-center pa-0">
    <v-btn @click="dialog = true" icon tile density="compact" variant="tonal" color="primary"><v-icon>mdi-information-variant</v-icon>
      <v-tooltip activator="parent"
        location="top">
        Process Information
      </v-tooltip>
    </v-btn>
    <v-dialog
      v-model="dialog"
      width="auto"
      scrollable
    >
      <v-card
        width="700"
        max-height="500"
        tile
      >
      <v-card-title class="d-flex align-center bg-primary">
        <v-icon class="mr-2">mdi-information-variant</v-icon>
        Measurement Process
        <v-spacer></v-spacer>
        <v-btn @click="dialog = false" icon variant="tonal" size="x-small"><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <kbd>
          <pre dark>
#Check that the MS2090A is online
print(inst.query("*IDN?"))
time.sleep(2)

#Ensure SPA is active
active_inst = inst.query("INST:SEL?")
print(active_inst)

if active_inst != "SPA":
    inst.write("INST:APPL:STAT HIPM, 0")
    time.sleep(1)
    inst.write("INST:APPL:STAT CAAUSB, 0")
    time.sleep(1)
    inst.write("INST:APPL:STAT SPA, 1")
    time.sleep(30)
    inst.write("INST:SEL SPA")
    time.sleep(60)
    print("SPA selected")

#Preset intrument mode
inst.write("SYST:PRES")
time.sleep(1)
inst.write("SYST:PRES:MODE")
time.sleep(1)

#Set the start and stop frequency; RBW; auto atten for EMF measurement
inst.write("SENS:FREQ:STAR {{ startFreq }} {{startFreqUnit}}")
inst.write("SENS:FREQ:STOP {{ stopFreq}} {{stopFreqUnit}}")
time.sleep(0.3)
inst.write("BAND:RES 100 KHz")
inst.write("SENS:FREQ:SWE:TIME {{ freqSweepTime }} {{ freqSweepTimeUnit }}")
time.sleep(0.3)
inst.write("SENS:POW:RF:ATT:AUTO 1")
inst.write("SENS:POW:RF:GAIN:STAT 0")
time.sleep(0.3)

#Check status of EMF mode and switch to it
emf_state = inst.query("SENS:EMF:STAT?")
print(emf_state)

if emf_state == "0":
    inst.write("SENS:EMF:STAT 1")
    time.sleep(23)    
    
print(inst.query("SENS:EMF:STAT?"))

#Check that logging is enabled
log_state = inst.query("SENS:EMF:LOG?")
print(log_state)

if log_state == "0":
    inst.write("SENS:EMF:LOG 1")
    print(inst.query("SENS:EMF:LOG?"))

#============Start EMF measurement====================

#set emf measurement units
inst.write("UNIT:POW DBMV/M")
time.sleep(0.3)

#set ref level
inst.write("DISP:WIND:TRAC:Y:SCAL:RLEV 50 DBMV/M")
inst.wrie("DISP:WIND:TRAC:Y:SCAL:RLEV:OFF 0 DB")
time.sleep(0.3)

#set measurement time
inst.write("SENS:EMF:MEAS:TIME {{ measurementTime }} {{measurementTimeUnit}}")
print(inst.query("SENS:EMF:MEAS:TIME?"))
time.sleep(0.3)

#set measurement count
inst.write("SENS:EMF:MEAS:COUN 1")
print(inst.query("SENS:EMF:MEAS:COUN?"))
time.sleep(0.3)

#set emf dwell time
inst.write("SENS:EMF:AXIS:TIME {{ axisDwellTime }} {{ axisDwellTimeUnit }}")
time.sleep(0.3)

#set ICNIRP limit
print(inst.query("SENS:EMF:ICN?"))
inst.write("SENS:EMF:ICN:STAT 1")
inst.write("SENS:EMF:ICN:STAT?")
time.sleep(1)

i = 0

while i < 24:
    inst.write("SENS:EMF:RUN 1")
    i = i + 1
    print(i)
    time.sleep(620)   
            
#Disable EMF mode
inst.write("SENS:EMF:STAT 0")
time.sleep(23)
print(inst.query("SENS:EMF:STAT?"))

#Preset intrument mode
inst.write("SYST:PRES")
inst.write("SYST:PRES:MODE")
</pre>
        </kbd>
      </v-card-text>
      <v-divider></v-divider>
        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            text="Ok"
            @click="dialog = false"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>