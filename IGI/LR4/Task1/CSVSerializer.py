import csv
from Task1.ISerializer import Serializer



class CSVSerializer(Serializer):
    def SerializeToFile(self, data):
        try:
            with open(self._filename, 'w', newline='') as csvfile:
                writer = csv.writer(csvfile)
                for key, value in data.items():
                    writer.writerow([key, value])
            print(f"Data successfully serialized to CSV file: {self._filename}")
        except Exception as e:
            print(f"Error while serializing data to CSV: {e}")

    def DeserializeFromFile(self):
        try:
            with open(self._filename, 'r', newline='') as csvfile:
                reader = csv.reader(csvfile)
                data = {row[0]: row[1] for row in reader}
            print(f"Data successfully deserialized from CSV file: {self._filename}")
            return data
        except Exception as e:
            print(f"Error while deserializing data from CSV: {e}")