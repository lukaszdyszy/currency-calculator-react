import React, {useState, useEffect} from 'react';
import './Charts.scss';
import CurrencyList from 'components/coursesTable/currencyList.js';
import MakeChart from 'components/makeChart/makeChart.js';
import axios from 'axios';
import { API, defaultHeaders } from 'API.js';
import { withRouter } from 'react-router-dom';

const Charts = (props) => {
    const [list, updateList] = useState([]);

    const getList = () => {
        axios.get(`${API}exchangerates/tables/A/?format=json`, {
            method: 'HEAD',
            headers: defaultHeaders
        }).then(response => {
            updateList(response.data[0].rates.map(currency => {
                return {code: currency['code'], name: currency['currency'], checked: false}
            }));
        }).catch(err => {alert(err)});
    }

    useEffect(() => {
        getList();
    }, []);

    return (
        <div className="charts-container">
            <div className="chart">
                <MakeChart currentTheme={props.currentTheme} currencies={(list.filter(currency => currency.checked==true)).map(curr => curr.code)}/>
            </div>
            <div className="list">
                <CurrencyList list={list} updateList={updateList}/>
            </div>
        </div>
    )
}

export default withRouter(Charts);