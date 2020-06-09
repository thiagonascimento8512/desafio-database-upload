import csvParse from 'csv-parse';
import fs from 'fs';
import path from 'path';
import Transaction from '../models/Transaction';

import CreateTransactionService from '../services/CreateTransactionService';

class ParseCSV {
  async convert(): Promise<Transaction[]> {
    const createTransaction = new CreateTransactionService();

    const csvFilePath = path.resolve(
      __dirname,
      '..',
      '..',
      'tmp',
      'import_template.csv',
    );

    const readCSVStream = fs.createReadStream(csvFilePath);

    const parseStream = csvParse({
      from_line: 2,
      ltrim: true,
      rtrim: true,
    });

    const parseCSV = readCSVStream.pipe(parseStream);

    const transactions: any[] = [];

    parseCSV.on('data', async line => {
      const [title, type, value, category] = line;
      const transaction = {
        title,
        type,
        value: Number(value),
        category: String(category),
      };

      transactions.push(transaction);
    });

    await new Promise(resolve => {
      parseCSV.on('end', resolve);
    });

    return transactions;
  }
}

export default ParseCSV;
