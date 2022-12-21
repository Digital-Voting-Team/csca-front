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
    name: 'LineChart',
    components: {
        Line
    },
    props: ["dict"],
    setup(props) {
        const dict = props.dict

        let dictKeys = [];
        for(let key in dict) {
            dictKeys[dictKeys.length] = key;
        }
        dictKeys.sort(function(a, b) {
            return a - b;
        });

        let dictValues = [];
        for(let key in dict){
            dictValues[dictValues.length] = dict[key]
        }

        const data = {
            labels: dictKeys,
            datasets: [
                {
                    label: 'Number of deliveries per month',
                    lineBorderColor: '#777',
                    backgroundColor: '#007bff',
                    data: dictValues
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
