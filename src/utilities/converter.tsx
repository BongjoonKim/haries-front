function classNames (items : (string | undefined | boolean)[]) : string {
    return items.filter(x => x).join(" ");
}

export default {
    classNames
}