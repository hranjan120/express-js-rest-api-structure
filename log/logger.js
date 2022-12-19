/* eslint-disable new-cap */
const winston = require('winston');
const WinstonCloudWatch = require('winston-cloudwatch');
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.CLOUDWATCH_ACCESS_KEY,
  secretAccessKey: process.env.CLOUDWATCH_SECRET_ACCESS_KEY,
  region: process.env.CLOUDWATCH_REGION,
});

const logger = new winston.createLogger({
  format: winston.format.json(),
  transports: [
    new (winston.transports.Console)({
      timestamp: true,
      colorize: true,
    }),
  ],
});
if (process.env.NODE_ENV === 'production') {
  const cloudwatchConfig = {
    cloudWatchLogs: new AWS.CloudWatchLogs(),
    logGroupName: process.env.CLOUDWATCH_GROUP_NAME,
    logStreamName: `${process.env.CLOUDWATCH_GROUP_NAME}-${process.env.NODE_ENV}`,
    messageFormatter: ({ level, message, additionalInfo }) => `[${level}] : ${message} \nAdditional Info: ${JSON.stringify(additionalInfo)}}`,
  };
  logger.add(new WinstonCloudWatch(cloudwatchConfig));
}
module.exports = logger;
