/**
 * Created by yangyang on 2017/11/25.
 */

export default class DateTime {
  /**
   * 时间格式化，YYYY-MM-DD
   * @param dtStr
   * @returns {string}
   */
  static format(dtStr) {
    let givenDate = new Date(Date.parse(dtStr))
    let Y = givenDate.getFullYear() + '-'
    let M = (givenDate.getMonth()+1 < 10 ? '0'+(givenDate.getMonth()+1) : givenDate.getMonth()+1) + '-'
    let D = givenDate.getDate()<10 ? '0'+givenDate.getDate() : givenDate.getDate()
    return Y+M+D
  }
  
  /**
   * 根据当前时间计算增加天数后的时间格式，YYYY-MM-DD
   * @param days
   * @returns {string}
   */
  static addDate(days) {
    let nowDate = (new Date()).toLocaleDateString()
    let aDate = (new Date(Date.parse(nowDate) + days * 24 * 3600 * 1000)).toLocaleDateString()
    return DateTime.format(aDate)
  }
  
  /**
   * 返回给定起始时间增加天数后的时间格式，为YYYY-MM-DD
   * @param beginDate     起始时间字符串，格式为YYYY-MM-DD
   * @param days          增加的天数
   * @returns {*}
   */
  static addDateWithBegin(beginDate, days) {
    let nowDate = (new Date(beginDate)).toLocaleDateString()
    let aDate = (new Date(Date.parse(nowDate) + days * 24 * 3600 * 1000)).toLocaleDateString()
    return DateTime.format(aDate)
  }
  
  /**
   * 计算给定时间与当前时间的差值，返回单位为秒
   * @param endDate     最后的时间，格式为YYYY-MM-DD
   * @returns {Number}
   */
  static minusDateTime(endDate) {
    let nowtime = (new Date()).getTime()
    let endtime = (new Date(endDate)).getTime() + (new Date()).getTimezoneOffset() * 60000
    return parseInt((endtime - nowtime) / 1000)
  }
}