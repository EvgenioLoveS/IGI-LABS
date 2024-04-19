from Task1.Task1 import Task1
from Task2.Task2 import Task2
from Task3.Task3 import Task3
from Task4.Task4 import Task4
from Task5.Task5 import Task5


class Program:

    @staticmethod
    def Menu():
        while True:
            try:
                choice = int(input("\nEnter the number of the task you want to run (1-5), or '0' to exit: "))
                print()
                
                match choice:
                    case 0:
                        print("Exiting...")
                        break
                    case 1:
                        task1 = Task1()
                        task1.MenuTask1()
                    case 2:
                        task2 = Task2()
                        task2.MenuTask2()
                    case 3:
                        task3 = Task3()
                        task3.MenuTask3()
                    case 4:
                        task4 = Task4()
                        task4.MenuTask4()
                    case 5:
                        task5 = Task5()
                        task5.MenuTask5()
                    case _:
                        print("Incorrect input. Please enter a number between 0 and 5.")
            except ValueError:
                print("Incorrect input. Please enter a valid number.")

Program.Menu()
        