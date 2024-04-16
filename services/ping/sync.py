import subprocess
from datetime import timedelta, datetime
from typing import Optional

from clients.base import BitAdsClient, VersionClient
from helpers.constants import colorize, Color
from helpers.constants.colors import green
from helpers.logging import logger, LogLevel
from schemas.bit_ads import PingResponse
from services.ping.base import PingService


class SyncPingService(PingService):
    def __init__(
        self,
        bitads_client: BitAdsClient,
        version_client: VersionClient,
        timeout_ping: timedelta,
    ):
        self._bitads_client = bitads_client
        self._version_client = version_client
        self._timeout_ping = timeout_ping
        self._ping_timeout = None
        self._current_version = None

    def process_ping(self) -> Optional[PingResponse]:
        need_ping = False

        if not self._ping_timeout or datetime.now() > self._ping_timeout:
            need_ping = True
            self._ping_timeout = datetime.now() + self._timeout_ping

        if not need_ping:
            return None

        logger.info(
            LogLevel.BITADS,
            "Initiating ping to the server to update the activity timestamp.",
        )
        response = self._bitads_client.subnet_ping()
        if not response.result:
            return

        logger.info(
            LogLevel.BITADS,
            green("--> Ping successful. Activity timestamp updated."),
        )
        return response
