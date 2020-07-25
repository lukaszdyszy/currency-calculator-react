import React, {useState, useEffect} from 'react';
import './Charts.scss';
import CurrencyList from 'components/coursesTable/currencyList.js';
import MakeChart from 'components/makeChart/makeChart.js';
import axios from 'axios';
import { API, defaultHeaders } from 'API.js';
import { withRouter } from 'react-router-dom';
import Loader from 'components/loader/loader.js'

const Charts = (props) => {
    const [list, updateList] = useState([]);
    const [loading, isLoading] = useState(true);

    const getList = () => {
        isLoading(true);
        axios.get(`${API}exchangerates/tables/A/?format=json`, {
            method: 'HEAD',
            mode: 'no-cors',
            headers: defaultHeaders
        }).then(response => {
            updateList(response.data[0].rates.map(currency => {
                return {code: currency['code'], name: currency['currency'], checked: false}
            }));
            isLoading(false);
        }).catch(err => {
            getList()
        });
    }

    useEffect(() => {
        getList();
    }, []);

    const renderList = () => {
        if(!loading){
            return(
                <CurrencyList list={list} updateList={updateList}/>
            )
        } else {
            return(
                <div style={{textAlign: "center"}}>
                    <Loader />
                </div>
            )
        }
    }

    return (
        <div className="charts-container">
            <div className="chart">
                <MakeChart currentTheme={props.currentTheme} currencies={(list.filter(currency => currency.checked==true)).map(curr => curr.code)}/>
            </div>
            <div className="list">
                {renderList()}
            </div>
        </div>
    )
}

export default withRouter(Charts);