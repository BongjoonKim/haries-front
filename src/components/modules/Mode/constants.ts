export const actionType = {
    INITIALIZE : "portal/mode/INITIALIZE" as const,
    ACTIVE_SEQUENCE_MODE : "portal/mode/MODE_ACTIVE_SEQUENCE_MODE" as const,
    ADD_ACTIVE_SEQUENCE_MODE : "portal/mode/ADD_ACTIVE_SEQUENCE_MODE" as const,
    REMOVE_ACTION_SEQUENCE_MODE : "portal/mode/REMOVE_ACTIVE_SEQUENCE_MODE" as const,
    ADD_TASK_ITEM_MODE : "portal/mode/ADD_TASK_ITEM_MODE" as const,
    REMOVE_TASK_ITEM_MODE : "portal/mode/REMOVE_TASK_ITEM_MODE" as const,
}

export const dependentOptionsPath = "options.dependent";