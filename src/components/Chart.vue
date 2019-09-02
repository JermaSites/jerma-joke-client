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
              display: true
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
              beginAtZero: true
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
          intersect: false
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
        this.$data._chart.update()
      }
    }
  },
  mounted () {
    this.chartData.datasets[0].borderColor = this.gradient
    this.renderChart(this.chartData, this.options)
  }
}
</script>
