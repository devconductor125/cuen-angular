import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-iph',
  templateUrl: './report-iph.component.html',
  styleUrls: ['./report-iph.component.scss']
})
export class ReportIphComponent implements OnInit {

  public arrMonth: Array<any> =  [
    {
      name: 'Enero',
      value: '01'
    },
    {
      name: 'Febrero',
      value: '02'
    },
    {
      name: 'Marzo',
      value: '03'
    },
    {
      name: 'Abril',
      value: '04'
    },
    {
      name: 'Mayo',
      value: '05'
    },
    {
      name: 'Junio',
      value: '06'
    },
    {
      name: 'Julio',
      value: '07'
    },
    {
      name: 'Agosto',
      value: '08'
    },
    {
      name: 'Septiembre',
      value: '09'
    },
    {
      name: 'Octubre',
      value: '10'
    },
    {
      name: 'Noviembre',
      value: '11'
    },
    {
      name: 'Diciembre',
      value: '12'
    }
  ];
  public arrYear: Array<any> =  [
    {
      name: '2018',
      value: '2018'
    },
    {
      name: '2019',
      value: '2019'
    },
    {
      name: '2020',
      value: '2020'
    },
    {
      name: '2021',
      value: '2021'
    },
    {
      name: '2022',
      value: '2022'
    },
    {
      name: '2023',
      value: '2023'
    },
    {
      name: '2024',
      value: '2024'
    },
    {
      name: '2025',
      value: '2025'
    },
    {
      name: '2026',
      value: '2026'
    },
    {
      name: '2027',
      value: '2027'
    },
    {
      name: '2028',
      value: '2028'
    },
    {
      name: '2029',
      value: '2029'
    },
    {
      name: '2030',
      value: '2030'
    },
    {
      name: '2031',
      value: '2031'
    },
    {
      name: '2032',
      value: '2032'
    },
    {
      name: '2033',
      value: '2033'
    },
    {
      name: '2034',
      value: '2034'
    },
    {
      name: '2035',
      value: '2035'
    },
    {
      name: '2036',
      value: '2036'
    },
    {
      name: '2036',
      value: '2036'
    },
    {
      name: '2037',
      value: '2037'
    },
    {
      name: '2038',
      value: '2038'
    },
    {
      name: '2039',
      value: '2039'
    },
    {
      name: '2040',
      value: '2040'
    },
    {
      name: '2041',
      value: '2041'
    },
    {
      name: '2042',
      value: '2042'
    },
    {
      name: '2043',
      value: '2043'
    },
    {
      name: '2044',
      value: '2044'
    },
    {
      name: '2045',
      value: '2045'
    },
    {
      name: '2046',
      value: '2046'
    },
    {
      name: '2046',
      value: '2046'
    },
    {
      name: '2047',
      value: '2047'
    },
    {
      name: '2048',
      value: '2048'
    },
    {
      name: '2049',
      value: '2049'
    },
    {
      name: '2050',
      value: '2050'
    },
    {
      name: '2051',
      value: '2051'
    },
    {
      name: '2052',
      value: '2052'
    },
    {
      name: '2053',
      value: '2053'
    },
    {
      name: '2054',
      value: '2054'
    },
    {
      name: '2055',
      value: '2055'
    },
    {
      name: '2056',
      value: '2056'
    },
    {
      name: '2056',
      value: '2056'
    },
    {
      name: '2057',
      value: '2057'
    },
    {
      name: '2058',
      value: '2058'
    },
    {
      name: '2059',
      value: '2059'
    },
    {
      name: '2060',
      value: '2060'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
