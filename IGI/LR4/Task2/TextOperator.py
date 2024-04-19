import re
import zipfile

class TextOperator:
    def __init__(self, text=''):
        self.__text = text
    
    @property
    def text(self):
        return self.__text
    
    @text.setter
    def text(self, input_text):
        self.__text = input_text

    def sentences_count(self):
        """Count the number of sentences in the text."""
        sentences = re.findall(r'[A-Z0-9][^?!.]*[!?.]', self.__text)
        return len(sentences)
    
    def declarative_sentences_count(self):
        """Count the number of declarative sentences in the text."""
        sentences = re.findall(r'[A-Z0-9][^?!.]*[.]', self.__text)
        return len(sentences)

    def exclamatory_sentences_count(self):
        """Count the number of exclamatory sentences in the text."""
        sentences = re.findall(r'[A-Z0-9][^?!.]*[!]', self.__text)
        return len(sentences)

    def interrogative_sentences_count(self):
        """Count the number of interrogative sentences in the text."""
        sentences = re.findall(r'[A-Z0-9][^?!.]*[?]', self.__text)
        return len(sentences)
    
    def average_sentence_length(self):
        """Calculate the average length of sentences (in words) in the text."""
        sentences = re.findall(r'[A-Z0-9][^?!.]*[!?.]', self.__text)
        word_count = sum(len(snt.split()) for snt in sentences)
        return word_count / len(sentences) if len(sentences) > 0 else 0

    def average_word_length(self):
        """Calculate the average length of words in the text (excluding punctuation)."""
        words = re.findall(r'\b\w+\b', self.__text)
        word_count = len(words)
        total_length = sum(len(word) for word in words)
        return total_length / word_count if word_count > 0 else 0

    def emojis_count(self):
        """Count the number of emojis in the text."""
        emojis = re.findall(r'[:;]-*([(\[]+)', self.__text)
        return len(emojis)
    
    def words_with_specific_chars(self):
        """Return words containing characters from 'a' to 'o' and digits."""
        words = re.findall(r'\b[a-o\d]+\b', self.__text, re.IGNORECASE)
        return words
    
    def is_six_digit_number_without_leading_zeros(self):
        """Check if the given text is a six-digit number without leading zeros."""
        return bool(re.match(r'^[1-9]\d{5}$', self.__text))

    def words_in_quotes_count(self):
        """Count the number of words enclosed in quotes."""
        words_in_quotes = re.findall(r'"([^"]+)"', self.__text)
        return len(words_in_quotes)

    def count_letter_occurrences(self):
        """Count the occurrences of each letter in the text."""
        letter_counts = {}
        letters = re.findall(r'[a-zA-Z]', self.__text)
        for letter in letters:
            if letter.lower() not in letter_counts:
                letter_counts[letter.lower()] = 0
            letter_counts[letter.lower()] += 1
        return letter_counts
    
    def extract_phrases_alphabetically(self):
        """Extract phrases and sort them alphabetically."""
        phrases = re.findall(r'\b[a-zA-Z,]+\b', self.__text)
        phrases = sorted(set(phrases))  # Remove duplicates and sort
        return phrases
    
    def execute_main_analysis(self):
        """Write main task results to a file."""
        with open('Task2/Task2Results.txt', 'w', encoding='utf-8') as file:
            file.write('Общее задание\n\n')
            file.write(f'Количество предложений в тексте: {self.sentences_count()}\n')
            file.write('\tИз них:\n')
            file.write(f'\tПовествовательные: {self.declarative_sentences_count()}\n')
            file.write(f'\tПобудительные: {self.exclamatory_sentences_count()}\n')
            file.write(f'\tВопросительные: {self.interrogative_sentences_count()}\n')
            file.write(f'\tСредняя длина предложения: {self.average_sentence_length()}\n')
            file.write(f'\tСредняя длина слова: {self.average_word_length()}\n')
            file.write(f'\tКоличество смайликов в тексте: {self.emojis_count()}\n')
            file.close()

    def execute_additional_analysis(self):
        """Write additional task results to a file """
        with open('Task2/Task2Results.txt', 'a', encoding='utf-8') as file:
            file.write('\nЗадание варианта\n\n')
            file.write(f'Слова с символами от "a" до "o" и цифрами: {self.words_with_specific_chars()}\n')
            if self.is_six_digit_number_without_leading_zeros():
                file.write('Текст содержит шестизначное число без ведущих нулей.\n')
            else:
                file.write('Текст не содержит шестизначное число без ведущих нулей.\n')
            file.write(f'Количество слов в кавычках: {self.words_in_quotes_count()}\n')
            file.write(f'Вхождения каждой буквы: {self.count_letter_occurrences()}\n')
            file.write(f'Фразы в алфавитном порядке: {self.extract_phrases_alphabetically()}\n')
            file.close()

            with zipfile.ZipFile('Task2/Task2Results.zip', 'w') as zip_file:
                zip_file.write('Task2/Task2Results.txt', arcname='Task2Results.txt')

                print(f'Содержимое архива Task2Results.zip:')
                for info in zip_file.infolist():
                    print(f'Имя файла: {info.filename}')
                    print(f'Размер файла: {info.file_size} байт')
                    print(f'Сжатый размер: {info.compress_size} байт')
                    print(f'Дата модификации: {info.date_time}')
                    print('---')
