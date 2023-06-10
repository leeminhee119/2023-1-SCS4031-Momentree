/**
 * 파일 객체를 base64로 변환해줍니다.
 * @param {File} file 이미지파일 객체
 * @returns {string} base64 형식의 문자열
 */
export function getBase64FromImage(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function () {
      // Get base64 string
      const base64 = reader.result as string;
      resolve(base64.replace(/^data:image\/[a-z]+;base64,/, ''));
    };
    reader.onerror = function () {
      reject(new Error('Error reading file'));
    };
    reader.readAsDataURL(file);
  });
}
