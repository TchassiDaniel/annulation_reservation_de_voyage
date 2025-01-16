'use client';

import { useEffect, useState } from 'react';
import NetworkErrorPage from './NetworkErrorPage';
import ServerErrorPage from './ServerErrorPage';
import NoTripsPage from './NoTripsPage';
import PropTypes from "prop-types";

export default function ErrorHandler({ error, data, isSearch }) {

    ErrorHandler.propTypes = {
        error: PropTypes.object,
        data: PropTypes.object,
        isSearch: PropTypes.bool,
    }
    const [errorType, setErrorType] = useState(null);

    useEffect(() => {
        if (!navigator.onLine) {
            setErrorType('network');
        } else if (error?.status === 500 || error?.status === 403) {
            setErrorType('server');
        } else if (data?.length === 0) {
            console.log(data);
            setErrorType('noTrips');
        }
    }, [error, data]);

    if (errorType === 'network') return <NetworkErrorPage />;
    if (errorType === 'server') return <ServerErrorPage errorStatus = {error?.status}/>;
    if (errorType === 'noTrips') return <NoTripsPage isSearch={isSearch}/>;

    return null;
}

