
export class StringUtils {
    static generateRandomAlphaNumeric(length: number = 5) {
      const charset =
        'ABCDEFGHIJKLMNOPQRSTUWWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        result += charset.charAt(randomIndex);
      }
      return result;
    }
  }
  