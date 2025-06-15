const currentYear = new Date().getFullYear();

export const YearList = Array.from(
    {length: currentYear - 1924 + 1},
    (_, i) => (currentYear - i).toString()
).reverse()

export const MonthList = Array.from(
    {length : 12},
    (_, i) => (i + 1).toString()
)

export const DayList = Array.from(
    {length : 31},
    (_, i) => (i + 1).toString()
)