import * as XLSX from 'xlsx';
export function xlsxToArray(
  filePath: string,
): boolean | { level: number; volume: number }[] {
  if (!filePath) return false;
  try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const inputArray = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    inputArray.shift();
    console.log(inputArray);
 
    const result = [];
    console.log(result);
    return result;
  } catch (error) {
    return false;
  }
}
