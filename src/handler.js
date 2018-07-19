const AWS = require('aws-sdk');

const cloudWatchLogs = new AWS.CloudWatchLogs();
const retentionDays = process.env.retention_days;

module.exports.handler = async (event, context, callback) => {
  try {
    console.log(JSON.stringify(event));
    const logGroupName = event.detail.requestParameters.logGroupName;
    console.log(`log group: ${logGroupName}`);
    const params = {
      logGroupName,
      retentionInDays: retentionDays,
    };
    await cloudWatchLogs.putRetentionPolicy(params).promise();
  } catch (err) {
    console.log(err);
    callback(err, null);
  }
  callback(null, 'ok');
};
