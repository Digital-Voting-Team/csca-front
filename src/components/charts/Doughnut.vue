<template>
    <Doughnut :data="data" :options="options" />
</template>
  
<script>
import { ref } from "vue";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
    name: 'App',
    components: {
        Doughnut
    },

    setup() {
        const data = ref(null)
        const options = ref(null)

        data.value = {
            labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
            datasets: [
                {
                    backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                    data: [40, 20, 80, 10]
                }
            ]
        }

        options.value = {
            responsive: true,
            maintainAspectRatio: false
        }

        return { data, options }
    }
}
</script>
  