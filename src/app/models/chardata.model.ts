export class chartdata {
    jan: number;
    feb: number;
    mar: number;
    apr: number;
    may: number;
    jun: number;
    jul: number;
    aug: number;
    sep: number;
    oct: number;
    nov: number;
    dec: number;

    constructor(jan = 0, feb = 0, mar = 0, apr = 0, may = 0, jun = 0, jul = 0, aug = 0, sept = 0, oct = 0, nov = 0, dec = 0) {
        this.jan = jan;
        this.feb = feb;
        this.apr = apr;
        this.may = may;
        this.jun = jun;
        this.jul = jul;
        this.aug = aug;
        this.oct = oct;
        this.nov = nov;
        this.dec = dec;
    }
}