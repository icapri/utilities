import {Objects} from '../objects/Objects';
import {Strings} from '../strings/Strings';
import {Utils} from '../Utils';

/**
 * Defines an abstract class with Blob utilities.
 *
 * @since v1.6.1
 */
export abstract class Blobs {
  /**
   * Gets the JavaScript URL interface.
   *
   * @private
   *
   * @since v1.6.1
   */
  private static readonly URL = Utils.globalThat.URL ||
    Utils.globalThat.webkitURL;

  /**
   * Converts a `File` object to a `Blob` object asynchronously.
   *
   * @param {File} file Contains some `File` object
   * @return {Promise} a `Blob` object asynchronously.
   */
  public static async fromFile(file: File): Promise<Blob> {
    const buffer = await file.arrayBuffer();
    return new Blob([new Uint8Array(buffer)], {type: file.type});
  }

  /**
   * Converts an `ImageData` object to a `Blob` object asynchronously.
   *
   * @param {ImageData} imageData Contains an `ImageData` object.
   * @return {Promise} a `Blob` object asynchronously.
   *
   * @since v1.6.1
   */
  public static async fromImageData(imageData: ImageData): Promise<Blob> {
    const w = imageData.width;
    const h = imageData.height;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const context = canvas.getContext('2d');
    if (Utils.isNull(context)) {
      throw new Error('Cannot convert ImageData to Blob.');
    }
    context.putImageData(imageData, 0, 0, w, h, w, h);
    return new Promise((resolve) => canvas.toBlob(resolve as any));
  }

  /**
   * Converts an `URL` object to a `Blob` object.
   *
   * @param {String} url Contains an `URL` object.
   * @return {Blob} a `Blob` object.
   *
   * @since v1.6.1
   */
  public static async fromObjectURL(url: URL): Promise<Blob>;
  /**
   * Converts a string URL to a `Blob` object.
   *
   * @param {String} url Contains a string URL.
   * @return {Blob} a `Blob` object.
   *
   * @since v1.6.1
   */
  public static async fromObjectURL(url: string): Promise<Blob>;
  /**
   * Converts an `URL` object or an URL string to a `Blob` object.
   *
   * @param {String} url Contains an `URL` object or an URL string.
   * @return {Blob} a `Blob` object.
   *
   * @since v1.6.1
   */
  public static async fromObjectURL(url: string | URL): Promise<Blob> {
    if (Strings.hasWhitespace(Strings.isString(url) ? url : url.toString())) {
      throw new TypeError(`Invalid URL "${url}".`);
    }
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('GET', url);
      request.responseType = 'blob';
      request.onload = function() {
        const isDone = request.readyState === 4,
          isOkay = request.status >= 200 && request.status < 300;
        if (isDone && isOkay) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
      request.send();
    });
  }

  /**
   * Checks whether the specified value is a `Blob` instance.
   *
   * @param {*} value Contains some value.
   * @return {Boolean} whether the specified value is a `Blob` instance.
   *
   * @since v1.6.1
   */
  public static isBlob(value?: any): value is Blob {
    return Objects.toString(value) === '[object Blob]';
  }

  /**
   * Converts a `Blob` object to a Base64 string.
   *
   * @param {Blob} blob Contains a `Blob` object.
   * @return {Promise} a Base64 string.
   *
   * @since v1.6.1
   */
  public static async toBase64(blob: Blob): Promise<string> {
    const url = Blobs.URL.createObjectURL(blob);
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
      img.src = url;
    }).then((img: HTMLImageElement) => {
      setTimeout(() => Blobs.URL.revokeObjectURL(url), 4e4);
      let width = img.width, height = img.height;
      const factor = Math.max(width, height) / 256;
      width = width / factor;
      height = height / factor;
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext('2d');
      context?.drawImage(img, 0, 0);
      return canvas.toDataURL();
    });
  }

  /**
   * Converts a `Blob` object into a `File` object.
   *
   * @param {Blob} blob Cotnains some `Blob` object.
   * @param {String} fileName Contains some file name.
   * @return {File} a `File` object.
   */
  public static toFile(blob: Blob, fileName: string): File {
    fileName ??= 'untitled';
    return new File([blob], fileName, {
      lastModified: new Date().getTime(),
      type: blob.type,
    });
  }

  /**
   * Converts a `Blob` object to an `ImageData` object.
   *
   * @param {Blob} blob Contains a `Blob` object.
   * @return {Promise} an `ImageData` object.
   *
   * @since v1.6.1
   */
  public static async toImageData(blob: Blob): Promise<ImageData> {
    const blobUrl = Blobs.URL.createObjectURL(blob);
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
      img.src = blobUrl;
    }).then((img: HTMLImageElement) => {
      setTimeout(() => Blobs.URL.revokeObjectURL(blobUrl), 4e4);
      let width = img.width, height = img.height;
      const factor = Math.max(width, height) / 256;
      width = width / factor;
      height = height / factor;
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext('2d');
      if (Utils.isNull(context)) {
        throw new Error('Cannot convert Blob to ImageData.');
      }
      context.drawImage(img, 0, 0);
      return context.getImageData(0, 0, width, height);
    });
  }

  /**
   * Converts a `Blob` object to a string URL.
   *
   * @param {Blob} blob Contains some `Blob` object.
   * @return {Promise} a string URL.
   *
   * @since v1.6.1
   */
  public static async toObjectURL(blob: Blob): Promise<string> {
    return new Promise( (resolve, reject) => {
      try {
        resolve(Blobs.URL.createObjectURL(blob));
      } catch (error) {
        reject(error);
      }
    });
  }
}
