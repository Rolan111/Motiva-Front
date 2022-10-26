export enum LocalStorageKeyEnum {
  name = 'name',
  userName = 'userName',
  lastName = 'lastName',
  rol = 'rolUser',
  token = 'token',
  type = 'type',
}

export enum RolesEnum {
  SUPERVISOR = 'SUPERVISOR',
  USER = 'USER',
  P_CAMPO = 'P_CAMPO',
  AGENTE = 'AGENTE',
}

export var arrayMunicipios:any=[
  {viewValue: 'POPAYAN'},
  {viewValue: 'ALMAGUER'},
  {viewValue: 'ARGELIA'},
  {viewValue: 'BALBOA'},
  {viewValue: 'BOLIVAR'},
  {viewValue: 'BUENOS AIRES'},
  {viewValue: 'CAJIBIO'},
  {viewValue: 'CALDONO'},
  {viewValue: 'CALOTO'},
  {viewValue: 'CORINTO'},
  {viewValue: 'EL TAMBO'},
  {viewValue: 'FLORENCIA'},
  {viewValue: 'GUACHENE'},
  {viewValue: 'GUAPI'},
  {viewValue: 'INZA'},
  {viewValue: 'JAMBALO'},
  {viewValue: 'LA SIERRA'},
  {viewValue: 'LA VEGA'},
  {viewValue: 'LOPEZ'},
  {viewValue: 'MERCADERES'},
  {viewValue: 'MIRANDA'},
  {viewValue: 'MORALES'},
  {viewValue: 'PADILLA'},
  {viewValue: 'PAEZ'},
  {viewValue: 'PIAMONTE'},
  {viewValue: 'PIENDAMO'},
  {viewValue: 'PUERTO TEJADA'},
  {viewValue: 'PATIA'},
  {viewValue: 'PURACE'},
  {viewValue: 'ROSAS'},
  {viewValue: 'SAN SEBASTIAN'},
  {viewValue: 'SANTANDER DE QUILICHAO'},
  {viewValue: 'SANTA ROSA'},
  {viewValue: 'SILVIA'},
  {viewValue: 'SOTARA'},
  {viewValue: 'SUAREZ'},
  {viewValue: 'SUCRE'},
  {viewValue: 'TIMBIO'},
  {viewValue: 'TIMBIQUI'},
  {viewValue: 'TORIBIO'},
  {viewValue: 'TOTORO'},
  {viewValue: 'VILLA RICA'}
]

//actualización 1
export var arrayMeses:any=[
  {value: '01', viewValue: 'ENERO'},
  {value: '02', viewValue: 'FEBRERO'},
  {value: '03', viewValue: 'MARZO'},
  {value: '04', viewValue: 'ABRIL'},
  {value: '05', viewValue: 'MAYO'},
  {value: '06', viewValue: 'JUNIO'},
  {value: '07', viewValue: 'JULIO'},
  {value: '08', viewValue: 'AGOSTO'},
  {value: '09', viewValue: 'SEPTIEMBRE'},
  {value: '10', viewValue: 'OCTUBRE'},
  {value: '11', viewValue: 'NOVIEMBRE'},
  {value: '12', viewValue: 'DICIEMBRE'}
]

export var arraySubRegion:any=[
  {value: '01', viewValue: 'CENTRO '},
  {value: '02', viewValue: 'MACIZO'},
  {value: '03', viewValue: 'NORTE'},
  {value: '04', viewValue: 'ORIENTE'},
  {value: '05', viewValue: 'PACIFICO'},
  {value: '06', viewValue: 'PIEDEMONTE AMAZONICO'},
  {value: '07', viewValue: 'SUR'},
  {value: '08',viewValue: 'TODOS'}
]

export var arrayZonaCentro:string[]=[
  "SILVIA","POPAYAN", "MORALES", "TIMBIO","PIENDAMO","EL TAMBO", "PURACE", "CAJIBIO", "ARGELIA" //QUITAR ARGELIA -- se usa solo para pruebas
]

export var arrayZonaMacizo:string[]=[
  "SAN SEBASTIAN","SANTA ROSA","LA VEGA", "LA SIERRA", "SOTARA","ALMAGUER","ROSAS"
]

export var arrayZonaNorte:string[]=[
  "SANTANDER DE QUILICHAO","CORINTO","TORIBIO","BUENOS AIRES","GUACHENE","SUAREZ","PADILLA","CALOTO","VILLA RICA","CALDONO","MIRANDA","JAMBALO","PUERTO TEJADA"
]

export var arrayZonaOriente:string[]=[
  "INZA","PAEZ","TOTORO"
]

export var arrayZonaPacifico:string[]=[
  "GUAPI","LOPEZ","TIMBIQUI"
]

export var arrayZonaPiedemonteAmazonico:string[]=[
  "PIAMONTE"
]

export var arrayZonaSur:string[]=[
  "PATIA","FLORENCIA","SUCRE","BALBOA","MERCADERES","BOLIVAR", "ARGELIA"
]

export var arrayZona:any=[
  {value: 'URBANA', viewValue: 'URBANA '},
  {value: 'RURAL', viewValue: 'RURAL'},
  {value: 'TODAS', viewValue: 'TODAS'},
]
export var arrayRutas:any=[
  {value: '01', viewValue: 'SI '},
  {value: '02', viewValue: 'NO'},
  {value: '03', viewValue: 'TODAS'},
]


