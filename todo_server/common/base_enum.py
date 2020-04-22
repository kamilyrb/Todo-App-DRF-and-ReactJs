import enum


class BaseEnum(enum.Enum):
    @classmethod
    def choices(cls):
        return [(key.name, key.value) for key in cls]

    @classmethod
    def get_values(cls):
        return [key.value for key in cls]
