import React, {useState, useEffect} from 'react';
import './CoursesTable.scss';

const CoursesTable = (props) => {
    return(
        <div className="courses-container">
            <h2>Kursy na {props.date}</h2>
            <table className="secondary">
                <thead>
                    <tr>
                        <th>Waluta</th>
                        <th>Kurs</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.rates.slice(1).map(rate => {
                            return(
                                <tr>
                                    <td>
                                        {rate['currency']}
                                        <div className="focused"></div>
                                    </td>
                                    <td>
                                        {rate['mid']}
                                        <div className="focused"></div>
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

export default CoursesTable;