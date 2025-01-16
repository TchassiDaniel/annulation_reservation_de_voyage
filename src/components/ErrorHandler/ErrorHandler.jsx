'use client';

import { useEffect, useState } from 'react';
import NetworkErrorPage from './NetworkErrorPage';
import ServerErrorPage from './ServerErrorPage';
import NoTripsPage from './NoTripsPage';
import PropTypes from "prop-types";

export default function ErrorHandler({ error, dataLength, isSearch }) {

    ErrorHandler.propTypes = {
        error: PropTypes.object,
        dataLength: PropTypes.number,
        isSearch: PropTypes.bool,
    }
    const [errorType, setErrorType] = useState('');

    useEffect(() => {
        if (!navigator.onLine) {
            setErrorType('network');
        } else if (error?.status === 500 || error?.status === 403) {
            setErrorType('server');
        } else if (!error && dataLength === 0) {
            console.log(dataLength);
            setErrorType('noTrips');
        }
        else {
        setErrorType(''); // Reset error type if there's no error
        }

    }, [error, dataLength]);

    if (errorType === 'network') return <NetworkErrorPage />;
    if (errorType === 'server') return <ServerErrorPage errorStatus = {error?.status}/>;
    if (errorType === 'noTrips') return <NoTripsPage isSearch={isSearch}/>;

    return null;
}

