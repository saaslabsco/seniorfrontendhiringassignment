import { COLUMNS_KEYS } from './saasLabsDataTable.constant';

export const columnsConfig = [
    {
        key: COLUMNS_KEYS.S_NO,
        title: "S.No.",
        renderer: (value) => value,
        width: "2%",
    },
    {
        key: COLUMNS_KEYS.PERCENTAGE_FUNDED,
        title: "Percentage Funded",
        renderer: (value) => `${value}`,
        width: "5%",
    },
    {
        key: COLUMNS_KEYS.AMOUNT_PLEDGED,
        title: "Amount Pledged",
        renderer: (value) => `${value}`,
        width: "5%",
    },
];