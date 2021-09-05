import { environment } from '@environments/environment';

export class UrlApiUtil {
  public static getApiUrl(): string {
    return `${environment.apiUrl}/api/v1/`;
  }
}
