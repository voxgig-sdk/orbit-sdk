# Orbit SDK feature factory

from orbit_sdk.feature.base_feature import OrbitBaseFeature
from orbit_sdk.feature.debug_feature import OrbitDebugFeature
from orbit_sdk.feature.idempotency_feature import OrbitIdempotencyFeature
from orbit_sdk.feature.metrics_feature import OrbitMetricsFeature
from orbit_sdk.feature.paging_feature import OrbitPagingFeature
from orbit_sdk.feature.ratelimit_feature import OrbitRatelimitFeature
from orbit_sdk.feature.retry_feature import OrbitRetryFeature
from orbit_sdk.feature.test_feature import OrbitTestFeature
from orbit_sdk.feature.timeout_feature import OrbitTimeoutFeature


_FEATURES = {
    "base": lambda: OrbitBaseFeature(),
    "debug": lambda: OrbitDebugFeature(),
    "idempotency": lambda: OrbitIdempotencyFeature(),
    "metrics": lambda: OrbitMetricsFeature(),
    "paging": lambda: OrbitPagingFeature(),
    "ratelimit": lambda: OrbitRatelimitFeature(),
    "retry": lambda: OrbitRetryFeature(),
    "test": lambda: OrbitTestFeature(),
    "timeout": lambda: OrbitTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
