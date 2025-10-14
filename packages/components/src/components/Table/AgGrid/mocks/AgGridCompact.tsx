import { useCallback, useEffect, useRef, useState } from 'react';
import { AG_GRID_LICENSE_KEY } from '@iress/ag-grid-license-key';
import type {
  GridApi,
  GridReadyEvent,
  ValueFormatterParams,
} from 'ag-grid-community';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import {
  AllEnterpriseModule,
  LicenseManager,
  ModuleRegistry,
  provideGlobalGridOptions,
} from 'ag-grid-enterprise';
import { AG_THEME_IRESS_ICONS, IressAgGridContainer } from '@iress/ids-themes';

import styles from '@iress-storybook/styles.module.scss';

LicenseManager.setLicenseKey(AG_GRID_LICENSE_KEY);
ModuleRegistry.registerModules([AllEnterpriseModule]);
provideGlobalGridOptions({ theme: 'legacy' });

const formatter2dp = new Intl.NumberFormat('en-UK', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const formatterCurrency = new Intl.NumberFormat('en-UK', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  currencySign: 'standard',
  currency: 'GBP',
  style: 'currency',
});

const getSales = (number: number) => {
  const no = number * 100000;
  return Math.ceil(no);
};

const getProfit = (number: number) => {
  const no = number > 0.5 ? number * -1000 : number * 1000;
  return formatter2dp.format(no);
};

const getRating = () => (Math.random() > 0.5 ? 'red' : 'green');

