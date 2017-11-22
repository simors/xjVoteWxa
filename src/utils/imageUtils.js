/**
 * Created by yangyang on 2017/11/22.
 */
import wepy from 'wepy'
import AV from './av-weapp-min'
import Tips from './Tips'

export default class ImageUtils{
  /**
   * 兼容性判断
   */
  static canIUse(str) {
    if (wx.canIUse) {
      return wx.canIUse(str);
    } else {
      return false;
    }
  }
  /**
   * 检查SDK版本
   */
  static isSDKExipred() {
    const {SDKVersion} = wx.getSystemInfoSync();
    console.info(`[version]sdk ${SDKVersion}`);
    return SDKVersion == null || SDKVersion < '1.2.0'
  }
  /**
   * 检查SDK版本
   */
  static checkSDK() {
    if (this.isSDKExipred()) {
      Tips.modal('您的微信版本太低，为确保正常使用，请尽快升级');
    }
  }
  
  /**
   * 选择图标（最大大小限制），默认最大为1M
   */
  static chooseImage(param, maxSize) {
    if (!maxSize) {
      maxSize = 1
    }
    Tips.loading();
    return wepy.chooseImage(param).then(async ({tempFilePaths, tempFiles}) => {
      if (tempFiles && maxSize) {
        const removeIndex = [];
        tempFiles.forEach((file, index) => {
          const limit = maxSize * 1024 * 1024;
          if (file.size > limit) {
            removeIndex.push(index);
          }
        });
        const posStr = removeIndex.map(v => v + 1).join(',');
        if (removeIndex.length > 0) {
          removeIndex.forEach(i => tempFilePaths.splice(i, 1));
          await Tips.alert(`第${posStr}张图超过${maxSize}M`);
        }
      }
      Tips.loaded();
      return tempFilePaths;
    }).catch(() => {
      Tips.loaded();
      return [];
    });
  }
  
  static async uploadImage(filepath) {
    let file = new AV.File('', {blob: {uri: filepath}})
    let result = await file.save()
    return result.url()
  }
}