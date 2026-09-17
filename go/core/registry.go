package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewDebugFeatureFunc func() Feature

var NewIdempotencyFeatureFunc func() Feature

var NewMetricsFeatureFunc func() Feature

var NewPagingFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewActivityEntityFunc func(client *OrbitSDK, entopts map[string]any) OrbitEntity

var NewActivityTypeEntityFunc func(client *OrbitSDK, entopts map[string]any) OrbitEntity

var NewMemberEntityFunc func(client *OrbitSDK, entopts map[string]any) OrbitEntity

var NewNoteEntityFunc func(client *OrbitSDK, entopts map[string]any) OrbitEntity

var NewOrganizationEntityFunc func(client *OrbitSDK, entopts map[string]any) OrbitEntity

var NewReportEntityFunc func(client *OrbitSDK, entopts map[string]any) OrbitEntity

var NewUserEntityFunc func(client *OrbitSDK, entopts map[string]any) OrbitEntity

var NewWebhookEntityFunc func(client *OrbitSDK, entopts map[string]any) OrbitEntity

var NewWorkspaceEntityFunc func(client *OrbitSDK, entopts map[string]any) OrbitEntity

