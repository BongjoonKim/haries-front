interface UIItemVO {
    id ?: string;
    children ?: UIItemVO[];
    parentId?: string;
}

interface DefaultUIItemVO extends UIItemVO {
    componentId ?: string;
    menuAccess ?: string;
    menuResolvedExpression ?: string;
}

interface MenuItemVO extends UIItemVO {
    menuLevel ?: string;
    menuKindName ?: string;
    menuName ?: string;
    menuDescriptions ?: string;
    menuLabel ?: string;
    menuHref ?: string;
    menuImage ?: string;
    menuSort ?: string;
    menuTarget ?: string;
    callingType ?: string;
}

