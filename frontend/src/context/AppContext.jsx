import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
    const [showSettings, setShowSettings] = useState(false);
    const [showVoiceHelp, setShowVoiceHelp] = useState(false);
    const [isVoiceActive, setIsVoiceActive] = useState(false);
    const [history, setHistory] = useState([]);

    // Application settings
    const [settings, setSettings] = useState({
        apiKey: localStorage.getItem('videgen_api_key') || '',
        demoMode: false
    });

    const updateSettings = (newSettings) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
        if (newSettings.apiKey) {
            localStorage.setItem('videgen_api_key', newSettings.apiKey);
        }
    };

    const addHistoryItem = (item) => {
        setHistory(prev => [item, ...prev]);
    };

    return (
        <AppContext.Provider value={{
            showSettings, setShowSettings,
            showVoiceHelp, setShowVoiceHelp,
            isVoiceActive, setIsVoiceActive,
            history, addHistoryItem,
            settings, updateSettings
        }}>
            {children}
        </AppContext.Provider>
    );
}

export const useApp = () => useContext(AppContext);
