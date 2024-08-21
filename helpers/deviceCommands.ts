import type { DeviceCommand } from "~/types/Locations.types";

export const deviceCommands: DeviceCommand[] = [
  {
    title: 'Clear Status Command',
    value: '*CLS',
    type: 'Command',
    // description: 'This command clears all status data structures in the device (registers and error queue) and forces the Operation Complete state to Idle'
  },
  {
    title: 'Enable Standard Event Status',
    value: '*ESE <numeric_value>',
    type: 'Command',
    // description: 'This command provides access the Standard Event Status Enable Register'
  },
  {
    title: 'Standard Event Status Query',
    value: '*ESE?',
    type: 'Command',
    // description: 'This command provides access the Standard Event Status Enable Register'
  },
  {
    title: 'Enable Standard Event Status',
    value: '*ESR?',
    type: 'Query',
    description: 'This command provides access the Standard Event Status Enable Register'
  },
  {
    title: 'Identify',
    value: '*IDN?',
    type: 'Query',
    description: 'This command provides access the Standard Event Status Enable Register'
  },
  {
    title: 'Operation Complete',
    value: '*OPC',
    type: 'Command',
  },
  {
    title: 'Operation Complete?',
    value: '*OPC?',
    type: 'Query',
  },
  {
    title: 'Option Identification',
    value: '*OPT?',
    type: 'Query',
  },
  {
    title: 'Reset',
    value: '*RST',
    type: 'Command',
  },
  {
    title: 'Service Request Enable',
    value: '*SRE <numeric_value>',
    type: 'Command',
  },
  {
    title: 'Service Request Enabled?',
    value: '*SRE?',
    type: 'Query',
  },
  {
    title: 'Status Byte Query',
    value: '*STB?',
    type: 'Query',
  },
  {
    title: 'Self Test',
    value: '*TST?',
    type: 'Query',
  },
  {
    title: 'Wait-to-Continue',
    value: '*WAI',
    type: 'Query',
  },
  {
    title: 'Used Memory',
    value: ':DIAG:MEM?',
    type: 'Query',
  },
  {
    title: 'Set System Display Language',
    value: ':DISP:LANG <EN|ES|ZH|JA|FR|KO>',
    type: 'Command',
  },
  {
    title: 'System Display Language?',
    value: ':DISP:LANG?',
    type: 'Query',
  },
  {
    title: 'Get Basic GPS Information',
    value: ':FETC:GPS?',
    type: 'Query',
  },
  {
    title: 'Get Full GPS + Satellite Information',
    value: ':FETC:GPS:ALL?',
    type: 'Query',
  },
  {
    title: 'Get Full GPS Information',
    value: ':FETC:GPS:FULL?',
    type: 'Command',
  },
  {
    title: 'Get Last GPS Fix',
    value: ':FETC:GPS:LAST?',
    type: 'Command',
  },
  {
    title: 'Activate or Deactivate Application',
    value: ':INST:APPL:STAT <SPA|HIPM|CAAUSB>,<0 | 1 | ON | OFF>',
    type: 'Command',
  },
  {
    title: 'Last Active Applications',
    value: ':INST:CAT:ACT?',
    type: 'Query',
  },
  {
    title: 'Query Available Applications with all information',
    value: ':INST:CAT:ALL?',
    type: 'Query',
  },
  {
    title: 'Query Available Applications',
    value: ':INST:CAT:FULL?',
    type: 'Query',
  },
  {
    title: 'Select Application By Number',
    value: ':INST:NSEL <numeric_value>',
    type: 'Command',
  },
  {
    title: 'Get Current Application Numeric value',
    value: ':INST:NSEL?',
    type: 'Query'
  },
  {
    title: 'Select Application by name',
    value: ':INST:SEL <SPA|HIPM|CAAUSB>',
    type: 'Command',
  },
  {
    title: 'Query Current Application Name',
    value: ':INST:SEL?',
    type: 'Query',
  },
  {
    title: 'Memory Catalog Directory',
    value: ':MMEM:CAT:DIR? <string>,<string>',
    type: 'Query'
  },
  {
    title: 'MMemory Catalog Directory Size',
    value: ':MMEM:CAT:DIR:SIZE? <string>,<string>',
    type: 'Query',
  },
  {
    title: 'Memory Catalog Msuss',
    value: ':MMEM:CAT:MSUS?',
    type: 'Query',
  },
  {
    title: 'Set Default Mass Storage Directory',
    value: ':MMEM:CDIR <string>',
    type: 'Command',
  },
  {
    title: 'Query Default Mass Storage Directory',
    value: ':MMEM:CDIR?',
    type: 'Query'
  },
  {
    title: 'Copy File',
    value: ':MMEM:COPY <string>,<string>,<string>,<string>',
    type: 'Command'
  },
  {
    title: 'Create Directory',
    value: ':MMEM:CRE:DIR <string>,<string>',
    type: 'Command'
  },
  {
    title: 'File Transfer',
    value: ':MMEMory:DATA <string>,<string>,<block data>',
    type: 'Command'
  },
  {
    title: 'File Transfer',
    value: ':MMEMory:DATA? <string>,<string>',
    type: 'Query'
  },
  {
    title: 'Delete Directory',
    value: ':MMEMory:DELete:DIRectory <string>,<string>',
    type: 'Command'
  },
  {
    title: 'Delete File',
    value: ':MMEMory:DELete:FILe <string>,<string>',
    type: 'Command'
  },
  {
    title: 'Eject USB Drive',
    value: ':MMEMory:EJECt <string>',
    type: 'Command'
  },
  {
    title: 'Load State',
    value: ':MMEMory:LOAD:STATe <numeric_value>,<string>,<string>',
    type: 'Command',
  },
  {
    title: 'Load Trace',
    value: ':MMEMory:LOAD:TRACe <string>,<string>,<string>',
    type: 'Command'
  },
  {
    title: 'Query Default Mass Storage Device',
    value: ':MMEMory:MSIS?',
    type: 'Query'
  },
  {
    title: 'Default Mass Storage Device',
    value: ':MMEMory:MSIS <string>',
    type: 'Command'
  },
  {
    title: 'Screen Shot',
    value: ':MMEMory:STORe:SCReen',
    type: 'Command'
  },
  {
    title: 'Take Screenshot',
    value: ':MMEMory:STORe:SCReen?',
    type: 'Query'
  },
  {
    title: 'Store State',
    value: ':MMEMory:STORe:STATe <numeric_value>,<string>,<string>',
    type: 'Command'
  },
  {
    title: 'Store Trace',
    value: ':MMEMory:STORe:TRACe <string>,<string>,<string>',
    type: 'Command'
  },
  {
    title: '',
    value: ':OUTPut:ROSCillator:STATe <0 | 1 | ON | OFF>',
    type: 'Command'
  },
  {
    title: '',
    value: ':OUTPut:ROSCillator:STATe?',
    type: 'Query',
  },
  {
    title: '',
    value: '[:SENSe]:BIAS:EXTernal:CURRent?',
    type: 'Query'
  },
  {
    title: '',
    value: '[:SENSe]:BIAS:EXTernal:STATe <0 | 1 | ON | OFF>',
    type: 'Command'
  },
  {
    title: '',
    value: '[:SENSe]:BIAS:EXTernal:STATe?',
    type: 'Query'
  },
  {
    title: '',
    value: '[:SENSe]:BIAS:EXTernal:TRIPped[:STATe]?',
    type: 'Query'
  },
  {
    title: '',
    value: '[:SENSe]:BIAS:EXTernal:TRIPped[:STATe]:CLEar',
    type: 'Command'
  },
  {
    title: '',
    value: '[:SENSe]:BIAS:EXTernal:VOLTage <numeric_value>',
    type: 'Command',
  },
  {
    title: '',
    value: '[:SENSe]:BIAS:EXTernal:VOLTage?',
    type: 'Query'
  },
  {
    title: '',
    value: '[:SENSe]:FREQuency:REFerence:SOURce?',
    type: 'Query'
  },
  {
    title: '',
    value: '[:SENSe]:RF:SAFE:MODE <0 | 1 | ON | OFF>',
    type: 'Command'
  },
  {
    title: '',
    value: '[:SENSe]:RF:SAFE:MODE?',
    type: 'Query'
  },
  {
    title: '',
    value: '[:SENSe]:TIME:REFerence:SOURce?',
    type: 'Query'
  },
  {
    title: '',
    value: ':SYSTem:COMMunicate:LAN:CONFig <string>,[<string>],[<string>]',
    type: 'Command'
  },
  {
    title: '',
    value: ':SYSTem:COMMunicate:LAN:CONFig?',
    type: 'Query'
  },
  {
    title: '',
    value: ':SYSTem:COMMunicate:LAN:CONFig:CURRent?',
    type: 'Query'
  },
  {
    title: '',
    value: ':SYSTem:COMMunicate:LAN:DHCP <ON|OFF>',
    type: 'Command'
  },
  {
    title: '',
    value: ':SYSTem:COMMunicate:LAN:DHCP?',
    type: 'Query'
  },
  {
    title: '',
    value: ':SYSTem:COMMunicate:LAN:DNS <string>,<string>,<string>',
    type: 'Command'
  },
  {
    title: '',
    value: ':SYSTem:COMMunicate:LAN:DNS?',
    type: 'Query',
  },
  {
    title: '',
    value: ':SYSTem:COMMunicate:LAN:DNSServer:APPend <string>, {<string>}, ...',
    type: 'Command'
  },
  {
    title: '',
    value: ':SYSTem:COMMunicate:LAN:DNSServer:DELete <string>, {<string>}, ...',
    type: 'Command'
  },
  {
    title: '',
    value: ':SYSTem:COMMunicate:LAN:DNSServer:LIST <string>, {<string>}, ...',
    type: 'Command'
  },
  {
    title: '',
    value: ':SYSTem:COMMunicate:LAN:DNSServer:LIST?',
    type: 'Query',
  },
  {
    title: '',
    value: ':SYSTem:COMMunicate:LAN:FTP:STATe <0 | 1 | ON | OFF>',
    type: 'Command'
  },
  {
    title: '',
    value: ':SYSTem:COMMunicate:LAN:FTP:STATe?',
    type: 'Query'
  },
  {
    title: '',
    value: ':SYSTem:COMMunicate:LAN:HOSTname <string>',
    type: 'Command'
  },
  {
    title: '',
    value: ':SYSTem:COMMunicate:LAN:HOSTname?',
    type: 'Query'
  },
  {
    title: '',
    value: ':SYSTem:COMMunicate:LAN:HTTP:SECure:STATe <0 | 1 | ON | OFF>',
    type: 'Command',
  },
  {
    title: '',
    value: ':SYSTem:COMMunicate:LAN:HTTP:SECure:STATe?',
    type: 'Query'
  },
  {
    title: '',
    value: ':SYSTem:COMMunicate:LAN:SECure:CREDentials <string>,<string>,<RSA>',
    type: 'Command'
  },
  {
    title: '',
    value: ':SYSTem:COMMunicate:LAN:SECure:SSLCertificate?',
    type: 'Query'
  },
  {
    title: '',
    value: ':SYSTem:COMMunicate:WLAN:CONFig:CURRent?',
    type: 'Query'
  },
  {
    title: '',
    value: ':SYSTem:COMMunicate:WLAN:CONNection <string>,[<string>]',
    type: 'Command'
  },
  {
    title: '',
    value: ':SYSTem:COMMunicate:WLAN:CONNection:ACTive?',
    type: 'Query'
  },
  {
    title: '',
    value: ':SYSTem:COMMunicate:WLAN:CONNection:DISConnect',
    type: 'Command'
  },
  {
    title: '',
    value: ':SYSTem:COMMunicate:WLAN:CONNection:FORGet <string>',
    type: 'Command'
  },
  {
    title: '',
    value: ':SYSTem:COMMunicate:WLAN:CONNection:FORGet:ALL',
    type: 'Command'
  },
  {
    title: '',
    value: ':SYSTem:COMMunicate:WLAN:CONNection:SAVed?',
    type: 'Query'
  },
  {
    title: '',
    value: ':SYSTem:COMMunicate:WLAN:CONNection:STATus?',
    type: 'Query'
  },
  {
    title: '',
    value: ':SYSTem:COMMunicate:WLAN:NETWorks?',
    type: 'Query'
  },
  {
    title: '',
    value: ':SYSTem:COMMunicate:WLAN:NETWorks:REFResh',
    type: 'Command'
  },
  {
    title: '',
    value: ':SYSTem:COMMunicate:WLAN:STATe <0 | 1 | ON | OFF>',
    type: 'Command'
  },
  {
    title: '',
    value: ':SYSTem:COMMunicate:WLAN:STATe?',
    type: 'Query'
  },
  {
    title: '',
    value: ':SYSTem:DATE <numeric_value>,<numeric_value>,<numeric_value>',
    type: 'Command'
  },
  {
    title: '',
    value: ':SYSTem:DATE?',
    type: 'Query'
  },
  {
    title: '',
    value: ':SYSTem:DEFault:RESet:ALL',
    type: 'Command'
  },
  {
    title: '',
    value: ':SYSTem:DEFault:RESet:DATA <USER|SYSTem>',
    type: 'Command'
  },
  {
    title: '',
    value: ':SYSTem:DEFault:RESet:FACTory',
    type: 'Command'
  },
  {
    title: '',
    value: ':SYSTem:ERRor:DISPlay <0 | 1 | ON | OFF>',
    type: 'Command'
  },
  {
    title: '',
    value: ':SYSTem:ERRor:DISPlay?',
    type: 'Query'
  },
  {
    title: '',
    value: ':SYSTem:ERRor[:NEXT]?',
    type: 'Query'
  },
  {
    title: 'Firmware Update',
    value: ':SYSTem:FIRMware:UPDate <string>,<string>',
    type: 'Command'
  },
  {
    title: 'Firmware Package List',
    value: ':SYSTem:FIRMware:UPDate:LIST?',
    type: 'Query',
  },
  {
    title: 'Remote Firmware Update',
    value: ':SYSTem:FIRMware:UPDate:REMote <string>',
    type: 'Command',
  },
  {
    title: 'Remote Firmware Update Auto Check',
    value: ':SYSTem:FIRMware:UPDate:REMote:AUTO <0 | 1 | ON | OFF>',
    type: 'Command',
  },
  {
    title: 'Remote Firmware Update Auto Check',
    value: ':SYSTem:FIRMware:UPDate:REMote:AUTO?',
    type: 'Query',
  },
  {
    title: 'Check For Firmware Update',
    value: ':SYSTem:FIRMware:UPDate:REMote:LATest?',
    type: 'Query',
  },
  {
    title: 'Remote Firmware Package List',
    value: ':SYSTem:FIRMware:UPDate:REMote:LIST?',
    type: 'Query',
  },
  {
    title: 'Remote Firmware Package List Refresh',
    value: ':SYSTem:FIRMware:UPDate:REMote:LIST:REFResh',
    type: 'Command',
  },
  {
    title: 'Remote Firmware Package Source',
    value: ':SYSTem:FIRMware:UPDate:REMote:SOURce <string>',
    type: 'Command',
  },
  {
    title: 'Remote Firmware Package Source',
    value: ':SYSTem:FIRMware:UPDate:REMote:SOURce?',
    type: 'Query',
  },
  {
    title: 'Firmware Version',
    value: ':SYSTem:FIRMware:VERSion?',
    type: 'Query',
  },
  {
    title: 'GPS Satellite System Search Mode',
    value: ':SYSTem:GPS:SEARch:MODE <GGLonass|GGALileo|GBEidou|GGGalileo>',
    type: 'Command',
  },
  {
    title: 'GPS Satellite System Search Mode',
    value: ':SYSTem:GPS:SEARch:MODE?',
    type: 'Query',
  },
  {
    title: 'GPS State',
    value: ':SYSTem:GPS:STATe <0 | 1 | ON | OFF>',
    type: 'Command',
  },
  {
    title: 'GPS STate',
    value: ':SYSTem:GPS:STATe?',
    type: 'Query',
  },
  {
    title: 'GPS Volate',
    value: ':SYSTem:GPS:VOLTage <numeric_value>',
    type: 'Command',
  },
  {
    title: 'GPS Voltage',
    value: ':SYSTem:GPS:VOLTage?',
    type: 'Query',
  },
  {
    title: 'System Error Log',
    value: ':SYSTem:LOG:ERRor?',
    type: 'Query',
  },
  {
    title: 'Mac Address',
    value: ':SYSTem:MACaddress?',
    type: 'Query',
  },
  {
    title: 'Query Options',
    value: ':SYSTem:OPTions?',
    type: 'Query',
  },
  {
    title: 'Query All Options',
    value: ':SYSTem:OPTions:ALL?',
    type: 'Query',
  },
  {
    title: 'Option Configuration',
    value: ':SYSTem:OPTions:CONFig?',
    type: 'Query',
  },
  {
    title: 'Activate Timed Options',
    value: ':SYSTem:OPTions:TIMed:ACTivate <string>',
    type: 'Command',
  },
  {
    title: 'Option Update Remote',
    value: ':SYSTem:OPTions:UPDate:REMote',
    type: 'Command',
  },
  {
    title: 'Option Upgrade',
    value: ':SYSTem:OPTions:UPGRade <string>',
    type: 'Command',
  },
  {
    title: 'Enable Remote Password',
    value: ':SYSTem:PASSword:CDISable <string>',
    type: 'Command',
  },
  {
    title: 'Enable Password Protected Connection',
    value: ':SYSTem:PASSword:CENable <string>',
    type: 'Command',
  },
  {
    title: 'Disable Remote Password',
    value: ':SYSTem:PASSword:CENable:ALL <string>',
    type: 'Command',
  },
  {
    title: 'Remote Password Connection State',
    value: ':SYSTem:PASSword:CONNection:STATe?',
    type: 'Query',
  },
  {
    title: 'Remote Password Integrity',
    value: ':SYSTem:PASSword:INTegrity?',
    type: 'Query',
  },
  {
    title: 'Remote Password Set',
    value: ':SYSTem:PASSword:NEW <string>,<string>',
    type: 'Command',
  },
  {
    title: 'Remote Password Public Key',
    value: ':SYSTem:PASSword:SSLKey?',
    type: 'Query',
  },
  {
    title: 'Remote Password State',
    value: ':SYSTem:PASSword:STATe?',
    type: 'Query',
  },
  {
    title: 'Preset',
    value: ':SYSTem:PRESet',
    type: 'Command',
  },
  {
    title: 'Preset Mode',
    value: ':SYSTem:PRESet:MODE',
    type: 'Command',
  },
  {
    title: 'System Reboot',
    value: ':SYSTem:REBoot',
    type: 'Command',
  },
  {
    title: 'Remote Control State',
    value: ':SYSTem:REMote:DISPlay:LOCK <0 | 1 | ON | OFF>',
    type: 'Command',
  },
  {
    title: 'Remote Control State',
    value: ':SYSTem:REMote:DISPlay:LOCK?',
    type: 'Query',
  },
  {
    title: '',
    value: ':SYSTem:SETup:SHORtcuts <numeric_value>,<string>,[<string>]',
    type: '',
  },
  {
    title: '',
    value: ':SYSTem:SETup:SHORtcuts?',
    type: '',
  },
  {
    title: '',
    value: ':SYSTem:SETup:SHORtcuts:CLEar',
    type: '',
  },
  {
    title: '',
    value: ':SYSTem:SETup:SHORtcuts:DEL <numeric_value>',
    type: '',
  },
  {
    title: '',
    value: ':SYSTem:SETup:SHORtcuts:LOAD <numeric_value>',
    type: '',
  },
  {
    title: '',
    value: ':SYSTem:SETup:SHORtcuts:REName <numeric_value>,<string>',
    type: '',
  },
  {
    title: '',
    value: ':SYSTem:SHUTdown',
    type: '',
  },
  {
    title: '',
    value: ':SYSTem:TEMPerature?',
    type: '',
  },
  {
    title: '',
    value: ':SYSTem:TIME <numeric_value>,<numeric_value>,<numeric_value>',
    type: '',
  },
  {
    title: '',
    value: ':SYSTem:TIME?',
    type: '',
  },
  {
    title: '',
    value: ':SYSTem:TIME:SYNC <AUTO|MANual>',
    type: '',
  },
  {
    title: '',
    value: ':SYSTem:TIME:SYNC?',
    type: '',
  },
  {
    title: '',
    value: ':SYSTem:TIME:SYNC:STATus?',
    type: '',
  },
  {
    title: '',
    value: ':SYSTem:TIME:ZONE <string>',
    type: '',
  },
  {
    title: '',
    value: ':SYSTem:TIME:ZONE?',
    type: '',
  },
  {
    title: '',
    value: ':SYSTem:TIME:ZONE:CATalog?',
    type: '',
  },
  {
    title: '',
    value: ':SYSTem:UNIT:NAMe <string>',
    type: '',
  },
  {
    title: '',
    value: ':SYSTem:UNIT:NAMe?',
    type: '',
  },
  {
    title: '',
    value: ':TEST:SELFtest?',
    type: '',
  },
  {
    title: '',
    value: ':TRIGger[:SEQuence]:PORT<n>[:DIRection] <IN|OUT>',
    type: '',
  },
  {
    title: '',
    value: ':TRIGger[:SEQuence]:PORT<n>[:DIRection]?',
    type: '',
  },
  {
    title: '',
    value: ':ABORt',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit<n>:COMMent <string>',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit<n>:COMMent?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit<n>:CONTrol[:DATA] <numeric_value> {HZ | KHZ | MHZ | GHZ}, {<numeric_value> {HZ | KHZ | MHZ | GHZ}}, ...',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit<n>:CONTrol[:DATA]?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit<n>:CONTrol:MODE <ABSolute|RELative>',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit<n>:CONTrol:MODE?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit<n>:CONTrol:SHIFt <numeric_value> {HZ | KHZ | MHZ | GHZ}',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit<n>:COPY <numeric_value>',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit<n>:DELete',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit<n>:FAIL?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit<n>:LOWer[:DATA] <numeric_value> {<amplitude_units>}, {<numeric_value> {<amplitude_units>}}, ...',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit<n>:LOWer[:DATA]?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit<n>:LOWer:MODE <ABSolute|RELative>',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit<n>:LOWer:MODE?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit<n>:LOWer:SHIFt <numeric_value> {DB}',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit<n>:LOWer:STATe <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit<n>:LOWer:STATe?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit<n>:NAME <string>',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit<n>:NAME?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit<n>:STATe <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit<n>:STATe?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit<n>:TRACe<n>:CHECk <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit<n>:TRACe<n>:CHECk?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit<n>:UPPer[:DATA] <numeric_value> {<amplitude_units>}, {<numeric_value> {<amplitude_units>}}, ...',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit<n>:UPPer[:DATA]?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit<n>:UPPer:MODE <ABSolute|RELative>',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit<n>:UPPer:MODE?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit<n>:UPPer:SHIFt <numeric_value> {DB}',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit<n>:UPPer:STATe <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit<n>:UPPer:STATe?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit:ACTive?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:ACPower:LIMit:ADJacent:ABSolute <numeric_value> {<amplitude_units>}',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:ACPower:LIMit:ADJacent:ABSolute?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:ACPower:LIMit:ADJacent:LOWer:FAIL?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:ACPower:LIMit:ADJacent:RELative <numeric_value> {DB}',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:ACPower:LIMit:ADJacent:RELative?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:ACPower:LIMit:ADJacent:UPPer:FAIL?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:ACPower:LIMit:ALTernate:ABSolute <numeric_value> {<amplitude_units>}',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:ACPower:LIMit:ALTernate:ABSolute?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:ACPower:LIMit:ALTernate:LOWer:FAIL?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:ACPower:LIMit:ALTernate:RELative <numeric_value> {DB}',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:ACPower:LIMit:ALTernate:RELative?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:ACPower:LIMit:ALTernate:UPPer:FAIL?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:ACPower:LIMit:FAIL?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:ACPower:LIMit:MAIN <numeric_value> {<amplitude_units>}',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:ACPower:LIMit:MAIN?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:ACPower:LIMit:MODE <ABSolute|RELative>',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:ACPower:LIMit:MODE?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:ACPower:LIMit:STATe <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:ACPower:LIMit:STATe?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:CHPower:LIMit <numeric_value> {<amplitude_units>}',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:CHPower:LIMit?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:CHPower:LIMit:FAIL?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:CHPower:LIMit:PSDensity <numeric_value> {<amplitude_units>}',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:CHPower:LIMit:PSDensity?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:CHPower:LIMit:PSDensity:STATe <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:CHPower:LIMit:PSDensity:STATe?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:CHPower:LIMit:PSD:FAIL?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:CHPower:LIMit:STATe <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:CHPower:LIMit:STATe?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:CINTerference:CARrier:LIMit <numeric_value> {<amplitude_units>}',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:CINTerference:CARrier:LIMit?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:CINTerference:CARrier:LIMit:FAIL?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:CINTerference:CARrier:LIMit:STATe <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:CINTerference:CARrier:LIMit:STATe?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:CINTerference:CIRatio:LIMit <numeric_value> {DB}',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:CINTerference:CIRatio:LIMit?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:CINTerference:CIRatio:LIMit:FAIL?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:CINTerference:CIRatio:LIMit:STATe <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:CINTerference:CIRatio:LIMit:STATe?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:CINTerference:INTerference:LIMit <numeric_value> {<amplitude_units>}',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:CINTerference:INTerference:LIMit?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:CINTerference:INTerference:LIMit:FAIL?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:CINTerference:INTerference:LIMit:STATe <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:CINTerference:INTerference:LIMit:STATe?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:EIRPower:HORizontal:LIMit:FAIL?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:EIRPower:HORizontal:SAVE',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:EIRPower:LIMit:FAIL?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:EIRPower:LIMit:LOWer <numeric_value> {<amplitude_units>}',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:EIRPower:LIMit:LOWer?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:EIRPower:LIMit:LOWer:STATe <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:EIRPower:LIMit:LOWer:STATe?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:EIRPower:LIMit:UPPer <numeric_value> {<amplitude_units>}',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:EIRPower:LIMit:UPPer?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:EIRPower:LIMit:UPPer:STATe <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:EIRPower:LIMit:UPPer:STATe?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:EIRPower:MAXimum:LIMit:FAIL?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:EIRPower:SUM:LIMit:FAIL?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:EIRPower:VERTical:LIMit:FAIL?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:EIRPower:VERTical:SAVE',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:EMF:METer:ALARm:STATe <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:EMF:METer:ALARm:STATe?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:EMF:METer:ALARm:THReshold <percent_value>',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:EMF:METer:ALARm:THReshold?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:EMF:METer:CALibration:FACTors?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:EMF:METer:CALibraton:STATe <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:EMF:METer:CALibraton:STATe?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:EMF:METer:LIMit:FREQuency <numeric_value> {HZ | KHZ | MHZ | GHZ}',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:EMF:METer:LIMit:FREQuency?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:EMF:METer:LIMit:MODE <LOWest|FREQuency>',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:EMF:METer:LIMit:MODE?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:EMF:METer:LIMit:PDENsity?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:EMF:METer:LIMit:STANdard <FCCPublic|FCCWorker|ICPublic|ICWorker>',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:EMF:METer:LIMit:STANdard?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:INTerference:LIMit <numeric_value> {<amplitude_units>}',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:INTerference:LIMit?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:INTerference:LIMit:FAIL?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:INTerference:LIMit:STATe <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:INTerference:LIMit:STATe?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit<n>:ENVelope:UPDate:Y',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit<n>:LOWer:ENVelope:CREate',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit<n>:LOWer[:TRACe]:POINts?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit<n>:UPPer:ENVelope:CREate',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit<n>:UPPer[:TRACe]:POINts?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit:ALARm <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit:ALARm?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit:ENVelope:OFFSet <numeric_value> {<amplitude_units>}',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit:ENVelope:OFFSet?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit:ENVelope:POINt <numeric_value>',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit:ENVelope:POINt?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit:ENVelope:SHAPe <SQUare|SLOPe>',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:LIMit:ENVelope:SHAPe?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:MARKer<n>:FUNCtion <OFF|NOISe|FCOunter|QUASi>',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:MARKer<n>:FUNCtion?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:MARKer<n>:MAXimum',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:MARKer<n>:MAXimum:LEFT',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:MARKer<n>:MAXimum:NEXT',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:MARKer<n>:MAXimum:RIGHt',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:MARKer<n>:MODE <POSition|DELTa|FIXed>',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:MARKer<n>:MODE?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:MARKer<n>:MOVE:LEFT',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:MARKer<n>:MOVE:RIGHt',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:MARKer<n>:REFerence <numeric_value>',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:MARKer<n>:REFerence?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:MARKer<n>[:SET]:CENTer',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:MARKer<n>[:SET]:RLEVel',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:MARKer<n>:STATe <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:MARKer<n>:STATe?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:MARKer<n>:TRACe <numeric_value>',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:MARKer<n>:TRACe?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:MARKer<n>:X <numeric_value> {PS | NS | US | MS | S | MIN | HR}',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:MARKer<n>:X?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:MARKer<n>:X <numeric_value> {HZ | KHZ | MHZ | GHZ}',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:MARKer<n>:X?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:MARKer<n>:Y <numeric_value> {<amplitude_units>}',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:MARKer<n>:Y?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:MARKer:AOFF',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:MARKer:APReset',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:MARKer[:DATA]:ALL?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:MARKer:FUNCtion:FCOunter:RESolution <R0|R1|R2|R3>',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:MARKer:FUNCtion:FCOunter:RESolution?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:MARKer:PEAK:EXCursion <numeric_value> {DB}',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:MARKer:PEAK:EXCursion?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:MARKer:PEAK:EXCursion:STATe <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:MARKer:PEAK:EXCursion:STATe?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:MARKer:PEAK:THReshold <numeric_value> {<amplitude_units>}',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:MARKer:PEAK:THReshold?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:MARKer:PEAK:THReshold:STATe <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:MARKer:PEAK:THReshold:STATe?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:OBW:LIMit <numeric_value> {HZ | KHZ | MHZ | GHZ}',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:OBW:LIMit?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:OBW:LIMit:FAIL?',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:OBW:LIMit:STATe <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: ':CALCulate:OBW:LIMit:STATe?',
    type: '',
  },
  {
    title: '',
    value: ':CONFigure:ACPower',
    type: '',
  },
  {
    title: '',
    value: ':CONFigure:CHPower',
    type: '',
  },
  {
    title: '',
    value: ':CONFigure:CINTerference',
    type: '',
  },
  {
    title: '',
    value: ':CONFigure:EIRPower',
    type: '',
  },
  {
    title: '',
    value: ':CONFigure:INTerference',
    type: '',
  },
  {
    title: '',
    value: ':CONFigure:OBWidth',
    type: '',
  },
  {
    title: '',
    value: ':CONFigure:SEMask',
    type: '',
  },
  {
    title: '',
    value: ':CSCanner:ADD:CUSTom <numeric_value> {HZ | KHZ | MHZ | GHZ},<numeric_value> {HZ | KHZ | MHZ | GHZ},[<numeric_value>],[<string>],[<numeric_value> {PS | NS | US | MS | S | MIN | HR}],[<numeric_value> {<amplitude_units>}],[<numeric_value> {<amplitude_units>}]',
    type: '',
  },
  {
    title: '',
    value: ':CSCanner:ADD:FREQuency <numeric_value> {HZ | KHZ | MHZ | GHZ},<numeric_value> {HZ | KHZ | MHZ | GHZ},<numeric_value> {HZ | KHZ | MHZ | GHZ},<numeric_value>,[<numeric_value>],[<string>],[<numeric_value> {PS | NS | US | MS | S | MIN | HR}],[<numeric_value> {<amplitude_units>}],[<numeric_value> {<amplitude_units>}]',
    type: '',
  },
  {
    title: '',
    value: ':CSCanner:ADD:SIGnalstandard <string>,<numeric_value>,<numeric_value>,<numeric_value>,[<numeric_value>],[<numeric_value> {HZ | KHZ | MHZ | GHZ}],[<numeric_value> {PS | NS | US | MS | S | MIN | HR}],[<numeric_value> {<amplitude_units>}],[<numeric_value> {<amplitude_units>}]',
    type: '',
  },
  {
    title: '',
    value: ':CSCanner:AVERage:TYPE <LAST|MAX|MIN|AVER|RMAX|RMIN|RAV>',
    type: '',
  },
  {
    title: '',
    value: ':CSCanner:AVERage:TYPE?',
    type: '',
  },
  {
    title: '',
    value: ':CSCanner:CHANnel?',
    type: '',
  },
  {
    title: '',
    value: ':CSCanner:CHANnel:LIMit?',
    type: '',
  },
  {
    title: '',
    value: ':CSCanner:CLEar <numeric_value>',
    type: '',
  },
  {
    title: '',
    value: ':CSCanner:CLEar:ALL',
    type: '',
  },
  {
    title: '',
    value: ':CSCanner:DELete <numeric_value>',
    type: '',
  },
  {
    title: '',
    value: ':CSCanner:DELete:ALL',
    type: '',
  },
  {
    title: '',
    value: ':CSCanner:EDIT:CUSTom <numeric_value> {HZ | KHZ | MHZ | GHZ},<numeric_value> {HZ | KHZ | MHZ | GHZ},<numeric_value>,[<string>],[<numeric_value> {PS | NS | US | MS | S | MIN | HR}],[<numeric_value> {<amplitude_units>}],[<numeric_value> {<amplitude_units>}]',
    type: '',
  },
  {
    title: '',
    value: ':CSCanner:EDIT:SIGnalstandard <string>,<numeric_value>,<numeric_value>,[<numeric_value> {HZ | KHZ | MHZ | GHZ}],[<numeric_value> {PS | NS | US | MS | S | MIN | HR}],[<numeric_value> {<amplitude_units>}],[<numeric_value> {<amplitude_units>}]',
    type: '',
  },
  {
    title: '',
    value: ':CSCanner:LOG <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: ':CSCanner:LOG?',
    type: '',
  },
  {
    title: '',
    value: ':CSCanner:LOG:INTerval <numeric_value> {PS | NS | US | MS | S | MIN | HR}',
    type: '',
  },
  {
    title: '',
    value: ':CSCanner:LOG:INTerval?',
    type: '',
  },
  {
    title: '',
    value: ':CSCanner:RESults? [<ALL|STRip|BAR>],[<numeric_value>]',
    type: '',
  },
  {
    title: '',
    value: ':CSCanner:SORT:ASC <CFR|BWID|DTIM|LIMI|LAST|MAX|MIN|AVER|RMAX|RMIN|RAV>',
    type: '',
  },
  {
    title: '',
    value: ':CSCanner:SORT:DESC <CFR|BWID|DTIM|ULIM|LLIM|LAST|MAX|MIN|AVER|RMAX|RMIN|RAV>',
    type: '',
  },
  {
    title: '',
    value: ':CSCanner:SSTandard:ATTRibutes? <string>',
    type: '',
  },
  {
    title: '',
    value: ':CSCanner:SSTandard:CATalog?',
    type: '',
  },
  {
    title: '',
    value: ':CSCanner:UPDate:STATe <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: ':CSCanner:UPDate:STATe?',
    type: '',
  },
  {
    title: '',
    value: ':DIAGnostic:SWEep:TIME?',
    type: '',
  },
  {
    title: '',
    value: ':DISPlay:EXTernal:DEVices?',
    type: '',
  },
  {
    title: '',
    value: ':DISPlay:IMPedance:MATCh:DEVice <NONe|M75|OTHer>',
    type: '',
  },
  {
    title: '',
    value: ':DISPlay:IMPedance:MATCh:DEVice?',
    type: '',
  },
  {
    title: '',
    value: ':DISPlay:IMPedance:MATCh:DEVice:CUSTom:LOSS <numeric_value> {DB}',
    type: '',
  },
  {
    title: '',
    value: ':DISPlay:IMPedance:MATCh:DEVice:CUSTom:LOSS?',
    type: '',
  },
  {
    title: '',
    value: ':DISPlay:POINtcount <numeric_value>',
    type: '',
  },
  {
    title: '',
    value: ':DISPlay:POINtcount?',
    type: '',
  },
  {
    title: '',
    value: ':DISPlay:VIEW:SPECtrogram:AADJust',
    type: '',
  },
  {
    title: '',
    value: ':DISPlay:VIEW:SPECtrogram:BOTTom <numeric_value> {<amplitude_units>}',
    type: '',
  },
  {
    title: '',
    value: ':DISPlay:VIEW:SPECtrogram:BOTTom?',
    type: '',
  },
  {
    title: '',
    value: ':DISPlay:VIEW:SPECtrogram:HISTory[:DATA]? <numeric_value>',
    type: '',
  },
  {
    title: '',
    value: ':DISPlay:VIEW:SPECtrogram:HISTory:ELAPsed? <numeric_value>',
    type: '',
  },
  {
    title: '',
    value: ':DISPlay:VIEW:SPECtrogram:HUE <numeric_value>',
    type: '',
  },
  {
    title: '',
    value: ':DISPlay:VIEW:SPECtrogram:HUE?',
    type: '',
  },
  {
    title: '',
    value: ':DISPlay:VIEW:SPECtrogram:REFerence <numeric_value> {<amplitude_units>}',
    type: '',
  },
  {
    title: '',
    value: ':DISPlay:VIEW:SPECtrogram:REFerence?',
    type: '',
  },
  {
    title: '',
    value: ':DISPlay:VIEW:SPECtrogram:TRACe:SELection <POSition|TIME>',
    type: '',
  },
  {
    title: '',
    value: ':DISPlay:VIEW:SPECtrogram:TRACe:SELection?',
    type: '',
  },
  {
    title: '',
    value: ':DISPlay:WINDow:TRACe:Y[:SCALe]:PDIVision <numeric_value>',
    type: '',
  },
  {
    title: '',
    value: ':DISPlay:WINDow:TRACe:Y[:SCALe]:PDIVision?',
    type: '',
  },
  {
    title: '',
    value: ':DISPlay:WINDow:TRACe:Y[:SCALe]:PDIVision <numeric_value>',
    type: '',
  },
  {
    title: '',
    value: ':DISPlay:WINDow:TRACe:Y[:SCALe]:PDIVision?',
    type: '',
  },
  {
    title: '',
    value: ':DISPlay[:WINDow]:TRACe:Y:SCALe:RLEVel <numeric_value> {<amplitude_units>}',
    type: '',
  },
  {
    title: '',
    value: ':DISPlay[:WINDow]:TRACe:Y:SCALe:RLEVel?',
    type: '',
  },
  {
    title: '',
    value: ':DISPlay[:WINDow]:TRACe:Y[:SCALe]:RLEVel:AUTO[:IMMediate] <numeric_value> {DB}',
    type: '',
  },
  {
    title: '',
    value: ':DISPlay[:WINDow]:TRACe:Y[:SCALe]:RLEVel:OFFSet <numeric_value> {DB}',
    type: '',
  },
  {
    title: '',
    value: ':DISPlay[:WINDow]:TRACe:Y[:SCALe]:RLEVel:OFFSet?',
    type: '',
  },
  {
    title: '',
    value: ':DISPlay[:WINDow]:TRACe:Y[:SCALe]:RLEVel:OFFSet <numeric_value> {DB}',
    type: '',
  },
  {
    title: '',
    value: ':DISPlay[:WINDow]:TRACe:Y[:SCALe]:RLEVel:OFFSet?',
    type: '',
  },
  {
    title: '',
    value: ':DISPlay[:WINDow]:TRACe:Y:SSCale:PDIVision <numeric_value> {DB}',
    type: '',
  },
  {
    title: '',
    value: ':DISPlay[:WINDow]:TRACe:Y:SSCale:PDIVision?',
    type: '',
  },
  {
    title: '',
    value: ':DISPlay[:WINDow]:TRACe:Y:SSCale:PDIVision <numeric_value> {DB}',
    type: '',
  },
  {
    title: '',
    value: ':DISPlay[:WINDow]:TRACe:Y:SSCale:PDIVision?',
    type: '',
  },
  {
    title: '',
    value: ':DISPlay[:WINDow]:TRACe:Y:SSCale:RLEVel <numeric_value> {DB}',
    type: '',
  },
  {
    title: '',
    value: ':DISPlay[:WINDow]:TRACe:Y:SSCale:RLEVel?',
    type: '',
  },
  {
    title: '',
    value: ':DISPlay[:WINDow]:TRACe:Y:SSCale:RLEVel <numeric_value> {DB}',
    type: '',
  },
  {
    title: '',
    value: ':DISPlay[:WINDow]:TRACe:Y:SSCale:RLEVel?',
    type: '',
  },
  {
    title: '',
    value: ':EMF:STORe:PATH <string>',
    type: '',
  },
  {
    title: '',
    value: ':EMF:STORe:PATH?',
    type: '',
  },
  {
    title: '',
    value: ':FETCh:ACPower?',
    type: '',
  },
  {
    title: '',
    value: ':FETCh:AMPLitude? <numeric_value> {HZ | KHZ | MHZ | GHZ}',
    type: '',
  },
  {
    title: '',
    value: ':FETCh:BPOWer?',
    type: '',
  },
  {
    title: '',
    value: ':FETCh:CAGGregation?',
    type: '',
  },
  {
    title: '',
    value: ':FETCh:CHPower?',
    type: '',
  },
  {
    title: '',
    value: ':FETCh:CHPower:CHPower?',
    type: '',
  },
  {
    title: '',
    value: ':FETCh:CHPower:DENSity?',
    type: '',
  },
  {
    title: '',
    value: ':FETCh:CINTerference?',
    type: '',
  },
  {
    title: '',
    value: ':FETCh:CINTerference:CIRAtio?',
    type: '',
  },
  {
    title: '',
    value: ':FETCh:CINTerference:CPOWer?',
    type: '',
  },
  {
    title: '',
    value: ':FETCh:CINTerference:IPOWer?',
    type: '',
  },
  {
    title: '',
    value: ':FETCh:CONStellation:PBCH?',
    type: '',
  },
  {
    title: '',
    value: ':FETCh:CONStellation:PDSCh?',
    type: '',
  },
  {
    title: '',
    value: ':FETCh:CONTrol?',
    type: '',
  },
  {
    title: '',
    value: ':FETCh[:DATA]:ALL? [<ASCii|INTeger|REAL>],[<numeric_value>]',
    type: '',
  },
  {
    title: '',
    value: ':FETCh:DENSity:DATA? <numeric_value>',
    type: '',
  },
  {
    title: '',
    value: ':FETCh:EIRPower?',
    type: '',
  },
  {
    title: '',
    value: ':FETCh:EIRPower:DATA?',
    type: '',
  },
  {
    title: '',
    value: ':FETCh:EIRPower:MAXimum?',
    type: '',
  },
  {
    title: '',
    value: ':FETCh:EMF?',
    type: '',
  },
  {
    title: '',
    value: ':FETCh:EMF:METer?',
    type: '',
  },
  {
    title: '',
    value: ':FETCh:EMF:METer:SAMPle<n>?',
    type: '',
  },
  {
    title: '',
    value: ':FETCh:FRAMe:POWer?',
    type: '',
  },
  {
    title: '',
    value: ':FETCh:INTerference:POWer?',
    type: '',
  },
  {
    title: '',
    value: ':FETCh:MIMO:ANTennas?',
    type: '',
  },
  {
    title: '',
    value: ':FETCh:OBWidth<n>?',
    type: '',
  },
  {
    title: '',
    value: ':FETCh:OTA:MAPPing?',
    type: '',
  },
  {
    title: '',
    value: ':FETCh:PANalyzer?',
    type: '',
  },
  {
    title: '',
    value: ':FETCh:PCI?',
    type: '',
  },
  {
    title: '',
    value: ':FETCh:PDSCh?',
    type: '',
  },
  {
    title: '',
    value: ':FETCh:PEAK?',
    type: '',
  },
  {
    title: '',
    value: ':FETCh:RRM?',
    type: '',
  },
  {
    title: '',
    value: ':FETCh:SCANner?',
    type: '',
  },
  {
    title: '',
    value: ':FETCh:SEMask?',
    type: '',
  },
  {
    title: '',
    value: ':FETCh:SSB?',
    type: '',
  },
  {
    title: '',
    value: ':FETCh:SYNC:EVM?',
    type: '',
  },
  {
    title: '',
    value: ':FETCh:SYNC:POWer?',
    type: '',
  },
  {
    title: '',
    value: ':FETCh:TAE?',
    type: '',
  },
  {
    title: '',
    value: ':FETCh:TRACe:STAT?',
    type: '',
  },
  {
    title: '',
    value: ':FETCh:WCDMa:SYNC?',
    type: '',
  },
  {
    title: '',
    value: ':FORMat[:TRACe][:DATA] <ASCii|INTeger|REAL>,[<numeric_value>]',
    type: '',
  },
  {
    title: '',
    value: ':FORMat[:TRACe][:DATA]?',
    type: '',
  },
  {
    title: '',
    value: ':FRAMe:SPECtrum:TRACe:DISPlay[:STATe] <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: ':FRAMe:SPECtrum:TRACe:DISPlay[:STATe]?',
    type: '',
  },
  {
    title: '',
    value: ':FRAMe:SPECtrum:TRACe:TYPE <NORMal|MINimum|MAXimum|AVERage|RMAXimum|RMINimum|RAVerage|MATH>',
    type: '',
  },
  {
    title: '',
    value: ':FRAMe:SPECtrum:TRACe:TYPE?',
    type: '',
  },
  {
    title: '',
    value: ':FRAMe:SPECtrum:TRACe:UPDate[:STATe] <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: ':FRAMe:SPECtrum:TRACe:UPDate[:STATe]?',
    type: '',
  },
  {
    title: '',
    value: ':FRAMe:TDOMain:TRACe:DISPlay[:STATe] <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: ':FRAMe:TDOMain:TRACe:DISPlay[:STATe]?',
    type: '',
  },
  {
    title: '',
    value: ':FRAMe:TDOMain:TRACe:TYPE <NORMal|MINimum|MAXimum|AVERage|RMAXimum|RMINimum|RAVerage|MATH>',
    type: '',
  },
  {
    title: '',
    value: ':FRAMe:TDOMain:TRACe:TYPE?',
    type: '',
  },
  {
    title: '',
    value: ':FRAMe:TDOMain:TRACe:UPDate[:STATe] <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: ':FRAMe:TDOMain:TRACe:UPDate[:STATe]?',
    type: '',
  },
  {
    title: '',
    value: ':INITiate:CONTinuous <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: ':INITiate:CONTinuous?',
    type: '',
  },
  {
    title: '',
    value: ':INITiate[:IMMediate]',
    type: '',
  },
  {
    title: '',
    value: ':INITiate[:IMMediate]:ALL',
    type: '',
  },
  {
    title: '',
    value: ':INITiate:SPA:SELFtest?',
    type: '',
  },
  {
    title: '',
    value: ':INPut:OPOWer:RELay[:STATe] <CLOSed>',
    type: '',
  },
  {
    title: '',
    value: ':INPut:OPOWer:RELay[:STATe]?',
    type: '',
  },
  {
    title: '',
    value: ':INSTrument:ACTive:STATe <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: ':INSTrument:ACTive:STATe?',
    type: '',
  },
  {
    title: '',
    value: ':INSTrument:REMote:STATe <0 | 1 | ON | OFF>,<string>',
    type: '',
  },
  {
    title: '',
    value: ':INSTrument:REMote:STATe?',
    type: '',
  },
  {
    title: '',
    value: ':MEASure:ACPower?',
    type: '',
  },
  {
    title: '',
    value: ':MEASure:CHPower?',
    type: '',
  },
  {
    title: '',
    value: ':MEASure:CHPower:CHPower?',
    type: '',
  },
  {
    title: '',
    value: ':MEASure:CHPower:DENSity?',
    type: '',
  },
  {
    title: '',
    value: ':MEASure:CINTerference:CANCel',
    type: '',
  },
  {
    title: '',
    value: ':MEASure:CINTerference:CONTinue',
    type: '',
  },
  {
    title: '',
    value: ':MEASure:EMF:METer:CLEar:ALL',
    type: '',
  },
  {
    title: '',
    value: ':MEASure:EMF:METer:CLEar:SAMPle<n>',
    type: '',
  },
  {
    title: '',
    value: ':MEASure:EMF:METer:SAMPle:STATe <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: ':MEASure:EMF:METer:SAMPle:STATe?',
    type: '',
  },
  {
    title: '',
    value: ':MEASure:INTerference:POWer?',
    type: '',
  },
  {
    title: '',
    value: ':MEASure:IQ:CAPTure [<PPS>]',
    type: '',
  },
  {
    title: '',
    value: ':MEASure:IQ:CAPTure:FAIL <OFF|FIRSt|REPeat>',
    type: '',
  },
  {
    title: '',
    value: ':MEASure:IQ:CAPTure:FAIL?',
    type: '',
  },
  {
    title: '',
    value: ':MEASure:OTA:MAPPing?',
    type: '',
  },
  {
    title: '',
    value: ':MEASure:OTA:MAPPing:RUN <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: ':MEASure:OTA:MAPPing:RUN?',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:COEvent:CLEarall',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:COEvent:TIMer:INTerval <numeric_value> {PS | NS | US | MS | S | MIN | HR}',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:COEvent:TIMer:INTerval?',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:EMF:STORe:LOG <string>',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:EMF:STORe:LOG?',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:LOAD:EMF:METer:CSV <string>,<string>,<string>',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:LOAD:LIMit <string>,<string>,<string>',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:LOAD:MAP <string>',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:LOAD:MAP?',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:LOAD[:OTA]:MAPPing:KML <string>,<string>,<string>',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:LOAD:RAM <numeric_value>,<numeric_value>,<string>',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:LOAD:RECord <string>,<string>',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:LOAD:SEMask:CUSTom <string>,<string>',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STOEvent:CLEarall',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STOEvent:EOSWeep:MODE <CONTinuous|SINGle>',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STOEvent:EOSWeep:MODE?',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STOEvent:EOSWeep[:STATe] <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STOEvent:EOSWeep[:STATe]?',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STOEvent:LIMit:INTerval <numeric_value> {PS | NS | US | MS | S | MIN | HR}',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STOEvent:LIMit:INTerval?',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STOEvent:LIMit:MODE <CONTinuous|SINGle|INTerval>',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STOEvent:LIMit:MODE?',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STOEvent:LIMit:PTRigger[:STATe] <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STOEvent:LIMit:PTRigger[:STATe]?',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STOEvent:LIMit[:STATe] <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STOEvent:LIMit[:STATe]?',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STOEvent:TIMer:INTerval <numeric_value> {PS | NS | US | MS | S | MIN | HR}',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STOEvent:TIMer:INTerval?',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STOEvent:TIMer[:STATe] <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STOEvent:TIMer[:STATe]?',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STORe:CAPTure',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STORe:CAPTure:MODE <AUTomatic|MANual>',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STORe:CAPTure:MODE?',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STORe:CAPTure:MSUS <string>',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STORe:CAPTure:MSUS?',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STORe:CAPTure:PATH <string>',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STORe:CAPTure:PATH?',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STORe:CAPTure:PREFix <string>',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STORe:CAPTure:PREFix?',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STORe:CSCanner:CSV:MSUS <string>',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STORe:CSCanner:CSV:MSUS?',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STORe:CSCanner:CSV:PATH <string>',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STORe:CSCanner:CSV:PATH?',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STORe:EMF:METer:CSV <string>,<string>,<string>',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STORe:EMF:METer:KML <string>,<string>',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STORe:LIMit <string>,<string>,<string>',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STORe[:OTA]:MAPPing:CSV <string>,<string>,<string>',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STORe[:OTA]:MAPPing:KML <string>,<string>,<string>',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STORe:RAM <numeric_value>,<numeric_value>,<string>',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STORe:RECord:CSV:DISCard',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STORe:RECord:CSV:MSUS <string>',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STORe:RECord:CSV:MSUS?',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STORe:RECord:CSV:PATH <string>',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STORe:RECord:CSV:PATH?',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STORe:RECord:CSV:PREFix <string>',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STORe:RECord:CSV:PREFix?',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STORe:RECord:MSUS <string>',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STORe:RECord:MSUS?',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STORe:RECord:PATH <string>',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STORe:RECord:PATH?',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STORe:RECord:PREFix <string>',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STORe:RECord:PREFix?',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STORe:STREam:MSUS <string>',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STORe:STREam:MSUS?',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STORe:STREam:PATH <string>',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STORe:STREam:PATH?',
    type: '',
  },
  {
    title: '',
    value: ':MMEMory:STORe:TRACe:CSV <string>,<string>,<string>',
    type: '',
  },
  {
    title: '',
    value: ':OUTPut:IF:FILTer <K750|M7P5|M14|M30|M100>',
    type: ':OUTPut:IF:FILTer?',
  },
  {
    title: '',
    value: ':OUTPut:IF:STATe <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: ':OUTPut:IF:STATe?',
    type: '',
  },
  {
    title: '',
    value: ':READ:ACPower?',
    type: '',
  },
  {
    title: '',
    value: ':READ:CHPower?',
    type: '',
  },
  {
    title: '',
    value: ':READ:CHPower:CHPower?',
    type: '',
  },
  {
    title: '',
    value: ':READ:CHPower:DENSity?',
    type: '',
  },
  {
    title: '',
    value: ':READ:EIRPower?',
    type: '',
  },
  {
    title: '',
    value: ':READ:EIRPower:DATA?',
    type: '',
  },
  {
    title: '',
    value: ':READ:EIRPower:MAXimum?',
    type: '',
  },
  {
    title: '',
    value: ':READ:INTerference:POWer?',
    type: '',
  },
  {
    title: '',
    value: ':READ:OTA:MAPPing?',
    type: '',
  },
  {
    title: '',
    value: ':READ:SEMask?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:ACPower:BANDwidth|BWIDth:ADJacent <numeric_value> {HZ | KHZ | MHZ | GHZ}',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:ACPower:BANDwidth|BWIDth:ADJacent?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:ACPower:BANDwidth|BWIDth:ALTernate <numeric_value> {HZ | KHZ | MHZ | GHZ}',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:ACPower:BANDwidth|BWIDth:ALTernate?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:ACPower:BANDwidth|BWIDth:MAIN <numeric_value> {HZ | KHZ | MHZ | GHZ}',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:ACPower:BANDwidth|BWIDth:MAIN?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:ACPower:BANDwidth|BWIDth:SPACing <numeric_value> {HZ | KHZ | MHZ | GHZ}',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:ACPower:BANDwidth|BWIDth:SPACing?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:ACPower:STATe <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:ACPower:STATe?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:AMFM:AUDio:RECord',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:AMFM:AUDio:RECord:DURation <numeric_value> {PS | NS | US | MS | S | MIN | HR}',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:AMFM:AUDio:RECord:DURation?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:AMFM:AUDio:RESults?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:AMFM:AUDio:STATe <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:AMFM:AUDio:STATe?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:AMFM:DEMod:BWIDth?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:AMFM:DEMod:FREQuency <numeric_value> {HZ | KHZ | MHZ | GHZ}',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:AMFM:DEMod:FREQuency?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:AMFM:DEMod:MARKer:SELect <numeric_value>',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:AMFM:DEMod:MARKer:SELect?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:AMFM:DEMod:MARKer:STATe <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:AMFM:DEMod:MARKer:STATe?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:AMFM:DEMod:TYPE <AM|USBand|LSBand|FMWideband|FMNarrowband|FM125|FM625>',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:AMFM:DEMod:TYPE?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:AMFM:SQUelch <numeric_value> {<amplitude_units>}',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:AMFM:SQUelch?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:AMFM:STATe <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:AMFM:STATe?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:ARFChannel <numeric_value>',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:ARFChannel?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:AVERage:COUNt <numeric_value>',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:AVERage:COUNt?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:AVERage:TYPE <NORMal|MINimum|MAXimum|AVERage|RMAXimum|RMINimum|RAVerage|MATH>',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:AVERage:TYPE?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:BANDwidth|BWIDth[:RESolution] <numeric_value> {HZ | KHZ | MHZ | GHZ}',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:BANDwidth|BWIDth[:RESolution]?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:BANDwidth|BWIDth[:RESolution] <numeric_value> {HZ | KHZ | MHZ | GHZ}',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:BANDwidth|BWIDth[:RESolution]?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:BANDwidth|BWIDth[:RESolution]:RATio <numeric_value>',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:BANDwidth|BWIDth[:RESolution]:RATio?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:BANDwidth|BWIDth:VIDeo <numeric_value> {HZ | KHZ | MHZ | GHZ}',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:BANDwidth|BWIDth:VIDeo?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:BANDwidth|BWIDth:VIDeo <numeric_value> {HZ | KHZ | MHZ | GHZ}',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:BANDwidth|BWIDth:VIDeo?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:BANDwidth|BWIDth:VIDeo:RATio <numeric_value>',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:BANDwidth|BWIDth:VIDeo:RATio?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:BANDwidth|BWIDth:VIDeo:TYPE <LINear|LOGarithmic>',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:BANDwidth|BWIDth:VIDeo:TYPE?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:BANDwidth[:RESolution]:AUTO <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:BANDwidth[:RESolution]:AUTO?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:BANDwidth:VIDeo:AUTO <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:BANDwidth:VIDeo:AUTO?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:BEAM <numeric_value>',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:BEAM?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:BEAM:TRACking:STATe <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:BEAM:TRACking:STATe?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:BPOWer:END <numeric_value> {PS | NS | US | MS | S | MIN | HR}',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:BPOWer:END?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:BPOWer:STARt <numeric_value> {PS | NS | US | MS | S | MIN | HR}',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:BPOWer:STARt?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:BPOWer:STATe <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:BPOWer:STATe?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:CAGGregation?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:CAGGregation:CARRier:ACTive <numeric_value>',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:CAGGregation:CARRier:ACTive?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:CAGGregation:CARRier:COUNt <numeric_value>',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:CAGGregation:CARRier:COUNt?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:CAGGregation:STATe <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:CAGGregation:STATe?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:CBWidth <numeric_value> {HZ | KHZ | MHZ | GHZ}',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:CBWidth?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:CBWidth <numeric_value> {HZ | KHZ | MHZ | GHZ}',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:CBWidth?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:CBWidth:CATalog?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:CCHannel:STATe <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:CCHannel:STATe?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:CHANnel:SCSPacing:CATalog?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:CHPower:BANDwidth|BWIDth:INTegration <numeric_value> {HZ | KHZ | MHZ | GHZ}',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:CHPower:BANDwidth|BWIDth:INTegration?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:CHPower:STATe <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:CHPower:STATe?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:CINTerference:BANDwidth|BWIDth:INTegration <numeric_value> {HZ | KHZ | MHZ | GHZ}',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:CINTerference:BANDwidth|BWIDth:INTegration?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:CINTerference:CARRier:STATe?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:CINTerference:STATe <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:CINTerference:STATe?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:CLOCk:ADJust <numeric_value> {PS | NS | US | MS | S | MIN | HR}',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:CLOCk:ADJust?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:CONStellation <PBCH|PDSCh>',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:CONStellation?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:CONStellation:PBCH?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:CONStellation:PBCH:BEAM <numeric_value>',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:CONStellation:PBCH:BEAM?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:CONStellation:PDSCh?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:CONStellation:REFerence:STATe <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:CONStellation:REFerence:STATe?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:CONStellation:STATe <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:CONStellation:STATe?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:CYCLicprefix <NORMal|EXTended|AUTO>',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:CYCLicprefix?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:CYCLicprefix <NORMal|EXTended|AUTO>',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:CYCLicprefix?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:DEMod:DISCard:CSV',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:DEMod:GATE:DURation <COUPled|FRAMe>',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:DEMod:GATE:DURation?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:DEMod:GATE:SPECtrum:TYPe <UPLink|DWLink|FLEXible|GP|ALL|NONe>',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:DEMod:GATE:SPECtrum:TYPe?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:DEMod:LOG <LOG|PAUSe|STOP>',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:DEMod:LOG?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:DEMod:STORe:MSUS <string>',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:DEMod:STORe:MSUS?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:DEMod:STORe:PATH <string>',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:DEMod:STORe:PATH?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:DENSity:ACQuisition <numeric_value> {PS | NS | US | MS | S | MIN | HR}',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:DENSity:ACQuisition?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:DENSity:CSCale:AUTO <0 | 1 | ON | OFF>',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:DENSity:CSCale:AUTO?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:DENSity:CSCale:HIGH <numeric_value>',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:DENSity:CSCale:HIGH?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:DENSity:CSCale:LOW <numeric_value>',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:DENSity:CSCale:LOW?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:DENSity:DETection:MINimum?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:DENSity:DISPlay:RESolution <NORMal|HIGH>',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:DENSity:DISPlay:RESolution?',
    type: '',
  },
  {
    title: '',
    value: '[:SENSe]:DENSity:FFT:COUNt?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:DENSity:PERSistence <numeric_value> {PS | NS | US | MS | S | MIN | HR}',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:DENSity:PERSistence?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:DENSity:PERSistence:CLEar',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:DENSity:PERSistence:STATe <VARiable|INFinite>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:DENSity:PERSistence:STATe?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:DENSity:POI?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:DENSity:STATe <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:DENSity:STATe?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:DETector[:FUNCtion] <POSitive|RMS|NEGative|SAMPle|NORMal>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:DETector[:FUNCtion]?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:DF:INFormation?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:DUPLex <FDD|TDD>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:DUPLex?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:EARFchannel <numeric_value>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:EARFchannel?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:EIRPower:CLOSs <numeric_value> {DB}',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:EIRPower:CLOSs?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:EIRPower:DISTance <numeric_value>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:EIRPower:DISTance?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:EIRPower:DISTance:UNIT <METers|FEET>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:EIRPower:DISTance:UNIT?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:EIRPower:MAXimum:COUNt?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:EIRPower:MAXimum:RESet',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:EIRPower:PLOSs?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:EIRPower:RAGain <numeric_value> {DB}',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:EIRPower:RAGain?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:EIRPower:STATe <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:EIRPower:STATe?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:EIRPower:SUM:RESet',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:EIRPower:TAGain <numeric_value> {DB}',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:EIRPower:TAGain?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:EMF:AXIS <X|Y|Z>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:EMF:AXIS?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:EMF:AXIS:TIME <numeric_value> {PS | NS | US | MS | S | MIN | HR}',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:EMF:AXIS:TIME?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:EMF:ICNirp?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:EMF:ICNirp:STATe <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:EMF:ICNirp:STATe?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:EMF:LOG <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:EMF:LOG?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:EMF:MEASurement:COUNt <numeric_value>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:EMF:MEASurement:COUNt?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:EMF:MEASurement:TIME <numeric_value> {PS | NS | US | MS | S | MIN | HR}',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:EMF:MEASurement:TIME?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:EMF:METer:PROBe:INFO?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:EMF:METer:SAMPle <numeric_value>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:EMF:METer:SAMPle?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:EMF:RUN <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:EMF:RUN?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:EMF:STATe <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:EMF:STATe?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:FPAView <FRAMe|SUBFrame|SLOT>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:FPAView?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:FRAMe:POWer:STATe <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:FRAMe:POWer:STATe?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:FREQuency:CENTer <numeric_value> {HZ | KHZ | MHZ | GHZ}',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:FREQuency:CENTer?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:FREQuency:CENTer:SHARe <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:FREQuency:CENTer:SHARe?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:FREQuency:LIMit?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:FREQuency:OFFSet <numeric_value> {HZ | KHZ | MHZ | GHZ}',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:FREQuency:OFFSet?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:FREQuency:SPAN <numeric_value> {HZ | KHZ | MHZ | GHZ}',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:FREQuency:SPAN?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:FREQuency:SPAN:FULL',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:FREQuency:SPAN:LAST',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:FREQuency:STARt <numeric_value> {HZ | KHZ | MHZ | GHZ}',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:FREQuency:STARt?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:FREQuency:STEP[:INCRement] <numeric_value> {HZ | KHZ | MHZ | GHZ}',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:FREQuency:STEP[:INCRement]?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:FREQuency:STOP <numeric_value> {HZ | KHZ | MHZ | GHZ}',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:FREQuency:STOP?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:FREQuency:SWEep:TIME <numeric_value> {PS | NS | US | MS | S | MIN | HR}',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:FREQuency:SWEep:TIME?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:FREQuency:SWEep:TIMe:AUTO <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:FREQuency:SWEep:TIMe:AUTO?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:FSTRength:ANTenna <string>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:FSTRength:ANTenna?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:FSTRength:ANTenna:FACTor?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:FSTRength:ANTenna:FILE <block data>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:FSTRength:ANTenna:FILE?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:FSTRength:ANTenna:LIST?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:FSTRength:ANTenna:LIST:USER?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:FSTRength:STATe <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:FSTRength:STATe?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:FSTRength:STATe <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:FSTRength:STATe?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:GATE:DELay <numeric_value> {PS | NS | US | MS | S | MIN | HR}',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:GATE:DELay?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:GATE:DLSLots[:ONE] <numeric_value>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:GATE:DLSLots[:ONE]?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:GATE:DLSLots:TWO <numeric_value>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:GATE:DLSLots:TWO?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:GATE:DLSYmbols[:ONE] <numeric_value>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:GATE:DLSYmbols[:ONE]?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:GATE:DLSYmbols:TWO <numeric_value>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:GATE:DLSYmbols:TWO?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:GATE:FRAMe:OFFSet <numeric_value> {PS | NS | US | MS | S | MIN | HR}',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:GATE:FRAMe:OFFSet?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:GATE:FRAMe:STARttime <AUTO|SYNO|UTC|UTC3pos|UTC2neg|CUSTom>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:GATE:FRAMe:STARttime?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:GATE:FRAMe:STARttime:FORCe',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:GATE:FRAMestructure <A|B1|B2|CUSTom>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:GATE:FRAMestructure?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:GATE:FRAMestructure:SSTYpe <TYP1|TYP2>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:GATE:FRAMestructure:SSTYpe?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:GATE:LENGth <numeric_value> {PS | NS | US | MS | S | MIN | HR}',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:GATE:LENGth?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:GATE:PERiod <P1s|P20ms|P10ms>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:GATE:PERiod?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:GATE:PERIodicity[:ONE] <M0P5|M0P625|M1P0|M1P25|M2P0|M2P5|M3P0|M4P0|M5P0|M10P0|NONE>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:GATE:PERIodicity[:ONE]?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:GATE:PERIodicity:TWO <M0P5|M0P625|M1P0|M1P25|M2P0|M2P5|M3P0|M4P0|M5P0|M10P0|NONE>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:GATE:PERIodicity:TWO?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:GATE:STATe <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:GATE:STATe?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:GATE:TRIGger <GPS|EXT1|EXT2>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:GATE:TRIGger?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:GATE:ULSLots[:ONE] <numeric_value>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:GATE:ULSLots[:ONE]?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:GATE:ULSLots:TWO <numeric_value>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:GATE:ULSLots:TWO?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:GATE:ULSYmbols[:ONE] <numeric_value>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:GATE:ULSYmbols[:ONE]?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:GATE:ULSYmbols:TWO <numeric_value>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:GATE:ULSYmbols:TWO?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:GSCNumber <numeric_value>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:GSCNumber?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:INTerference:BANDwidth|BWIDth:INTegration <numeric_value> {HZ | KHZ | MHZ | GHZ}',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:INTerference:BANDwidth|BWIDth:INTegration?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:INTerference:MAX <numeric_value> {<amplitude_units>}',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:INTerference:MAX?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:INTerference:MIN <numeric_value> {<amplitude_units>}',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:INTerference:MIN?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:INTerference:STATe <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:INTerference:STATe?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:IQ:BITS <F32|I32|I16|I10|I8>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:IQ:BITS?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:IQ:CONCatenate[:STATe] <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:IQ:CONCatenate[:STATe]?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:IQ:DISCard',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:IQ:FPGA:SWITch <PCIe|IQC>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:IQ:LENGth <numeric_value> {PS | NS | US | MS | S | MIN | HR}',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:IQ:LENGth?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:IQ:LENGth:MAX?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:IQ:MEMory?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:IQ:MEMory:STREam?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:IQ:METadata?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:IQ:MODE <SINGle|STREam|CONTinuous>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:IQ:MODE?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:IQ:PORT <DATaout|USB|ETHernet>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:IQ:PORT?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:IQ:PORT:DATAout?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:IQ:SAMPle <SB1|SB2|SB3|SB4|SB5|SB6|SB7|SB8|SB9|SB10|SB11|SB12|SB13|SB14|SB15|SB16|SB17|SB18|SB19|SB20>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:IQ:SAMPle?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:IQ:SAMPle:CALibration:CONFiguration?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:IQ:SAMPle:CONFiguration?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:IQ:SAVE:PROGress?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:IQ:SIGNing <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:IQ:SIGNing?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:IQ:STATus?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:IQ:TIMEstamps <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:IQ:TIMEstamps?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:ISOTropic:AXIS <X|Y|Z|NONE>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:ISOTropic:FACTors?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:ISOTropic:INFOrmation?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:LTE:CFI <AUTO|CFI1|CFI2|CFI3>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:LTE:CFI?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:LTE:OBANd',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:LTE:OBANd?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:MIMO:ANTenna:PORT <AUTO|ANT0|ANT1|ANT2|ANT3>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:MIMO:ANTenna:PORT?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:MODE <SPECtrum|NRADio|RTSA|LTE|EMFMeter|PANalyzer|IASPectrum|IARTsa|CSCanner|WCDMa>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:MODE?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:MODE:CATalog?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:MODulation:REFerence?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:MODulation:TYPE <ALL|QPSK|Q16|Q64|Q256>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:MODulation:TYPE?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:NGFactor <ONESixth|HALF|ONE|TWO>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:NGFactor?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:NRADio:MAPPing:PATTern <P1|P2|AUTO>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:NRADio:MAPPing:PATTern?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:OBANd <INValid|GLOBal|N1|N2|N3|N5|N7|N8|N12|N13|N14|N18|N20|N24|N25|N26|N28|N29|N30|N34|N38|N39|N40|N41|N46|N48|N50|N51|N53|N54|N65|N66|N67|N70|N71|N74|N75|N76|N77|N78|N79|N85|N90|N91|N92|N93|N94|N96|N100|N101|N102|N104|N105|N257|N258|N259|N260|N261|N262|N263>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:OBANd?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:OBWidth:METHod <XDB|PERCent>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:OBWidth:METHod?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:OBWidth:PERCent <numeric_value>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:OBWidth:PERCent?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:OBWidth:STATe <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:OBWidth:STATe?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:OBWidth:XDB <numeric_value> {DB}',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:OBWidth:XDB?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:CHP:THReshold[:DATA] <numeric_value> {<amplitude_units>}, {<numeric_value> {<amplitude_units>}}, ...',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:CHP:THReshold[:DATA]?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:CSCanner:BESt <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:CSCanner:BESt?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:CSCanner:INDex <numeric_value>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:CSCanner:INDex?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:DEFaults <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:DEFaults?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:DISTance:UNIT <METers|FEET>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:DISTance:UNIT?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:MEASurement <CHPower|PSDensity|RSSI>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:MEASurement?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:POINts?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:POINts:DELete',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:POINts:STAT?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:POSition <string>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:POSition?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:PSD:THReshold[:DATA] <numeric_value> {<amplitude_units>}, {<numeric_value> {<amplitude_units>}}, ...',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:PSD:THReshold[:DATA]?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:REPeat:DISTance <numeric_value>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:REPeat:DISTance?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:REPeat:TIME <numeric_value> {PS | NS | US | MS | S | MIN | HR}',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:REPeat:TIME?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:REPeat:TYPE <TIME|DISTance>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:REPeat:TYPE?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:RSP:THReshold[:DATA] <numeric_value> {<amplitude_units>}, {<numeric_value> {<amplitude_units>}}, ...',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:RSP:THReshold[:DATA]?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:RSQ:THReshold[:DATA] <numeric_value> {<amplitude_units>}, {<numeric_value> {<amplitude_units>}}, ...',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:RSQ:THReshold[:DATA]?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:RSSI:THReshold[:DATA] <numeric_value> {<amplitude_units>}, {<numeric_value> {<amplitude_units>}}, ...',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:RSSI:THReshold[:DATA]?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:RSS:THReshold[:DATA] <numeric_value> {<amplitude_units>}, {<numeric_value> {<amplitude_units>}}, ...',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:RSS:THReshold[:DATA]?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:SOURce <ANY|DEFined>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:SOURce?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:SOURce:VALue <numeric_value>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:SOURce:VALue?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:SSP:THReshold[:DATA] <numeric_value> {<amplitude_units>}, {<numeric_value> {<amplitude_units>}}, ...',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:SSP:THReshold[:DATA]?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:SSQ:THReshold[:DATA] <numeric_value> {<amplitude_units>}, {<numeric_value> {<amplitude_units>}}, ...',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:SSQ:THReshold[:DATA]?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:SSS:THReshold[:DATA] <numeric_value> {<amplitude_units>}, {<numeric_value> {<amplitude_units>}}, ...',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:SSS:THReshold[:DATA]?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:STATe <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:STATe?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:TYPE <INDoor|OUTDoor>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:OTA]:MAPPing:TYPE?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PANalyzer?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PANalyzer:ALL?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PCI?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:POLar:CLEar',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:POLar:DATA?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:POLar:DCOLlect <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:POLar:DCOLlect?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:POLar:STATe <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:POLar:STATe?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:POWer:RF:ATTenuation <numeric_value> {DB}',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:POWer:RF:ATTenuation?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:POWer:RF:ATTenuation <numeric_value> {DB}',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:POWer:RF:ATTenuation?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:POWer:RF:ATTenuation:AUTO <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:POWer:RF:ATTenuation:AUTO?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:POWer:RF:ATTenuation:AUTO <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:POWer:RF:ATTenuation:AUTO?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:POWer:RF:GAIN:AUTO <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:POWer:RF:GAIN:AUTO?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:POWer:RF:GAIN:STATe <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:POWer:RF:GAIN:STATe?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:POWer:RF:GAIN:STATe <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:POWer:RF:GAIN:STATe?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LABel:ALL:OFF',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LABel:ALL:ON',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LABel:INSTant:CENTer <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LABel:INSTant:CENTer?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LABel:INSTant:REFerence:DURation:FIRSt <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LABel:INSTant:REFerence:DURation:FIRSt?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LABel:INSTant:REFerence:DURation:SECond <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LABel:INSTant:REFerence:DURation:SECond?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LABel:INSTant:REFerence:HIGH:FIRSt <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LABel:INSTant:REFerence:HIGH:FIRSt?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LABel:INSTant:REFerence:HIGH:SECond <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LABel:INSTant:REFerence:HIGH:SECond?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LABel:INSTant:REFerence:LOW:FIRSt <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LABel:INSTant:REFerence:LOW:FIRSt?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LABel:INSTant:REFerence:LOW:SECond <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LABel:INSTant:REFerence:LOW:SECond?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LABel:INSTant:TRANsition:POST:ABERration <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LABel:INSTant:TRANsition:POST:ABERration?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LABel:INSTant:TRANsition:POST:OVER <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LABel:INSTant:TRANsition:POST:OVER?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LABel:INSTant:TRANsition:POST:UNDer <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LABel:INSTant:TRANsition:POST:UNDer?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LABel:INSTant:TRANsition:PRE:ABERration <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LABel:INSTant:TRANsition:PRE:ABERration?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LABel:INSTant:TRANsition:PRE:OVER <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LABel:INSTant:TRANsition:PRE:OVER?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LABel:INSTant:TRANsition:PRE:UNDer <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LABel:INSTant:TRANsition:PRE:UNDer?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LABel:LEVel:REFerence:DURation <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LABel:LEVel:REFerence:DURation?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LABel:LEVel:REFerence:HIGH <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LABel:LEVel:REFerence:HIGH?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LABel:LEVel:REFerence:LOW <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LABel:LEVel:REFerence:LOW?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LABel:LEVel:STATe:HIGH <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LABel:LEVel:STATe:HIGH?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LABel:LEVel:STATe:LOW <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LABel:LEVel:STATe:LOW?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LEVel:TYPE <AUTO|USER>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LEVel:TYPE?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LEVel:USER:BOTTom <numeric_value> {<amplitude_units>}',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LEVel:USER:BOTTom?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LEVel:USER:TOP <numeric_value> {<amplitude_units>}',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:LEVel:USER:TOP?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:REFerence:DURation <percent_value>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:REFerence:DURation?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:REFerence:HIGH <percent_value>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:REFerence:HIGH?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:REFerence:LOW <percent_value>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:REFerence:LOW?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:SIMulation:AMPLitude:HIGH <numeric_value> {<amplitude_units>}',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:SIMulation:AMPLitude:HIGH?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:SIMulation:AMPLitude:LOW <numeric_value> {<amplitude_units>}',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:SIMulation:AMPLitude:LOW?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:SIMulation:DUTY <numeric_value>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:SIMulation:DUTY?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:SIMulation:PERiod <numeric_value> {PS | NS | US | MS | S | MIN | HR}',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:SIMulation:PERiod?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:SIMulation:STATe <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:SIMulation:STATe?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:SIMulation:WAVeform <SPOStive|SNEGative|TRAin|DOUBle>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:SIMulation:WAVeform?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:TYPE <POSitive|NEGative>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:PULSe:TYPE?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:SCANner?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:SCANner:STATe <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:SCANner:STATe?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:SEMask:CENTer:BWIDth <numeric_value> {HZ | KHZ | MHZ | GHZ}',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:SEMask:CENTer:BWIDth?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:SEMask:MASK <GT38|LT38|W43|W41|W35|W31|WK43|WK41|WK35|WK30|LK24|LK22|LK20|NK38|NK35|NK28|NK24|CUSTom>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:SEMask:MASK?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:SEMask:MASK:CUSTom <string>,<block data>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:SEMask:MASK:CUSTom?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:SEMask:MASK:TYPe?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:SEMask:RPOWer <numeric_value> {<amplitude_units>}',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:SEMask:RPOWer?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:SEMask:RPOWer:STATe <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:SEMask:RPOWer:STATe?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:SEMask:STATe <0 | 1 | ON | OFF>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:SEMask:STATe?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:SSB?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:SSB:FREQuency <numeric_value> {HZ | KHZ | MHZ | GHZ}',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:SSB:FREQuency?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:SSB:OFFSet <numeric_value> {HZ | KHZ | MHZ | GHZ}',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:SSB:OFFSet?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:SSB:OFFSet:AUTO:ABORt',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:SSB:OFFSet:AUTO:STARt',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:SSB:OFFSet:AUTO:STATus?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:SSB]:SCSPacing <numeric_value> {HZ | KHZ | MHZ | GHZ}',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:SSB]:SCSPacing?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe][:SSB]:SCSPacing:CATalog?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:STATistics:CLEar',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:SUBFrame <numeric_value>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:SUBFrame?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:SUBFrame:CONFiguration <AUTO|SSF0|SSF1|SSF2|SSF3|SSF4|SSF5|SSF6|SSF7|SSF8|SSF9|INValid>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:SUBFrame:CONFiguration?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:SUBFrame:SLOT <numeric_value>',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:SUBFrame:SLOT?',
    type: ''
  },
  {
    title: '',
    value: '[:SENSe]:SWEep:TIME <numeric_value> {PS | NS | US | MS | S | MIN | HR}',
    type: 'Command'
  },
  {
    title: '',
    value: '[:SENSe]:SWEep:TIME?',
    type: 'Query'
  },
  {
    title: '',
    value: '[:SENSe]:SWEep:TIME:AUTO <0 | 1 | ON | OFF>',
    type: 'Command'
  },
  {
    title: '',
    value: '[:SENSe]:SWEep:TIME:AUTO?',
    type: 'Query'
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
  {
    title: '',
    value: '',
    type: ''
  },
]