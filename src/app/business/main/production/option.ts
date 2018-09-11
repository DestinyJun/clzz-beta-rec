export const options = {
  tooltip : {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }}},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '-3px',
    containLabel: true
  },
  xAxis : [{
    type: 'category',
    height: '100%',
    boundaryGap: false,
    data: ['', '', '', '', '', '', ''],
    axisLabel: {
      textStyle: {
        color: '#fff'
      }
    },
    axisLine: {
      lineStyle: {
        color: '#fff'
      }
    }
  }],
  yAxis: [{
    type: 'value',
    axisLabel: {
      textStyle: {
        color: '#fff'
      }
    },
    axisLine: {
      lineStyle: {
        color: '#fff'
      }
    }
  }],
  series: [{
    name: '油漆厚度',
    type: 'line',
    stack: '总量',
    areaStyle: {normal: {}},
    data: [120, 132, 101, 134, 90, 230, 210]
  },
    {
      name: '背漆厚度',
      type: 'line',
      stack: '总量',
      areaStyle: {normal: {}},
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: '底漆厚度',
      type: 'line',
      stack: '总量',
      areaStyle: {normal: {}},
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: '铝板厚度',
      type: 'line',
      stack: '总量',
      label: {
        normal: {
          show: true,
          position: 'top'
        }
      },
      areaStyle: {normal: {}},
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
};
