import React, {useState, useEffect} from 'react';
import './makeChart.scss';
import axios from 'axios';
import { API, defaultHeaders } from 'API.js';
import { Line } from 'react-chartjs-2';
import Loader from 'components/loader/loader.js';

const MakeChart = (props) => {
    const parseDate = (dateTime) => {
        let y = dateTime.getFullYear();
        let m = dateTime.getMonth()+1;
        let d = dateTime.getDate();

        if(m < 10){m = '0'+m;}
        if(d < 10){d = '0'+d;}

        return `${y}-${m}-${d}`;
    } 

    let today = new Date();
    let today2 = new Date();
    today2.setDate(today.getDate() - 7);

    const [loading, isLoading] = useState(false);

    const [dates, updateDates] = useState([parseDate(today2), parseDate(today)]);
    const [dataSets, updateData] = useState({});
    const [options, setOptions] = useState({
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: "white"
                }
            }],
            xAxes: [{
                ticks: {
                    fontColor: "white"
                }
            }]
        }
    });

    const randomColor = () => {
        let rgb = [0,0,0];
        for(let i=0; i<=2; i++){
            rgb[i] = Math.floor(Math.random()*256);
        }
        return rgb;
    }

    function getSingleData(currency){
        return axios.get(`${API}exchangerates/rates/A/${currency}/${dates[0]}/${dates[1]}/?format=json`, {
            method: 'HEAD',
            mode: 'no-cors',
            headers: defaultHeaders
        }).then(response => {
            // let color = randomColor();
            // newData.datasets.push({
            //     label: currency, 
            //     data: response.data.rates.map(rate => rate.mid),
            //     borderColor: [`rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`]
            // });
            // i++;

            // return{
            //     label: currency, 
            //     data: response.data.rates.map(rate => rate.mid),
            //     borderColor: [`rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`],
            //     labels: response.data.rates.map(rate => rate.effectiveDate)
            // }
            // console.log(response);
            return response.data;
            
            // isLoading(false);
        }).catch(err => {
            // getData(currency);
            return err;
        });
    }

    function getData(){
        isLoading(true);
        updateData({});
        let newData = {labels: [], datasets: []};
        let i = 0;
        props.currencies.map(async currency => {
            let color = randomColor();
            let error = true;
            while(error){
                await getSingleData(currency).then(singleData => {
                    if(singleData.rates !== undefined){
                        newData.datasets.push({
                            label: currency, 
                            data: singleData.rates.map(rate => rate.mid),
                            borderColor: [`rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`]
                        });
                        i++;
                        if(i == props.currencies.length){
                            newData.labels = singleData.rates.map(rate => rate.effectiveDate);
                            updateData(newData);
                            isLoading(false);
                        }
                        error = false;
                    }
                });
            }
        });
    }

    useEffect(() => {
        let newColor = window.getComputedStyle(document.querySelector('.App'), null).getPropertyValue('color');
        setOptions({
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: newColor
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: newColor
                    }
                }]
            }
        })
    }, [props.currentTheme]);

    const renderLoader = () => {
        if(loading){
            return(
                <div style={{textAlign: "center"}}>
                    <Loader />
                </div>
            )
        }
    }

    return(
        <div className="make-chart-container">
            <form className="graph-form" onSubmit={e => {e.preventDefault(); getData();}}>
                <div className="date-range">
                    <div className="date-from">
                        <label htmlFor="from">Od: </label>
                        <br/>
                        <input type="date" id="from" defaultValue={dates[0]} onChange={e => {updateDates([e.target.value, dates[1]])}}/>
                    </div>
                    <div className="date-to">
                        <label htmlFor="to">Do: </label>
                        <br/>
                        <input type="date" id="to" defaultValue={dates[1]} onChange={e => {updateDates([dates[0], e.target.value])}}/>
                    </div>
                </div>
                <div className="show-result">
                    <input type="submit" value="Pokaż"/>
                </div>
            </form>
            {renderLoader()}
            <div className="chart-container">
                <Line options={options} data={dataSets} />
            </div>
        </div>
    )
}


export default MakeChart;