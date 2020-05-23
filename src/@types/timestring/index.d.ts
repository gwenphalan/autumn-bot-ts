declare module 'timestring' {
    /**
     * Options to use when parsing a timestring;
     *
     * @type {Options}
     */
    interface Options {
        hoursPerDay?: number;
        daysPerWeek?: number;
        weeksPerMonth?: number;
        monthsPerYear?: number;
        daysPerYear?: number;
    }

    type Unit = 'ms' | 's' | 'm' | 'h' | 'd' | 'w' | 'mth' | 'y';

    /**
     * Parse a timestring
     *
     * @param   {string} string Timestring
     * @param   {string} returnUnit Default: seconds
     * @param   {Options} opts
     * @returns {number} Time in seconds
     */
    export default function parseTimestring(string: string, returnUnit?: Unit, opts?: Options): number;
}
