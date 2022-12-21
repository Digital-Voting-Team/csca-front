<template>
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>
  
<script>
import { ref } from "vue";
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'BarChart',
    props: ['dict'],
    components: { Bar },
    setup(props) {
        const chartData = ref('')
        const chartOptions = ref('')
        const dict = props.dict

        chartData.value = {
            labels: Object.keys(dict),
            datasets: [{
                label: "Number of orders per staff member",
                data: Object.values(dict),
                backgroundColor: '#444',
            },
            ]
        }

        chartOptions.value = {
            responsive: true
        }
        return { chartData, chartOptions }
    }
}
</script>
