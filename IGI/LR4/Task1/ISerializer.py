import abc

class Serializer(abc.ABC):
    def __init__(self, filename):
        self._filename = filename

    @abc.abstractmethod
    def SerializeToFile(self, data):
        pass

    @abc.abstractmethod
    def DeserializeFromFile(self):
        pass
