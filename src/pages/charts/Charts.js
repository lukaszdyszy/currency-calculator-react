import React, {useState, useEffect} from 'react';
import './Charts.scss';
import CurrencyList from 'components/coursesTable/currencyList.js';
import axios from 'axios';
import API from 'API.js';
import { withRouter } from 'react-router-dom';

const Charts = () => {
    const [list, updateList] = useState([]);

    const getList = () => {
        axios.get(`${API}exchangerates/tables/A/?format=json`, {
            method: 'HEAD',
            mode: 'no-cors'
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
            <CurrencyList list={list} updateList={updateList}/>
        </div>
    )
}

export default withRouter(Charts);