const BIG_DATA = [
  {
    firstName: 'Shellie',
    lastName: 'Cantu',
    email: 'aliquet@purus.com',
    phoneNo: '0828 746 6831',
    street: '639-9644 Eget Street',
    city: 'Weißenfels',
    postcode: '37962',
    country: 'French Polynesia',
    personalID: '16011210 9582',
  },
  {
    firstName: 'Jade',
    lastName: 'Sellers',
    email: 'mi.pede.nonummy@senectus.org',
    phoneNo: '0800 360062',
    street: 'P.O. Box 511, 3099 In Rd.',
    city: 'Cochrane',
    postcode: 'K8I 3RB',
    country: 'Tonga',
    personalID: '16870328 2056',
  },
  {
    firstName: 'Wyoming',
    lastName: 'Fox',
    email: 'Nulla.tempor.augue@aliquamiaculis.org',
    phoneNo: '0800 377 7753',
    street: '7354 Ac Ave',
    city: 'East Kilbride',
    postcode: '233010',
    country: 'Rwanda',
    personalID: '16070816 5048',
  },
  {
    firstName: 'Christine',
    lastName: 'Holcomb',
    email: 'neque.sed.dictum@ultricesVivamus.ca',
    phoneNo: '07578 190673',
    street: 'Ap #121-4421 Iaculis Av.',
    city: 'Etroubles',
    postcode: '6742',
    country: 'Bahamas',
    personalID: '16401211 0773',
  },
  {
    firstName: 'Jameson',
    lastName: 'Sutton',
    email: 'sem.semper@liberoProin.com',
    phoneNo: '07489 442639',
    street: 'Ap #700-1481 Porttitor Ave',
    city: 'Nice',
    postcode: '14655',
    country: 'Nauru',
    personalID: '16301129 4323',
  },
  {
    firstName: 'Driscoll',
    lastName: 'Jenkins',
    email: 'libero.dui@estacfacilisis.edu',
    phoneNo: '0843 298 8205',
    street: 'Ap #775-8090 Sed Avenue',
    city: 'Natales',
    postcode: '622109',
    country: 'Tajikistan',
    personalID: '16430908 1950',
  },
  {
    firstName: 'Morgan',
    lastName: 'Hutchinson',
    email: 'mauris.eu@ipsum.ca',
    phoneNo: '070 6292 4498',
    street: '3135 Curabitur Rd.',
    city: 'Darmstadt',
    postcode: '010900',
    country: 'Colombia',
    personalID: '16890811 2991',
  },
  {
    firstName: 'Kylee',
    lastName: 'Riddle',
    email: 'libero.Proin@malesuadafamesac.com',
    phoneNo: '(017177) 84788',
    street: '7336 Ipsum St.',
    city: 'Semarang',
    postcode: '9828',
    country: 'Papua New Guinea',
    personalID: '16260701 0093',
  },
  {
    firstName: 'Cathleen',
    lastName: 'Dale',
    email: 'risus.Donec@augue.edu',
    phoneNo: '(0115) 224 4142',
    street: 'Ap #568-2948 Fringilla Rd.',
    city: 'Brandenburg',
    postcode: 'CH2L 4EH',
    country: 'Guinea-Bissau',
    personalID: '16161203 4817',
  },
  {
    firstName: 'Sierra',
    lastName: 'Robbins',
    email: 'dictum.eleifend.nunc@tellus.net',
    phoneNo: '(01266) 957950',
    street: '481-6201 Mattis. Rd.',
    city: 'Upper Hutt',
    postcode: '23945',
    country: 'Isle of Man',
    personalID: '16691217 6010',
  },
  {
    firstName: 'Levi',
    lastName: 'Simpson',
    email: 'Nulla.tempor.augue@nibhdolor.ca',
    phoneNo: '0855 608 0347',
    street: '555-4187 Integer Av.',
    city: 'Curacaví',
    postcode: '439311',
    country: 'Tuvalu',
    personalID: '16000330 9499',
  },
  {
    firstName: 'Kyle',
    lastName: 'Mendez',
    email: 'lacinia@senectus.org',
    phoneNo: '0845 46 40',
    street: '814-4647 Nec, St.',
    city: 'Akron',
    postcode: '199413',
    country: 'Qatar',
    personalID: '16471029 5397',
  },
  {
    firstName: 'Emery',
    lastName: 'Hurley',
    email: 'Nulla.facilisis@nonummyultriciesornare.co.uk',
    phoneNo: '(01553) 502913',
    street: '4540 Luctus Ave',
    city: 'Meux',
    postcode: '36612',
    country: 'Belize',
    personalID: '16440228 3842',
  },
  {
    firstName: 'Nadine',
    lastName: 'Buchanan',
    email: 'Duis@Sed.ca',
    phoneNo: '055 2785 0228',
    street: '694 Mi, Av.',
    city: 'Middelburg',
    postcode: '62232-88887',
    country: 'Uruguay',
    personalID: '16721129 5857',
  },
  {
    firstName: 'Dalton',
    lastName: 'Nieves',
    email: 'nibh.dolor.nonummy@laoreetlibero.org',
    phoneNo: '0395 486 9374',
    street: '797-8170 Enim, Street',
    city: 'Burhanpur',
    postcode: '29633-93750',
    country: 'Cayman Islands',
    personalID: '16600205 0067',
  },
  {
    firstName: 'Zeph',
    lastName: 'Ruiz',
    email: 'non.dui@felisorci.com',
    phoneNo: '0845 46 41',
    street: 'Ap #282-8369 Malesuada Ave',
    city: 'Cavallino',
    postcode: 'EW2V 1ZE',
    country: 'Niger',
    personalID: '16580706 9124',
  },
  {
    firstName: 'Shannon',
    lastName: 'Decker',
    email: 'leo@lobortis.co.uk',
    phoneNo: '0800 135593',
    street: 'P.O. Box 587, 6871 Eleifend. Ave',
    city: 'Rocca San Felice',
    postcode: '42271-38735',
    country: 'Somalia',
    personalID: '16090810 4763',
  },
  {
    firstName: 'Erich',
    lastName: 'Daniels',
    email: 'cursus.non.egestas@aliquet.org',
    phoneNo: '0845 46 44',
    street: '689-4565 Velit. Avenue',
    city: 'Edmundston',
    postcode: 'JR32 7QA',
    country: 'Sao Tome and Principe',
    personalID: '16720401 5049',
  },
  {
    firstName: 'Rhiannon',
    lastName: 'Malone',
    email: 'arcu.Morbi.sit@cursus.edu',
    phoneNo: '0361 311 4051',
    street: 'Ap #971-1781 Vehicula Road',
    city: 'Wood Buffalo',
    postcode: '71682',
    country: 'Croatia',
    personalID: '16931028 3388',
  },
  {
    firstName: 'Elijah',
    lastName: 'Sosa',
    email: 'ipsum.Donec.sollicitudin@leo.co.uk',
    phoneNo: '0800 365 8250',
    street: 'P.O. Box 169, 2562 Commodo Ave',
    city: 'Montoggio',
    postcode: '42092',
    country: 'San Marino',
    personalID: '16251107 2403',
  },
  {
    firstName: 'Grady',
    lastName: 'Crosby',
    email: 'mollis.nec.cursus@malesuadamalesuadaInteger.edu',
    phoneNo: '070 2824 3427',
    street: '821-5145 Id, Ave',
    city: 'Rosoux-Crenwick',
    postcode: '56176',
    country: 'Cuba',
    personalID: '16520115 9133',
  },
  {
    firstName: 'Quentin',
    lastName: 'Armstrong',
    email: 'erat.vel@auctor.net',
    phoneNo: '(029) 5052 0365',
    street: '157-253 Hendrerit Av.',
    city: 'Aubervilliers',
    postcode: '2151',
    country: 'Mayotte',
    personalID: '16730607 0553',
  },
  {
    firstName: 'Samuel',
    lastName: 'Harrell',
    email: 'tellus@magnaSed.edu',
    phoneNo: '07064 102166',
    street: 'P.O. Box 713, 4115 Ut Rd.',
    city: 'Kingston',
    postcode: '23315',
    country: 'Lebanon',
    personalID: '16361016 5551',
  },
  {
    firstName: 'Merritt',
    lastName: 'Holland',
    email: 'interdum.Nunc.sollicitudin@elitpellentesque.edu',
    phoneNo: '0800 825458',
    street: 'P.O. Box 261, 3590 Nascetur Road',
    city: 'Drancy',
    postcode: '760017',
    country: 'French Southern Territories',
    personalID: '16040311 2121',
  },
  {
    firstName: 'Harlan',
    lastName: 'Brennan',
    email: 'nascetur.ridiculus@feugiatmetussit.net',
    phoneNo: '(012812) 59410',
    street: '8210 Torquent Av.',
    city: 'Grantham',
    postcode: '01537',
    country: 'Saint Pierre and Miquelon',
    personalID: '16431216 0239',
  },
  {
    firstName: 'Stuart',
    lastName: 'Deleon',
    email: 'sed.pede.nec@maurisMorbinon.com',
    phoneNo: '0807 013 3815',
    street: 'P.O. Box 143, 4909 At Street',
    city: 'Terrance',
    postcode: '27218',
    country: 'Jersey',
    personalID: '16330207 5852',
  },
  {
    firstName: 'Clarke',
    lastName: 'Middleton',
    email: 'in@estacfacilisis.org',
    phoneNo: '(028) 5013 9648',
    street: '9856 Eget, Avenue',
    city: 'Solihull',
    postcode: '72893',
    country: 'Seychelles',
    personalID: '16340804 3325',
  },
  {
    firstName: 'Roanna',
    lastName: 'Gentry',
    email: 'dui@nascetur.net',
    phoneNo: '(024) 3023 2962',
    street: '3566 Ornare. Rd.',
    city: 'Freiberg',
    postcode: '3899',
    country: 'Lesotho',
    personalID: '16680618 3791',
  },
  {
    firstName: 'Delilah',
    lastName: 'Bird',
    email: 'laoreet.lectus.quis@utaliquam.edu',
    phoneNo: '07160 224163',
    street: 'P.O. Box 332, 8565 Molestie Avenue',
    city: 'Washuk',
    postcode: '607065',
    country: 'Indonesia',
    personalID: '16891112 9461',
  },
  {
    firstName: 'Georgia',
    lastName: 'Cash',
    email: 'dui@enimnisl.net',
    phoneNo: '(0113) 542 3955',
    street: '900-3252 Fusce Avenue',
    city: 'Sint-Michiels',
    postcode: 'Z8203',
    country: 'Niue',
    personalID: '16340718 4716',
  },
  {
    firstName: 'Aiko',
    lastName: 'Mclean',
    email: 'cubilia.Curae.Phasellus@augueid.com',
    phoneNo: '055 9506 2116',
    street: 'P.O. Box 786, 1756 Fringilla St.',
    city: 'Malonne',
    postcode: 'Y8E 7M2',
    country: 'Belize',
    personalID: '16680622 4207',
  },
  {
    firstName: 'Winter',
    lastName: 'Jacobs',
    email: 'aliquet@Duisac.ca',
    phoneNo: '0800 693847',
    street: '774-9011 Arcu Road',
    city: 'Bilbo',
    postcode: '05558',
    country: 'Equatorial Guinea',
    personalID: '16611201 4144',
  },
  {
    firstName: 'Jolene',
    lastName: 'Rios',
    email: 'odio.Aliquam.vulputate@ac.ca',
    phoneNo: '(023) 4876 2215',
    street: 'Ap #325-8225 Amet Road',
    city: 'Limena',
    postcode: 'K56 0YJ',
    country: 'Morocco',
    personalID: '16170215 3485',
  },
  {
    firstName: 'Kaden',
    lastName: 'Morrow',
    email: 'rutrum@eleifendnec.ca',
    phoneNo: '07305 685548',
    street: '8870 Aliquam Road',
    city: 'Sète',
    postcode: '04908',
    country: 'Peru',
    personalID: '16820820 6675',
  },
  {
    firstName: 'Kaseem',
    lastName: 'Norris',
    email: 'mauris.erat.eget@nequeMorbi.com',
    phoneNo: '07275 403152',
    street: 'P.O. Box 776, 7115 Integer Avenue',
    city: 'Jönköping',
    postcode: '42236-83471',
    country: 'Sudan',
    personalID: '16440829 7895',
  },
  {
    firstName: 'Vladimir',
    lastName: 'Mcguire',
    email: 'id@nonarcuVivamus.edu',
    phoneNo: '0500 950469',
    street: '2067 Est Ave',
    city: 'Ziano di Fiemme',
    postcode: '774056',
    country: 'Mexico',
    personalID: '16771016 3796',
  },
  {
    firstName: 'Jocelyn',
    lastName: 'Schroeder',
    email: 'dolor@nec.ca',
    phoneNo: '07302 403156',
    street: 'Ap #155-3999 Vivamus St.',
    city: 'Malloa',
    postcode: '4059',
    country: 'Canada',
    personalID: '16530314 9388',
  },
  {
    firstName: 'Howard',
    lastName: 'Villarreal',
    email: 'Donec.felis@insodales.com',
    phoneNo: '07624 830239',
    street: '540-7057 Cras Rd.',
    city: 'Siverek',
    postcode: '8701',
    country: 'Seychelles',
    personalID: '16640823 8530',
  },
  {
    firstName: 'Adam',
    lastName: 'Miranda',
    email: 'amet.dapibus@faucibus.edu',
    phoneNo: '0845 46 49',
    street: 'Ap #931-6286 Diam. Avenue',
    city: 'Warburg',
    postcode: '01972',
    country: 'Jordan',
    personalID: '16370414 7911',
  },
  {
    firstName: 'Aiko',
    lastName: 'Elliott',
    email: 'sodales@mauris.edu',
    phoneNo: '0800 1111',
    street: 'P.O. Box 583, 6119 Ut St.',
    city: 'Villavicencio',
    postcode: '4864 XQ',
    country: 'Faroe Islands',
    personalID: '16940907 6115',
  },
].map((person) => ({
  ...person,
  sales: getSales(Math.random()),
  profit: getProfit(Math.random()),
  redOrGreen: getRating(),
  date: new Date(Math.floor(Math.random() * -10000000000)).toDateString(),
}));

