import React, {useState, useEffect} from 'react';
import axios from 'axios';
import API from 'API.js';
import Calculator from '../../components/calculator/Calculator.js';
import CoursesTable from '../../components/coursesTable/CoursesTable.js';

const Home = () => {
    const [rates, updateRates] = useState([]);
    const [date, updateDate] = useState('');
    const [loading, isLoading] = useState(true);

    const getAllRates = () => {
        axios.get(`${API}exchangerates/tables/A/?format=json`, {
            method: 'HEAD',
            mode: 'no-cors'
        }).then(response => {
            updateDate(response.data[0].effectiveDate);
            let list = response.data[0].rates;
            list.unshift({currency: 'polski złoty', code: 'PLN', mid: 1.0000});
            updateRates(response.data[0].rates);
        }).catch(err => {alert(err)});
    }

    useEffect(() => {
        getAllRates();
    }, []);
    useEffect(() => {
        if(rates.length != 0){
            isLoading(false);
        }
    }, [rates]);

    if(!loading){
        return(
            <div className="wrapper">
                <div className="home-container">
                    <Calculator rates={rates}/>
                    <CoursesTable date={date} rates={rates}/>
                </div>
            </div>
        )
    } else {
        return(
            <div className="wrapper">
                <div>loading...</div>
            </div>
        )
    }
}

export default Home;