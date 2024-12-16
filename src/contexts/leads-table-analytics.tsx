
"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export const LeadsTableAnalyticsContext = createContext({});

type Analytics = {
    leads: number;
    qualified: number;
    verified: number;
}

export function LeadsTableAnalyticsProvider({ children }: { children: React.ReactNode }) {


    const [analytics, setAnalytics] = useState({
        leads: 0,
        qualified: 0,
        verified: 0
    })

    return (
        <LeadsTableAnalyticsContext.Provider value={{
            analytics, setAnalytics
        }
        }>
            {children}
        </LeadsTableAnalyticsContext.Provider>
    );
};

interface UseLeadsTableAnalyticsContextProps {
    analytics: Analytics
    setAnalytics: React.Dispatch<React.SetStateAction<Analytics>>
}

export const UseLeadsTableAnalytics = () => useContext(LeadsTableAnalyticsContext) as UseLeadsTableAnalyticsContextProps;