const createClassNameMutationObserver = (
  element: HTMLElement,
  callback: (className: string) => void,
): MutationObserver => {
  const observer = new MutationObserver(() => {
    callback(element.className);
  });
  observer.observe(element, {
    attributes: true,
    attributeFilter: ['class'],
    childList: false,
    characterData: false,
  });
  return observer;
};

const useClassNameMutationObserver = (
  element: HTMLElement,
  callback: () => void,
): void => {
  useEffect(() => {
    const observer = createClassNameMutationObserver(element, callback);

    // Cleanup listener
    return (): void => {
      observer.disconnect();
    };
  });
};

const RedOrGreenFormatter = (params: ValueFormatterParams) => {
  const dotStyle = styles[`dot--${params.value}`];
  return <span className={`${styles.dot} ${dotStyle}`} />;
};

const CommaFormatter = (params: ValueFormatterParams): string => {
  return params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const CurrencyFormatter = (params: ValueFormatterParams): string => {
  if (params.value === '0.00') {
    return formatter2dp.format(params.value);
  }
  return formatterCurrency.format(params.value);
};

export const AgGridCompact = (args: AgGridReactProps) => {
  const [rowData, setRowData] = useState(BIG_DATA);
  const api = useRef<GridApi>();

  // pick one row at random to show data updating in the grid
  useEffect(() => {
    const updateTick = setInterval(() => {
      const randomNo = Math.random();
      const index = Math.floor(Math.random() * rowData.length);
      const itemToUpdate = rowData[index];
      if (randomNo < 0.5) {
        itemToUpdate.sales = getSales(Math.random());
      } else if (randomNo > 0.9) {
        itemToUpdate.profit = getProfit(0);
      } else {
        itemToUpdate.profit = getProfit(Math.random());
      }
      setRowData(rowData);
      api.current?.refreshCells();
    }, 500);

    return () => {
      clearInterval(updateTick);
    };
  }, [rowData]);

  const onGridReady = useCallback((event: GridReadyEvent): void => {
    api.current = event.api;
    api.current.resetRowHeights();
  }, []);

  useClassNameMutationObserver(document.documentElement, () => {
    if (api.current) {
      api.current.resetRowHeights();
    }
  });

  return (
    <IressAgGridContainer
      alignMiddle
      compact
      style={{ height: '100vh', width: '100%' }}
    >
      <AgGridReact
        {...args}
        onGridReady={onGridReady}
        rowDragManaged
        animateRows
        enableRangeSelection={true}
        enableCharts={true}
        sideBar={true}
        rowData={rowData}
        rowSelection="multiple"
        rowMultiSelectWithClick
        components={{
          redGreenDots: RedOrGreenFormatter,
        }}
        defaultColDef={{
          enableCellChangeFlash: true,
          resizable: true,
          sortable: true,
          unSortIcon: true,
          filter: true,
          floatingFilter: true,
          enablePivot: false,
          filterParams: {
            buttons: ['reset', 'apply'],
          },
          autoHeight: true,
          wrapText: true,
        }}
        icons={AG_THEME_IRESS_ICONS}
        columnDefs={[
          {
            headerName: 'Employee',
            children: [
              {
                field: 'firstName',
                editable: true,
                filter: 'agTextColumnFilter',
                headerTooltip: 'First name',
                rowDrag: true,
                lockVisible: true,
                tooltipField: 'firstName',
              },
              {
                field: 'lastName',
                editable: true,
                filter: 'agTextColumnFilter',
                headerTooltip: 'Surname',
                lockVisible: true,
                cellClass: 'iress-cell--divider',
                headerClass: 'iress-cell--divider',
                columnGroupShow: 'open',
              },
              {
                field: 'personalID',
                filter: 'agTextColumnFilter',
                headerTooltip: 'Personal ID',
                columnGroupShow: 'open',
              },
              {
                field: 'date',
                filter: 'agDateColumnFilter',
                headerTooltip: 'Date',
                columnGroupShow: 'open',
              },
            ],
          },
          {
            headerName: 'Sales performance',
            children: [
              {
                field: 'redOrGreen',
                headerName: 'Rating',
                cellRenderer: 'redGreenDots',
                filter: false,
              },
              {
                field: 'sales',
                filter: 'agNumberColumnFilter',
                valueFormatter: CommaFormatter,
              },
              {
                field: 'profit',
                valueFormatter: CurrencyFormatter,
                cellClassRules: {
                  'iress--positive': (params) => parseInt(params.value, 10) > 0,
                  'iress--negative': (params) => parseInt(params.value, 10) < 0,
                  'iress--zero': (params) => params.value === '0.00',
                },
              },
            ],
          },
          {
            headerName: 'Contact details',
            children: [
              {
                field: 'email',
                width: 350,
                filter: 'agTextColumnFilter',
                headerTooltip: 'Email address',
                cellClass: 'iress-cell--ellipsis',
              },
              {
                field: 'phoneNo',
                enableValue: true,
                filter: 'agTextColumnFilter',
                headerTooltip: 'Phone number',
              },
            ],
          },
          {
            headerName: 'Address',
            children: [
              {
                field: 'street',
                width: 350,
                filter: 'agTextColumnFilter',
                cellClass: 'iress-cell--ellipsis',
                columnGroupShow: 'open',
              },
              {
                field: 'city',
                filter: 'agTextColumnFilter',
                columnGroupShow: 'open',
              },
              {
                field: 'postcode',
                filter: 'agTextColumnFilter',
                columnGroupShow: 'open',
              },
              { field: 'country', filter: 'agTextColumnFilter' },
            ],
          },
        ]}
      />
    </IressAgGridContainer>
  );
};

export default AgGridCompact;
