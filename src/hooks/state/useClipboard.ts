import {useState} from "react";

type CopiedValue = string;
type CopyFn = (text: string) => Promise<boolean>;

function useClipboard(): {
    copiedText: CopiedValue;
    handleCopyClipboard: CopyFn;
} {
    const [copiedText, setCopiedText] = useState<CopiedValue>("");
    const handleCopyClipboard: CopyFn = async (text: string) => {
        if (!navigator?.clipboard) {
            return false;
        }

        try {
            await navigator.clipboard.writeText(text);
            setCopiedText(text);
            return true;
        } catch (error: unknown) {
            setCopiedText("");
            return false;
        }
    }
    return {
        copiedText,
        handleCopyClipboard
    }
}

export default useClipboard;