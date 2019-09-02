<script>
import { Line, mixins } from 'vue-chartjs'

export default {
  extends: Line,
  mixins: [mixins.reactiveProp],
  data () {
    return {
      options: {
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Score',
              fontColor: 'white'
            },
            ticks: {
              fontColor: 'white',
              beginAtZero: false
            },
            gridLines: {
              display: true,
              zeroLineColor: 'white',
              color: 'rgba(255, 255, 255, 0.3)'
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Time in Minutes',
              fontColor: 'white'
            },
            ticks: {
              fontColor: 'white',
              beginAtZero: true,
              autoSkip: true,
              maxTicksLimit: 15
            },
            gridLines: {
              display: false
            }
          }]
        },
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          mode: 'index',
          intersect: false,
          callbacks: {
            title (tooltipItems, data) {
              return `Minute: ${data.labels[tooltipItems[0].index]}`
            }
          }
        }
      }
    }
  },
  computed: {
    gradient () {
      const canvasGradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)

      canvasGradient.addColorStop(0, '#f72047')
      canvasGradient.addColorStop(0.5, '#ffd200')
      canvasGradient.addColorStop(1, '#1feaea')

      return canvasGradient
    }
  },
  watch: {
    chartData: {
      handler () {
        this.$data._chart.config.data.datasets[0].borderColor = this.gradient
        this.$data._chart.config.data.datasets[0].backgroundColor = this.gradient
        this.$data._chart.update()
      }
    }
  },
  mounted () {
    this.chartData.datasets[0].backgroundColor = this.gradient
    this.chartData.datasets[0].borderColor = this.gradient
    this.renderChart(this.chartData, this.options)
  }
}
</script>
