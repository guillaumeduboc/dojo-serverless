export default {
  Type: 'AWS::CloudWatch::Alarm',
  Properties: {
    ActionsEnabled: false,
    AlarmName: 'alarmVirus',
    ComparisonOperator: 'GreaterThanOrEqualToThreshold',
    // DatapointsToAlarm : 5,
    EvaluationPeriods: 1,
    MetricName: 'Invocations',
    Namespace: 'AWS/Lambda',
    Period: 60,
    Statistic: 'Sum',
    Threshold: 5,
    Unit: 'Count',
  },
};
