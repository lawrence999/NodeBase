cube(`Bca_data_all`, {
    sql: `SELECT * FROM public.bca_data_all`,
    //sql: `SELECT * FROM orders WHERE ${FILTER_PARAMS.Bca_data_all.blocktime.filter('BlockTime')}`, //it work as SELECT * FROM orders WHERE date >= '2018-01-01 00:00:00' and date <= '2018-12-31 23:59:59'
    joins: {
      
    },
    
    measures: {
      count: { //SELECT count(id) from bca_data_all;
        sql: `LedgerAddressTransactionId`,
        type: `count`
      },
      // manaCount: { //selecting only the entries where tokensymbol = 'MANA'
      //   sql: `LedgerAddressTransactionId`,
      //   type: `count`,
      //   filters: [
      //     { sql: `${CUBE}.tokensymbol = 'MANA'` }
      //   ]
      // },
      // manaPercentage: {
      //   sql: `100.0 * ${manaCount} / ${count}`,
      //   type: `number`,
      //   format: `percent`
      // },
      tokenrunningbalance: {
        sql: `TokenRunningBalance`,
        type: `count`
      },
      tokenlatestbalance: {
        sql: `TokenLatestBalance`,
        type: `count`
      },
      runningbalance: {
        sql: `RunningBalance`,
        type: `number`
      },
      latestbalance: {
        sql: `LatestBalance`,
        type: `number`
      },
      value: {
        sql: `Value`,
        type: `number`
      },
    },
    dimensions: {
      id: {
        sql: `LedgerAddressTransactionId`,
        type: `number`,
        //primaryKey: true
      },
      importid: {
        sql: `ImportId`,
        type: `number`
      },
      currency: {
        sql: `Currency`,
        type: `string`
      },
      txId: {
        sql: `TxId`,
        type: `string`
      },
      address: {
        sql: `Address`,
        type: `string`
      },
      voutn: {
        sql: `VoutN`,
        type: `number`
      },
      blocktime: {
        sql: `BlockTime`,
        type: `time`
      },
      vinTransactionid: {
        sql: `VinTransactionId`,
        type: `string`
      },
      transactiontype: {
        sql: `TransactionType`,
        type: `string`
      },
      tokensymbol: {
        sql: `TokenSymbol`,
        type: `string`
      },
      contractaddress: {
        sql: `ContractAddress`,
        type: `string`
      },
    }
  });
  