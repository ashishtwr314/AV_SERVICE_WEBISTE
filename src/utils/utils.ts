/**
 * Convert Array to String
*/
export const convertArrToStr = (arr: any[]) => {
    return arr.join();
}

/**
 * Convert String to Array
 */
export const convertStrToArr = (str: string) => {
    return str
        .split(',')
        .map((entry: string) => parseInt(entry, 10))
        .filter((entry: any) => typeof entry ==='number');
}

export const convertStrToArrString = (str: string) => {
    return str
        .split(',');
}

/**
 * Encrypt data for URL params
 * @param {
 * value
 * }
*/
export const cryptData = async (
  type: 'enc' | 'dec',
  value: any
) => {
    if(typeof value === 'undefined') return 0;
    if(typeof value === null) return 0;
    
    const data = value.toString();
    let finalData: any = '';
    if(type === 'enc') {
        // Create buffer object, specifying utf8 as encoding
        const bufferObj = Buffer.from(data, "utf8");
        // Encode the Buffer as a base64 string
        finalData =  bufferObj.toString("base64");
    }
    else if(type === 'dec') {
        // Create buffer object, specifying base64 as encoding
        const bufferObj = Buffer.from(data, "base64");
        // Encode the Buffer as a utf8 string
        finalData =  bufferObj.toString("utf8");
        console.log('finalData', finalData);
    }
    return finalData;
}

/**
 * Convert image to base64
 * @param {
 *  file: File
 * }
*/
export const toBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});