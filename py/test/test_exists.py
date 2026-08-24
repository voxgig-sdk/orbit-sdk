# Orbit SDK exists test

import pytest
from orbit_sdk import OrbitSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = OrbitSDK.test(None, None)
        assert testsdk is not None
