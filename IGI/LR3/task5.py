from decorators import add_description
from sequence_initialization import input_list


def count_elements_in_range(lst,A,B):

    if B < A:
        A, B = B, A

    count = 0
    for num in lst:
        if A <= num <= B:
            count += 1
    return count

def sum_after_max(lst):
    if not lst:
        return 0
    
    max_index = lst.index(max(lst))
    if max_index == len(lst) - 1:
        return 0
    
    return sum(lst[max_index + 1:])


@add_description("Task5: 1. Finds the number of elements in a list lying in the range from A to B (where A and B are user-input parameters).\n\
        2. Calculates the sum of elements in the list located after the maximum element.")
def Task5():
    while True:
        lst = input_list()

        while True:
            try:
                A = float(input("Enter A: "))
                B = float(input("Enter B: "))
                break 
            except ValueError:
                print("Error: A and B must be numbers. Please enter again.")

        count = count_elements_in_range(lst, A, B)

        print(f"\nThe number of elements in the list lying in the range from {A} to {B}: {count}")

        sum_after_max_value = sum_after_max(lst)
        print(f"The sum of the elements of the list located after the maximum element: {sum_after_max_value}")

        print("Your list: ", lst)

        repeat = input("\nDo you want to perform the task again? (yes/no): ")
        if repeat.lower() != 'yes':
            break

