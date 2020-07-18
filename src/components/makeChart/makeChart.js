import React, {useState, useEffect} from 'react';
import './makeChart.scss';
import axios from 'axios';
import API from 'API.js';
import { Line } from 'react-chartjs-2';

const MakeChart = (props) => {
    const [dates, updateDates] = useState(['2020-07-10', '2020-07-17']);
    const [dataSets, updateData] = useState({});

    const randomColor = () => {
        let rgb = [0,0,0];
        for(let i=0; i<=2; i++){
            rgb[i] = Math.floor(Math.random()*256);
        }
        return rgb;
    }

    function getData(){
        updateData({});
        let newData = {labels: [], datasets: []};
        let i = 0;
        props.currencies.map(currency => {
            axios.get(`${API}exchangerates/rates/A/${currency}/${dates[0]}/${dates[1]}/?format=json`, {
                method: 'HEAD',
                mode: 'no-cors'
            }).then(response => {
                let color = randomColor();
                newData.datasets.push({
                    label: currency, 
                    data: response.data.rates.map(rate => rate.mid),
                    borderColor: [`rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`]
                });
                i++;
                if(i == props.currencies.length){
                    newData.labels = response.data.rates.map(rate => rate.effectiveDate);
                    updateData(newData);
                }
            }).catch(err => {alert(err)});
        });
    }

    return(
        <div className="make-chart-container">
            <form onSubmit={e => {e.preventDefault(); getData();}}>
                <label htmlFor="from">Od: </label>
                <input type="date" id="from" defaultValue={dates[0]} onChange={e => {updateDates([e.target.value, dates[1]])}}/>
                <label htmlFor="to">Do: </label>
                <input type="date" id="to" defaultValue={dates[1]} onChange={e => {updateDates([dates[0], e.target.value])}}/>
                <input type="submit" value="Pokaż"/>
            </form>
            <div className="chart-container">
                <Line data={dataSets}/>
            </div>
        </div>
    )
}


export default MakeChart;