export const Pluralize = (value: number, suffix: string) => {
    if(value > 1){
        return `${value} ${suffix}s`
    }
    return `${value} ${suffix}`
}


export const FormatDate = (timeStamp: number) => {
    const date = new Date(timeStamp * 1000);

    const diff = (new Date().getTime() - date.getTime());

    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if(hours > 0){
        return Pluralize(hours,'hour');
    }else{
        return Pluralize(minutes,'minute');
    }

}