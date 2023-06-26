let getBase64 = async function(imgUrl){
    return await new Promise((resolve, reject) => {
        window.URL = window.URL || window.webkitURL;
        var xhr = new XMLHttpRequest();
        xhr.open("get", imgUrl, true);
        // 至关重要
        xhr.responseType = "blob";
        xhr.onload = function () {
            if (this.status == 200) {
                var blob = this.response;
                let oFileReader = new FileReader();
                oFileReader.onloadend = function (e) {
                    resolve(e.target.result)
                };
                oFileReader.readAsDataURL(blob);
            }
        }
        xhr.send();
    })
};
export {
    getBase64,
}
