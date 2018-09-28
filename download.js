/*
post请求下载文件
@params 地址
@params 参数
@params header头
@params 成功回调
@params 失败回调
*/

export default (_URL, data = {}, _myHeaders = {}, successCb, errorCb) => {
    const myHeaders = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        'X-Requested-With': 'XMLHttpRequest', 
        ..._myHeaders
    })
    const myInit = {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(data)
    };
    const myRequest = new Request(_URL, myInit);
    let name;
    fetch(myRequest).then(response => {  
        name = response.headers.get('Content-disposition') || '二维码.zip';
        return response.blob()
    }).then((blob) => {
        var a = document.createElement('a');
        var url = window.URL.createObjectURL(blob);
        var filename = name;
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
        if (successCb) {
            successCb()
        }
    }).catch(error => {
        if (errorCb) {
            errorCb(error)
        }
        console.log('catch', error)
    })
}