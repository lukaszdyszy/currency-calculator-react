import React from 'react';
import './CoursesTable.scss';

const CurrencyList = (props) => {
    return(
        <div className="list-container">
            <table className="secondary">
                <thead>
                    <tr>
                        <th colSpan="2">Wybierz waluty</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.list.map((currency, index) => {
                            return(
                                <tr>
                                    <td>
                                        <input type="checkbox" id={index} defaultChecked={currency.checked} onClick={
                                            e => {
                                                let updatedList = [...props.list];
                                                updatedList[index].checked = e.target.checked;
                                                props.updateList(updatedList);
                                            }
                                        }/>
                                    </td>
                                    <td>
                                        <label htmlFor={index}>{currency.name}</label>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default CurrencyList;