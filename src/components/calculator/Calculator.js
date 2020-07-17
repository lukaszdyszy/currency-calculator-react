import React, {useState, useEffect} from 'react';
import './Calculator.scss';
import reverse from '../../img/reverse.png';

const Calculator = (props) => {
    const [calc, calcSelect] = useState([0, 1]);
    const [inputValue, setInput] = useState(1.00);
    const [calculatedValue, setCalculated] = useState(1.00);

    const currencyList = (which) => {
        if(which == 0){
            return(
                <div className="currency">
                    <select onChange={e => {calcSelect([e.target.value, calc[1]])}} value={calc[0]}>
                        {
                            props.rates.map((rate, id) => {
                                return(
                                    <option className="secondary" value={id}>{rate['currency']}</option>
                                )
                            })
                        }
                    </select>
                    <input type="number" step="0.01" defaultValue={inputValue} onChange={e => {setInput(e.target.value)}}/>
                </div>
            )
        } else {
            return(
                <div className="currency">
                    <input type="number" step="0.01" disabled value={calculatedValue}/>
                    <select onChange={e => {calcSelect([calc[0], e.target.value])}} value={calc[1]}>
                        {
                            props.rates.map((rate, id) => {
                                return(
                                    <option className="secondary" value={id}>{rate['currency']}</option>
                                )
                            })
                        }
                    </select>
                </div>
            )
        }
    }

    const swap = () => {
        calcSelect([calc[1], calc[0]]);
    }

    useEffect(() => {
        setCalculated(((inputValue*props.rates[calc[0]]['mid'])/(props.rates[calc[1]]['mid'])).toFixed(2));
    }, [inputValue, calc]);
    
    return (
        <div className="calculator-container">
            { currencyList(0) }
            <div className="reverse">
                <img src={reverse} onClick={() => {swap()}} style={{zIndex: 0}}/> 
            </div>
            { currencyList(1) }
        </div>
    )
}

export default Calculator;