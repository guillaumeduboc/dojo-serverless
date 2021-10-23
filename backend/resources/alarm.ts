export default {
  Type: 'AWS::CloudWatch::Alarm',
  Properties: {
    ActionsEnabled: false,
    AlarmName: 'alarmVirus',
    ComparisonOperator: 'GreaterThanOrEqualToThreshold',
    EvaluationPeriods: 1,
    MetricName: 'Invocations',
    Namespace: 'AWS/Lambda',
    Period: 60,
    Statistic: 'Sum',
    Threshold: 10,
    Unit: 'Count',
  },
};
