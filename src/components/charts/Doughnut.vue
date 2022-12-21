<template>
  <Doughnut :data="data" :options="options"/>
</template>

<script>
import {ref} from "vue";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'
import {Doughnut} from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'DoughnutChart',
  components: {
    Doughnut
  },
  props: ["dict"],
  setup(props) {
    const data = ref(null)
    const options = ref(null)
    const dict = props.dict
    const keysArray = Object.keys(dict)

    const randColor = () => {
      return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
    }
    let colorArray = [];
    for (let i = 0; i < keysArray.length; i++) {
      colorArray.push(randColor())
    }

    data.value = {
      labels: keysArray,
      datasets: [
        {
          backgroundColor: colorArray,
          data: Object.values(dict)
        }
      ]
    }

    options.value = {
      responsive: true,
      maintainAspectRatio: false
    }

    return {data, options}
  }
}
</script>
