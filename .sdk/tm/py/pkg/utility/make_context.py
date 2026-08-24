# Orbit SDK utility: make_context

from projectname_sdk.core.context import OrbitContext


def make_context_util(ctxmap, basectx):
    return OrbitContext(ctxmap, basectx)
