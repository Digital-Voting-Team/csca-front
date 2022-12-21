<template>
    <Line :data="data" :options="options" style="min-height: 500px;" />
</template>
  
<script>
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export default {
    name: 'App',
    components: {
        Line
    },
    setup() {
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Data One',
                    lineBorderColor: '#777',
                    backgroundColor: '#007bff',
                    data: [200, 39, 10, 540, 655, 80, 40]
                },
                {
                    label: 'Data Two',
                    lineBorderColor: 'rgb(8, 141, 68)',
                    backgroundColor: 'rgb(141, 8, 8)',
                    data: [40, 884, 120, 770, 555, 180, 40]
                }
            ]
        }

        const options = {
            responsive: true,
            maintainAspectRatio: false
        }

        return { data, options }
    }


}
</script>
  