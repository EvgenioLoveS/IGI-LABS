from Task1.ISerializer import Serializer
from Task1.PickleSerializer import PickleSerializer
from Task1.CSVSerializer import CSVSerializer
from Task1.SynonymDictionary import SynonymDictionary
from repeat import should_repeat


word_synonyms = {
        'happy': 'joyful',
        'sad': 'unhappy',
        'big': 'large'
    }

class Task1:
    @staticmethod
    def MenuTask1():
        synonym_dictionary = dict(sorted(word_synonyms.items()))
        
        while True:
            while True:
                try:
                    serialization_choice = int(input('\nPlease select a serialization method (1 - Pickle, 2 - CSV): '))

                    if serialization_choice in range(1, len(Serializer.get_supported_methods()) + 1):
                        method = Serializer.get_supported_methods()[serialization_choice - 1]
                        serializer = None

                        if method == 'pickle':
                            filename = f'Task1/{method.capitalize()}Data'
                            serializer = PickleSerializer(filename + '.txt')
                        elif method == 'csv':
                            filename = f'Task1/{method.upper()}Data'
                            serializer = CSVSerializer(filename + '.csv')

                        if serializer:
                            serializer.serialize(synonym_dictionary)
                            synonym_dictionary = SynonymDictionary(serializer.deserialize())
                            break
                        else:
                            print("Invalid serialization method.")
                    else:
                        print("Invalid choice. Please enter 1 or 2.")

                except ValueError:
                    print("Incorrect input. Please enter a valid number.")

            while True:
                try:
                    operation_choice = int(input('\nChoose an operation (1 - Get last word synonym, 2 - Find word synonym): '))

                    if operation_choice == 1:
                        last_word_synonym = synonym_dictionary.get_last_word_synonym()
                        print(f"The synonym for the last word in the dictionary is: {last_word_synonym}")
                        break
                    elif operation_choice == 2:
                        word_to_find = input("Enter a word to find its synonym: ").strip().lower()
                        word_synonym = synonym_dictionary.find_word_synonym(word_to_find)
                        print(f"The synonym for '{word_to_find}' is: {word_synonym}")
                        break
                    else:
                        print("Invalid operation choice. Please enter 1 or 2.")

                except ValueError:
                    print("Incorrect input. Please enter a valid number.")

            if not should_repeat():
                break
