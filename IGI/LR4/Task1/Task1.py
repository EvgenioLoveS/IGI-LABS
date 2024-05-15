from Task1.ISerializer import Serializer
from Task1.PickleSerializer import PickleSerializer
from Task1.CSVSerializer import CSVSerializer
from Task1.SynonymDictionary import SynonymDictionary
from repeat import should_repeat




class Task1():
    @staticmethod
    def MenuTask1():
        while True:
            filename1 = 'Task1/PickleData.pickle'
            filename2 = 'Task1/CSVData.csv'
            # Создаем сериализаторы
            csv_serializer = CSVSerializer(filename2)
            pickle_serializer = PickleSerializer(filename1)

            # Заранее инициализируем словарь синонимов для обоих сериализаторов
            synonyms = {
                'happy': 'joy',
                'sad': 'unhappy',
                'big': 'large',
                'hot': 'warm'
            }

            synonyms2 = {
                'good': 'excellent',
                'bad': 'terrible',
                'fast': 'quick',
                'old': 'ancient'
            }

            # Создаем экземпляры класса SynonymDictionary с разными сериализаторами
            syn_dict_csv = SynonymDictionary(csv_serializer)
            syn_dict_pickle = SynonymDictionary(pickle_serializer)

            # Присваиваем заранее инициализированный словарь через сеттер для каждого экземпляра
            syn_dict_csv.dictionary = synonyms2
            syn_dict_pickle.dictionary = synonyms

            # Сериализуем и десериализуем с использованием CSV сериализатора
            syn_dict_csv.serialize_to_file()
            syn_dict_csv.deserialize_from_file()
            print("CSV Serialized Dictionary:", syn_dict_csv.dictionary)

            # Сериализуем и десериализуем с использованием Pickle сериализатора
            syn_dict_pickle.serialize_to_file()
            syn_dict_pickle.deserialize_from_file()
            print("Pickle Serialized Dictionary:", syn_dict_pickle.dictionary)

            while True:

                choice = input("""
                    Enter your choice (1-5, or 0 to exit):
                    1. Get the current dictionary
                    2. Add synonyms to the dictionary
                    3. Find a synonym for a word
                    4. Find the synonym for the last word in the dictionary
                    5. Sort
                    0. Exit
                    """)

                if choice == '1':
                    # Вывод текущего словаря
                    print("CSV Serialized Dictionary:", syn_dict_csv.dictionary)
                    print("Pickle Serialized Dictionary:", syn_dict_pickle.dictionary)

                elif choice == '2':
                    # Добавление синонимов в словарь
                    word1 = input("Enter the first word: ")
                    word2 = input("Enter the synonym for the first word: ")
                    syn_dict_csv.add_synonym(word1, word2)
                    syn_dict_pickle.add_synonym(word1, word2)
                    print(f"Added synonyms: {word1} <=> {word2}")

                elif choice == '3':
                    # Поиск синонима по введенному слову
                    word = input("Enter a word to find its synonym: ")
                    result_csv = syn_dict_csv.find_synonym(word)
                    result_pickle = syn_dict_pickle.find_synonym(word)
                    print("CSV Synonym Result:", result_csv)
                    print("Pickle Synonym Result:", result_pickle)

                elif choice == '4':
                    # Поиск синонима для последнего слова в словаре
                    result_csv = syn_dict_csv.find_last_word_synonym()
                    result_pickle = syn_dict_pickle.find_last_word_synonym()
                    print("CSV Last Word Synonym Result:", result_csv)
                    print("Pickle Last Word Synonym Result:", result_pickle)
                elif choice == '5':
                    sorted_result_csv = syn_dict_csv.sort_dictionary_by_key()
                    sorted_result_pickle = syn_dict_pickle.sort_dictionary_by_key()
    
                    # Выводим результаты сортировки
                    print("CSV Sorted Dictionary:")
                    print(sorted_result_csv)
    
                    print("\nPickle Sorted Dictionary:")
                    print(sorted_result_pickle)

                elif choice == '0':
                    # Выход из внутреннего цикла, продолжение работы программы
                    break

            # Запрос на повторное выполнение
            if not should_repeat():
                break