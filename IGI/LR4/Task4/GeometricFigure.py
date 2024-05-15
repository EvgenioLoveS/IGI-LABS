import math
import matplotlib.pyplot as plt
from abc import ABC, abstractmethod


# class Color:
#     def __init__(self, color):
#         """Initialize color."""
#         self._color = color

#     @property
#     def color(self):
#         """Getter for color."""
#         return self._color

#     @color.setter
#     def color(self, new_color):
#         """Setter for color."""
#         self._color = new_color

#     def __str__(self):
#         """String representation of Color object."""
#         return self._color

# class GeometricFigure(ABC):
#     @abstractmethod
#     def area(self):
#         """Abstract method for calculating area."""
#         pass

# class SquareWithTriangle(GeometricFigure):
#     def __init__(self, name, side_length, color):
#         """Initialize square with embedded triangle."""
#         self._name = name
#         self.color = Color(color)
#         self.side_length = side_length

#     @property
#     def name(self):
#         """Getter for name."""
#         return self._name

#     @name.setter
#     def name(self, new_name):
#         """Setter for name."""
#         self._name = new_name

#     def area(self):
#         """Calculate the area of the square."""
#         return self.side_length ** 2

#     def __str__(self):
#         """Formatted string representation of the figure."""
#         return "Name: {}\nColor: {}\nArea: {:.2f}".format(self.name, self.color, self.area())

#     def draw(self):
#         """Draw the square with triangle and save the image."""
#         fig, ax = plt.subplots()

#         # Draw the square
#         square_coords = [(0, 0), (self.side_length, 0), (self.side_length, self.side_length), (0, self.side_length), (0, 0)]
#         ax.plot(*zip(*square_coords), label='Square')

#         # Draw the equilateral triangle
#         triangle_coords = [(self.side_length/2, 0), (self.side_length, math.sqrt(3) * self.side_length / 2), (0, math.sqrt(3) * self.side_length / 2), (self.side_length/2, 0)]
#         ax.plot(*zip(*triangle_coords), label='Equilateral Triangle')

#         plt.fill(*zip(*triangle_coords), color = self.color.color , alpha=0.3)  # Fill the triangle
#         plt.fill(*zip(*square_coords), color = self.color.color , alpha=0.3)    # Fill the square

#         ax.set_aspect('equal', adjustable='box')
#         ax.set_title(f"{self.name}, Total Area: {self.area()}")
#         plt.legend()

#         # Save the image to 'figure.png' in the current directory
#         plt.savefig('Task4/Figure.png')

#         # Display the image
#         plt.show()


class NameMixin:
    def __init__(self, name):
        """Initialize name."""
        self._name = name

    @property
    def name(self):
        """Getter for name."""
        return self._name

    @name.setter
    def name(self, new_name):
        """Setter for name."""
        self._name = new_name

class Color:
    def __init__(self, color):
        """Initialize color."""
        self._color = color

    @property
    def color(self):
        """Getter for color."""
        return self._color

    @color.setter
    def color(self, new_color):
        """Setter for color."""
        self._color = new_color

    def __str__(self):
        """String representation of Color object."""
        return self._color

class GeometricFigure(ABC):
    @abstractmethod
    def area(self):
        """Abstract method for calculating area."""
        pass

class SquareWithTriangle(GeometricFigure, NameMixin):
    def __init__(self, name, side_length, color):
        """Initialize square with embedded triangle."""
        NameMixin.__init__(self, name)
        self.color = Color(color)
        self.side_length = side_length

    def area(self):
        """Calculate the area of the square."""
        return self.side_length ** 2

    def __str__(self):
        """Formatted string representation of the figure."""
        return "Name: {}\nColor: {}\nArea: {:.2f}".format(self.name, self.color, self.area())

    def draw(self):
        """Draw the square with triangle and save the image."""
        fig, ax = plt.subplots()

        # Draw the square
        square_coords = [(0, 0), (self.side_length, 0), (self.side_length, self.side_length), (0, self.side_length), (0, 0)]
        ax.plot(*zip(*square_coords), label='Square')

        # Draw the equilateral triangle
        triangle_coords = [(self.side_length/2, 0), (self.side_length, math.sqrt(3) * self.side_length / 2), (0, math.sqrt(3) * self.side_length / 2), (self.side_length/2, 0)]
        ax.plot(*zip(*triangle_coords), label='Equilateral Triangle')

        plt.fill(*zip(*triangle_coords), color=self.color.color, alpha=0.3)  # Fill the triangle
        plt.fill(*zip(*square_coords), color=self.color.color, alpha=0.3)    # Fill the square

        ax.set_aspect('equal', adjustable='box')
        ax.set_title(f"{self.name}, Total Area: {self.area()}")
        plt.legend()

        # Save the image to 'figure.png' in the current directory
        plt.savefig('Task4/Figure.png')

        # Display the image
        plt.show()