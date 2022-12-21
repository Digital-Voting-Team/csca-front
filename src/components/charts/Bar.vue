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
    components: { Bar },
    setup() {
        const chartData = ref('')
        const chartOptions = ref('')

        chartData.value = {
            labels: ['January', 'February', 'March'],
            datasets: [{
                label: "First",
                data: [40, 20, 12],
                backgroundColor: '#444',
            },
            {
                label: "Second",
                data: [4, 22, 32],
                backgroundColor: '#ccc'
            }],
        }

        chartOptions.value = {
            responsive: true
        }
        return { chartData, chartOptions }
    }
}
</script>