import {useState} from "react";

interface Initialize {
    value: Record<string, string> | string | object;
}

interface useTabProps {
    multi?: boolean;
    initialize?: Initialize;
}

function useTab(props?: useTabProps) {
    const [activeTab, setActiveTab] = useState<Initialize["value"]>(props?.initialize || "");
    const [removeTab, setRemoveTab] = useState<Set<string>>(new Set());

    const handleRemoveTab = (status: string) => {
        setRemoveTab(prevState => new Set(prevState).add(status));
    }

    const handleActiveTab = ({tabId, tab} : {tabId?: string; tab: string}) => {
        setActiveTab(
            props?.multi
                ? (prevState: Record<string, string> | object) => ({
                    ...prevState,
                    [tabId || ""]: tab
                })
            : tab
        )
    }

    const getTabProps = (parameter?: {reRender?: boolean}) => ({
        onActiveTab: handleActiveTab,
        reRender: parameter?.reRender
    })

    return {
        activeTab,
        getTabProps,
        removeTab,
        handleRemoveTab
    }
}

export default useTab;

