import numpy as np


class MatrixOperations:
    def __init__(self, n, m):
        """
        Initialize MatrixOperations with matrix dimensions n x m.
        """
        self.n = n
        self.m = m
        self.matrix = None

    def generate_matrix(self):
        """
        Generate a random matrix of size n x m with integer values.
        """
        self.matrix = np.random.randint(0, 100, size=(self.n, self.m))

    def find_elements_above_abs(self, B):
        """
        Find elements in the matrix exceeding the absolute value of B.
        Return these elements in an array C and count the number of such elements.
        """
        if self.matrix is None:
            print("Matrix not generated. Please call generate_matrix() first.")
            return None, 0
        
        mask = np.abs(self.matrix) > B
        C = self.matrix[mask]
        count_elements = len(C)
        return C, count_elements

    def calculate_median(self, array):
        """
        Calculate the median of the given array.
        """
        if array is None or len(array) == 0:
            return None
        
        sorted_array = np.sort(array)
        n = len(sorted_array)
        if n % 2 == 1:
            median = sorted_array[n // 2]
        else:
            median = (sorted_array[n // 2 - 1] + sorted_array[n // 2]) / 2
        return median

    def mean(self):
        """
        Compute the mean of all elements in the matrix.
        """
        if self.matrix is None:
            print("Matrix not generated. Please call generate_matrix() first.")
            return None
        
        return np.mean(self.matrix)

    def median(self):
        """
        Compute the median of all elements in the matrix.
        """
        if self.matrix is None:
            print("Matrix not generated. Please call generate_matrix() first.")
            return None
        
        return np.median(self.matrix)

    def corrcoef(self):
        """
        Compute the correlation coefficient matrix of the matrix.
        """
        if self.matrix is None:
            print("Matrix not generated. Please call generate_matrix() first.")
            return None
        
        return np.corrcoef(self.matrix)

    def variance(self):
        """
        Compute the variance (dispersion) of all elements in the matrix.
        """
        if self.matrix is None:
            print("Matrix not generated. Please call generate_matrix() first.")
            return None
        
        return np.var(self.matrix)

    def std_deviation(self):
        """
        Compute the standard deviation of all elements in the matrix.
        """
        if self.matrix is None:
            print("Matrix not generated. Please call generate_matrix() first.")
            return None
        
        return np.std(self.matrix)