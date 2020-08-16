class DateHelper {
  constructor() {}
  static convertDateFormat(date) {
    let newDate = new Date(date);
    return `${newDate.getFullYear()}-${("0" + (newDate.getMonth() + 1)).slice(
      -2
    )}-${("0" + newDate.getUTCDate()).slice(-2)} ${(
      "0" + newDate.getHours()
    ).slice(-2)}:${("0" + newDate.getMinutes()).slice(-2)}:${(
      "0" + newDate.getSeconds()
    ).slice(-2)}`;
  }
}

module.exports = DateHelper;
