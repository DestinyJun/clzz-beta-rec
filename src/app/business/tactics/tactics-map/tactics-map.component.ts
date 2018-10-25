import {Component, OnInit} from '@angular/core';
declare let BMap;
@Component({
  selector: 'app-tactics-map',
  templateUrl: './tactics-map.component.html',
  styleUrls: ['./tactics-map.component.css'],
})
export class TacticsMapComponent implements OnInit {
  options = {
    backgroundColor: '#404a59',
    title: {
      text: '销量地图',
      left: 'center',
      textStyle: {
        color: '#fff'
      }
    },
    tooltip: {
      trigger: 'item'
    },
    bmap: {
      center: [106.631929, 26.687097],
      zoom: 8,
      roam: true,
      mapStyle: {
        'styleJson': [
          {
            'featureType': 'land',
            'elementType': 'geometry',
            'stylers': {
              'color': '#212121'
            }
          },
          {
            'featureType': 'building',
            'elementType': 'geometry',
            'stylers': {
              'color': '#2b2b2b'
            }
          },
          {
            'featureType': 'highway',
            'elementType': 'all',
            'stylers': {
              'lightness': -42,
              'saturation': -91
            }
          },
          {
            'featureType': 'arterial',
            'elementType': 'geometry',
            'stylers': {
              'lightness': -77,
              'saturation': -94
            }
          },
          {
            'featureType': 'green',
            'elementType': 'geometry',
            'stylers': {
              'color': '#1b1b1b'
            }
          },
          {
            'featureType': 'water',
            'elementType': 'geometry',
            'stylers': {
              'color': '#181818'
            }
          },
          {
            'featureType': 'subway',
            'elementType': 'geometry.stroke',
            'stylers': {
              'color': '#181818'
            }
          },
          {
            'featureType': 'railway',
            'elementType': 'geometry',
            'stylers': {
              'lightness': -52
            }
          },
          {
            'featureType': 'all',
            'elementType': 'labels.text.stroke',
            'stylers': {
              'color': '#313131'
            }
          },
          {
            'featureType': 'all',
            'elementType': 'labels.text.fill',
            'stylers': {
              'color': '#8b8787'
            }
          },
          {
            'featureType': 'manmade',
            'elementType': 'geometry',
            'stylers': {
              'color': '#1b1b1b'
            }
          },
          {
            'featureType': 'local',
            'elementType': 'geometry',
            'stylers': {
              'lightness': -75,
              'saturation': -91
            }
          },
          {
            'featureType': 'subway',
            'elementType': 'geometry',
            'stylers': {
              'lightness': -65
            }
          },
          {
            'featureType': 'railway',
            'elementType': 'all',
            'stylers': {
              'lightness': -40
            }
          },
          {
            'featureType': 'boundary',
            'elementType': 'geometry',
            'stylers': {
              'color': '#8b8787',
              'weight': '1',
              'lightness': -29
            }
          }
        ]
      }
    },
    series: [
      {
        type: 'effectScatter',
        coordinateSystem: 'bmap',
        data: [],
        symbolSize: 15,
        legendHoverLink: 'true',
        label: {
          normal: {
            formatter: '{b}',
            position: 'right',
            show: false
          },
          emphasis: {
            show: true
          }
        }
      }
    ]
  };
  constructor() {}
  ngOnInit() {
    }
}
