export default {
  Type: 'AWS::CloudWatch::Alarm',
  Properties: {
    ActionsEnabled: false,
    AlarmName: 'alarmVirus',
    ComparisonOperator: 'GreaterThanOrEqualToThreshold',
    EvaluationPeriods: 1,
    MetricName: 'Errors',
    Namespace: 'AWS/Lambda',
    Period: 60,
    Statistic: 'Sum',
    Threshold: 1,
    Unit: 'Count',
  },
};
