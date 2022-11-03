import {useState, useCallback} from "react";

function useToggle(
    initialValue = false,
) : [boolean, () => void, (value?: boolean) => void] {
    const [toggle, setToggle] = useState<boolean>(initialValue);

    const onToggle: () => void = useCallback(() => setToggle(prevState => !prevState), []);

    const onChangeToggle = (value?:  boolean) => {
        setToggle(!!value);
    };

    return [toggle, onToggle, onChangeToggle];
}

export default useToggle;