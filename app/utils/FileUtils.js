export function convertBlobToBase64(blob,onSuccessCallBack){
  let base64Data;
  let reader = new window.FileReader();
  reader.onloadend = function() {
     base64Data = reader.result;
     onSuccessCallBack(base64Data)
  }
  reader.readAsDataURL(blob);
}
