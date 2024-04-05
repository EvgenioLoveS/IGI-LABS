from decorators import add_description



def count_words(string):
    return len(string.split())


def find_longest_word(string):
    words = string.split()
    longest_word = max(words, key = len)
    return longest_word, words.index(longest_word) + 1

def print_odd_words(string):
    words = string.split()
    odd_words = []
    for i in range(len(words)):
        if i % 2 != 0:
            odd_words.append(words[i])
    print(odd_words)




@add_description("Task4: Analyzes a given string and performs the following tasks:\n\
                 1. counts words\n\
                 2. finds the longest word and its position\n\
                 3. prints every odd word.")
def Task4():
    while True:
        text = ("So she was considering in her own mind, as well as she could, for the hot day made her feel very sleepy and stupid, "
            "whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, "
            "when suddenly a White Rabbit with pink eyes ran close by her.")
    
        print("Number of words in the string:", count_words(text))
    
        longest_word, position = find_longest_word(text)
        print(f"The longest word in the string is '{longest_word}' at position {position}.")
    
        print_odd_words(text)

        repeat = input("\nDo you want to perform the task again? (yes/no): ")
        if repeat.lower() != 'yes':
            break
    

