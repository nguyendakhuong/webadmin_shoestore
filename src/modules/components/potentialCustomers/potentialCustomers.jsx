import React, { useEffect, useState } from 'react';
import './potentialCustomers.scss';
import { useTranslation } from 'react-i18next';


const PotentialCustomers = () => {
    const [data, setData] = useState(null);
    const [t, i18n] = useTranslation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseOrder = await fetch(`http://localhost:3001/potentialCustomers`, {
                    method: "GET",
                });
                const orderData = await responseOrder.json();
                if (orderData.status === 200) {
                    setData(orderData.data);
                }
            } catch (e) {
                console.log(e);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="potential-customers-container">
            <h2 className="heading">{t('potentialCustomers')}</h2>
            <div className="customer-list">
                {data ? (
                    data.map((customer, index) => (
                        <div key={customer.customerId} className={`customer-item item-${index + 1}`}>

                            <div className="customer-details">
                                <div className="customer-name">{customer.name}</div>
                                <div className="customer-email">{customer.email}</div>
                            </div>
                        </div>
                    ))) : <div className="loading-message">{t('loading')} ...</div>}
            </div>
        </div>
    );
};

export default PotentialCustomers;
