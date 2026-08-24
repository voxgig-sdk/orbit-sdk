package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewMemberEntityFunc func(client *OrbitSDK, entopts map[string]any) OrbitEntity

