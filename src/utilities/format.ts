const Currency_formatter = new Intl.NumberFormat(undefined, {
    currency: 'USD',
    style: 'currency',
})
export const format = (number : number) => {
    return Currency_formatter.format(number);
}