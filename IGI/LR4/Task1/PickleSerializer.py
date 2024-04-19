import pickle
from Task1.ISerializer import Serializer


class PickleSerializer(Serializer):
    def SerializeToFile(self, data):
        try:
            with open(self._filename, 'wb') as file:
                pickle.dump(data, file)
            print(f"Data successfully serialized to file: {self._filename}")
        except Exception as e:
            print(f"Error while serializing data: {e}")

    def DeserializeFromFile(self):
        try:
            with open(self._filename, 'rb') as file:
                data = pickle.load(file)
            print(f"Data successfully deserialized from file: {self._filename}")
            return data
        except Exception as e:
            print(f"Error while deserializing data: {e}")