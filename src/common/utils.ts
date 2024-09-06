export function parseParam(
    param: string,
    defaultValue?: string | boolean | number | null,
  ): string | boolean | number | null {
    const paramExist = process.argv.indexOf(`--${param}`);
    if (paramExist !== -1 && process.argv[paramExist + 1]) {
      const customParamValue = process.argv[paramExist + 1];
      console.log(`${param} value:`, customParamValue);
      return customParamValue;
    } else {
      console.warn(`${param} missing, using default value`);
      return defaultValue;
    }
  }
  