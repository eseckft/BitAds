from abc import ABC, abstractmethod
from typing import List

from common.schemas.bitads import BitAdsDataSchema


class OrderHistoryService(ABC):
    @abstractmethod
    async def add_to_history(self, data: BitAdsDataSchema, hotkey: str) -> bool:
        pass

    @abstractmethod
    async def get_history(self, limit: int = 50) -> List[BitAdsDataSchema]:
        pass
