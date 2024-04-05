from task1 import Task1
from task2 import Task2
from task3 import Task3
from task4 import Task4
from task5 import Task5


def main():
    print("\n=== Lab work 3 'Python' ===")
    print(" Version: 1.0 ")
    print(" Developer: Zhgutov Evgeniy ")
    print(" Date of development: 01.04.2024\n")
    while True:
        try:
            choice = int(input("Enter the number of the task you want to run(1-5), or '0' to exit: "))
            if choice == 0:
                print("Exiting...")
                break
            elif 1 <= choice <= 5:
                match choice:
                    case 1:
                        Task1()
                    case 2:
                        Task2()
                    case 3:
                        Task3()
                    case 4:
                        Task4()
                    case 5:
                        Task5()
            else:
                print("Incorrect input. Please enter a number between 0 and 5.")
        except ValueError:
            print("Incorrect input. Please enter a valid number.")

if __name__ == "__main__":
    main()