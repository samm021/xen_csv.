import _ from 'lodash';

import recordService from './record.service';
import { month } from './record.type';

const start = async (month: month) => {
  try {
    console.info('> Getting source & proxy records...');
    const [bankRecords, proxyRecords] = await Promise.all([
      recordService.getBankRecords(month),
      recordService.getProxyRecords(month)
    ]);
    if (_.isEmpty(bankRecords) || _.isEmpty(proxyRecords)) {
      console.info(
        `> Source or proxy records has no record of month ${month}, exiting...`
      );
      return;
    }

    console.info('> Getting mismatched records...');
    const mismatchedRecords = recordService.getMismatchedRecords(
      bankRecords,
      proxyRecords
    );
    if (
      _.isEmpty(mismatchedRecords.fromBank) &&
      _.isEmpty(mismatchedRecords.fromProxy)
    ) {
      console.info(
        '> Source & proxy records has no mismatched record, exiting...'
      );
      return;
    }

    console.info('> Calculating mismatched records...');
    const unreconciledRecords = await recordService.getUnreconciledRecords(
      mismatchedRecords
    );
    if (_.isEmpty(unreconciledRecords)) {
      console.info('> Failed to map unreconciled records');
      return;
    }

    console.info('> Writing report & summary...');
    await Promise.all([
      recordService.writeReportStatement(unreconciledRecords),
      recordService.writeReportSummary(
        bankRecords,
        proxyRecords,
        unreconciledRecords,
        mismatchedRecords
      )
    ]);

    console.info('> Done processing data!');
  } catch (e) {
    console.error(e);
    console.info('> Getting errors when processing data, exiting...');
  }
};

const recordController = { start };

export default recordController;
