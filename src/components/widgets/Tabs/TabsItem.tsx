import {TabsComponent} from "./types";

export default function TabsItem({id, label, name, children, img}: TabsComponent.Item) {
    return (
        <>
            {children}
        </>
    )

}