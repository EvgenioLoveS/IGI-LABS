import random


def initialize_sequence_with_user_input():
    sequence = []
    print("Please enter a sequence. Enter '0' to stop input")
    while True:
        try:
            number = int(input("Enter a number: "))
            if number == 0:
                break
            sequence.append(number)
        except ValueError:
            print("Invalid input. Please enter a valid integer") 
    return sequence


def initialize_sequence_with_generator():
    size = random.randint(5, 20)
    sequence = [random.randint(1, 1000) for _ in range(size)]
    print("Random sequence generated successfully:\n", sequence)
    return sequence


def input_list():
    while True:
        try:
            size_list = int(input("Enter a size of list: "))
            if size_list <= 0:
                print("The number of elements must be positive")
            else:
                break
        except ValueError:
            print("Enter a positive number")

    lst = []
    for i in range(size_list):
        while True:
            try:
                num = float(input(f"Enter element {i + 1} array: "))
                lst.append(num)
                break
            except ValueError:
                print("Enter a float number")
    return lst