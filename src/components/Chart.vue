<script>
import { Line, mixins } from 'vue-chartjs'

export default {
  extends: Line,
  mixins: [mixins.reactiveData],
  props: ['data'],
  data () {
    return {
      localData: this.data
    }
  },
  computed: {
    labels () {
      return this.filteredData.map(d => d.interval)
    },
    dataset () {
      return this.filteredData.map(d => d.jokeScore)
    },
    filteredData () {
      return this.localData.filter((d, i) => i % 1 === 0)
    }
  },
  mounted () {
    this.renderChart({
      labels: this.labels,
      datasets: [
        {
          borderColor: this.$vuetify.theme.themes.dark.primary,
          borderWidth: 1,
          label: 'Joke Score',
          data: this.dataset,
          fill: false,
          pointBackgroundColor: this.$vuetify.theme.themes.dark.accent,
          pointBorderColor: this.$vuetify.theme.themes.dark.secondary,
          pointBorderWidth: 0,
          pointRadius: 0,
          pointHoverBorderWidth: 3,
          pointHoverRadius: 5
        }
      ]
    }, {
      responsive: true,
      title: {
        display: true,
        text: 'Joke Score Over Time'
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Time in minutes'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Score'
          }
        }]
      }
    })
  }
}
</script>
