// 统一的在线预览工具：下载 -> openDocument，带 loading、超时、一次重试与失败提示

export function openDocumentFromUrl(file) {
  const url = typeof file === 'string' ? file : file.url;
  const fileType = typeof file === 'object' && file.type ? file.type : '';

  if (!url) {
    uni.showToast({ title: '文件地址为空', icon: 'none' });
    return;
  }

  // 微信小程序不支持的文件类型
  const unsupported = ['rar', '7z', 'zip', 'tar', 'gz', 'bz2', 'exe', 'dmg', 'iso', 'bin'];
  const ext = (fileType || url.split('?')[0].split('.').pop() || '').toLowerCase();
  
  // 微信小程序支持的文件类型
  const supported = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'rtf'];
  const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
  
  if (unsupported.includes(ext)) {
    uni.showModal({
      title: '暂不支持在线预览',
      content: '该格式请下载后在电脑端查看',
      showCancel: false
    });
    return;
  }
  
  // 如果是图片类型，使用uni.previewImage
  if (imageTypes.includes(ext)) {
    uni.previewImage({
      urls: [url],
      current: url,
      success: () => {
        console.log('图片预览成功');
        uni.hideLoading();
      },
      fail: (err) => {
        console.error('图片预览失败:', err);
        uni.hideLoading();
        uni.showToast({ title: '图片预览失败', icon: 'none' });
      }
    });
    return;
  }
  
  const doDownload = (retry = false) => {
    const timer = setTimeout(() => {
      // 超时主动失败，触发 fail 流程
      uni.hideLoading();
      if (!retry) {
        console.log('第一次下载超时，尝试重试...');
        doDownload(true);
      } else {
        console.log('重试后仍然超时');
        uni.showToast({ title: '预览超时，请检查网络后重试', icon: 'none' });
      }
    }, 20000); // 减少超时时间到20秒

    // 如果文件类型不在支持列表中，给出提示
    if (!supported.includes(ext)) {
      uni.showModal({
        title: '文件类型可能不支持',
        content: `文件类型 ${ext.toUpperCase()} 可能无法预览，是否继续尝试？`,
        success: (res) => {
          if (res.confirm) {
            // 继续下载，不需要hideLoading，因为会继续执行下载
          } else {
            uni.hideLoading();
            return;
          }
        }
      });
    }

    console.log('开始下载文件:', url);
    uni.downloadFile({
      url,
      success: (res) => {
        clearTimeout(timer);
        console.log('下载响应:', res);
        if (res.statusCode === 200) {
          console.log('开始打开文档:', res.tempFilePath, '类型:', ext);
          uni.openDocument({
            filePath: res.tempFilePath,
            fileType: ext,
            showMenu: true,
            success: () => {
              console.log('文档打开成功');
              uni.hideLoading();
            },
            fail: (err) => {
              uni.hideLoading();
              console.error('打开文档失败:', err);
              if (!retry) {
                console.log('第一次打开失败，尝试重新下载...');
                doDownload(true);
              } else {
                uni.showToast({ title: '预览失败，请稍后重试', icon: 'none' });
              }
            }
          });
        } else {
          uni.hideLoading();
          console.error('下载失败，状态码:', res.statusCode);
          if (!retry) {
            console.log('第一次下载失败，尝试重试...');
            doDownload(true);
          } else {
            uni.showToast({ title: `下载失败(状态码:${res.statusCode})，请稍后重试`, icon: 'none' });
          }
        }
      },
      fail: (err) => {
        clearTimeout(timer);
        uni.hideLoading();
        console.error('下载请求失败:', err);
        
        // 如果是OSS域名且第一次失败，尝试通过云服务器代理
        if (!retry && url.includes('llzm-lixiaobao.oss-cn-beijing.aliyuncs.com')) {
          console.log('OSS下载失败，尝试通过云服务器代理...');
          const proxyUrl = `https://llzmlxb.xyz/api/proxy-download?url=${encodeURIComponent(url)}`;
          console.log('使用代理URL:', proxyUrl);
          
          uni.downloadFile({
            url: proxyUrl,
            success: (res) => {
              if (res.statusCode === 200) {
                uni.openDocument({
                  filePath: res.tempFilePath,
                  fileType: ext,
                  showMenu: true,
                  success: () => {
                    console.log('代理下载成功，文档打开成功');
                    uni.hideLoading();
                  },
                  fail: (err) => {
                    uni.hideLoading();
                    console.error('代理下载后打开文档失败:', err);
                    uni.showToast({ title: '预览失败，请稍后重试', icon: 'none' });
                  }
                });
              } else {
                uni.showToast({ title: '代理下载失败，请稍后重试', icon: 'none' });
              }
            },
            fail: (err) => {
              console.error('代理下载也失败:', err);
              uni.showToast({ title: '网络异常，请检查网络后重试', icon: 'none' });
            }
          });
          return;
        }
        
        if (!retry) {
          console.log('第一次请求失败，尝试重试...');
          doDownload(true);
        } else {
          uni.showToast({ title: '网络异常，请检查网络后重试', icon: 'none' });
        }
      }
    });
  };

  uni.showLoading({ title: '正在加载...', mask: true });
  doDownload(false);
}

export default { openDocumentFromUrl };



