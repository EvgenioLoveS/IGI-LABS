from decorators import add_description


def count_uppercase_vowels(string):

    vowels = ['A', 'E', 'I', 'O', 'U', 'Y']
    count = 0

    for char in string:
        if char.isupper() and char in vowels:
            count += 1

    return count


@add_description("Task3: Counts the number of uppercase English vowels in a string entered from the keyboard.")
def Task3():
    while True:
        user_input = input("Enter a string: ")
        count = count_uppercase_vowels(user_input)
        print(f"\nNumber of uppercase English vowels in the input string: {count}")

        repeat = input("\nDo you want to perform the task again? (yes/no): ")
        if repeat.lower() != 'yes':
            break