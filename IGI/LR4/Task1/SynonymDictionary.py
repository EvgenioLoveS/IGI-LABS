from .PickleSerializer import PickleSerializer
from .CSVSerializer import CSVSerializer
from collections import OrderedDict

class SynonymDictionary:

    def __init__(self, serializer):
        self._serializer = serializer
        self._dictionary = {}

    @property
    def dictionary(self):
        return self._dictionary

    @dictionary.setter
    def dictionary(self, new_dict):
        if isinstance(new_dict, dict):
            self._dictionary = new_dict
        else:
            raise ValueError("Invalid dictionary format. Must be a dictionary.")

    def add_synonym(self, word1, word2):
        self._dictionary[word1] = word2
        self._dictionary[word2] = word1

    def sort_dictionary_by_key(self):
        sorted_dict = OrderedDict(sorted(self.dictionary.items()))
        self.dictionary = sorted_dict  # Используем сеттер для установки отсортированного словаря
        return f"Current Dictionary:{self.dictionary}"


    def serialize_to_file(self):
        self._serializer.SerializeToFile(self._dictionary)


    def deserialize_from_file(self):
        self._dictionary = self._serializer.DeserializeFromFile()

    
    def find_synonym(self, word):
        if word in self._dictionary:
            synonym = self._dictionary[word]
            return f"Synonym found for '{word}': '{synonym}'"
        else:
            return f"No synonym found for '{word}'"


    def find_last_word_synonym(self):
        if self._dictionary:
            last_word = list(self._dictionary.keys())[-1]
            synonym = self.find_synonym(last_word)
            if synonym:
                return f"The synonym for '{last_word}' is '{synonym}'"
            else:
                return f"No synonym found for '{last_word}'"
        else:
            return "Dictionary is empty"