

import 'moment/locale/it'

const moment = require('moment')

function handleSearchParamsUrl(
    term: number | undefined,
    searchParams: URLSearchParams,
    replace: (url: string) => void,
    pathname: string
) {
    const params = new URLSearchParams(searchParams);
    if (term) {
        params.set("page", term.toString());
    } else {
        params.delete("page");
    }
    replace(`${pathname}?${params.toString()}`);
}

async function getDataByTerm(url: string, term: string | undefined, query: string) {
    const response = await fetch(url + "?" + term + "=" + query);
    const data = await response.json();
    return data;
}
/**
 * Returns an array of timestamps based on the given data and type.
 * @param data - The data array.
 * @param type - The type of timestamps to retrieve ("daily" or "monthly").
 * @returns An array of timestamps.
 */

const formatXAxis = (tickFormat: string, timeIntervalChart: string) => {

    if (timeIntervalChart === "weekly")
        return moment(tickFormat).locale("it_IT").format("dddd");
    if (timeIntervalChart === "monthly")
        return moment(tickFormat).locale("it_IT").format("DD/MM");
    if (timeIntervalChart === "yearly")
        return moment(tickFormat).locale("it_IT").format("MM-YY");
    return moment(tickFormat).locale("it_IT").format("YYYY-MM-DD HH:mm:ss");
};

export {
    handleSearchParamsUrl, getDataByTerm, formatXAxis
}

