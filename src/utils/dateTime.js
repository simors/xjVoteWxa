/**
 * Created by yangyang on 2017/11/25.
 */

export default class DateTime {
  static format(dtStr) {
    let givenDate = new Date(Date.parse(dtStr))
    let Y = givenDate.getFullYear() + '-'
    let M = (givenDate.getMonth()+1 < 10 ? '0'+(givenDate.getMonth()+1) : givenDate.getMonth()+1) + '-'
    let D = givenDate.getDate()<10 ? '0'+givenDate.getDate() : givenDate.getDate()
    return Y+M+D
  }
  
  static addDate(days) {
    let nowDate = (new Date()).toLocaleDateString()
    let aDate = (new Date(Date.parse(nowDate) + days * 24 * 3600 * 1000)).toLocaleDateString()
    return DateTime.format(aDate)
  }
}