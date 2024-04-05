from decorators import add_description
from sequence_initialization import initialize_sequence_with_user_input, initialize_sequence_with_generator

def find_min_in_sequence(sequence):
    return min(sequence)

@add_description("Task2: Finds the minimum number in a sequence.")
def Task2():
    while True:  
        sequence = []
        while True:
            try:
                choice = int(input("Select input method: 1 - user input, 2 - random input: "))
                print()
                match choice:
                    case 1:
                        sequence = initialize_sequence_with_user_input()
                        print(f"Min number: {find_min_in_sequence(sequence)}")
                        break
                    case 2:
                        sequence = initialize_sequence_with_generator()
                        print(f"Min number: {find_min_in_sequence(sequence)}")
                        break
                    case _:
                        print("Incorrect input. Please enter a number between 1 and 2.")
            except ValueError:
                print("Incorrect input. Please enter a valid number.")

        repeat = input("\nDo you want to perform the task again? (yes/no): ")
        if repeat.lower() != 'yes':
            break

    
            