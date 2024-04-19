
from .GeometricFigure import SquareWithTriangle
from repeat import should_repeat



class Task4:
    @staticmethod
    def MenuTask4():
        """Endless loop demonstrating the process of creating a square with a triangle."""
        while True:
            try:
                name = input("Enter the name of the figure: ")
                side_length = float(input("Enter the length of the square side and triangle: "))
                color = input("Enter the color of the square ('red', 'blue', '#FFA500', etc.): ")

                if side_length <= 0:
                    raise ValueError("The length must be a positive number.")

                figure = SquareWithTriangle(name, side_length, color)
                print(figure)
                figure.draw()

                if not should_repeat():
                    break
            except ValueError as e:
                print(f"Error: {e}. Please enter valid data.")
