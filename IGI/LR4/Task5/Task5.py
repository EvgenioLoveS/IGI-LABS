import numpy as np
from Task5.MaxtrixOperations import MatrixOperations
from repeat import should_repeat


class Task5():
    @staticmethod
    def MenuTask5():
        while True: 
            n = 4
            m = 5
            B = 50
            matrix_ops = MatrixOperations(n, m)
            matrix_ops.generate_matrix()

            print("Generated Matrix:")
            print(matrix_ops.matrix)
            print()

            C, count_elements = matrix_ops.find_elements_above_abs(B)
            print("Number of elements exceeding absolute value", B, ":", count_elements)
            print("Elements exceeding absolute value", B, ":")
            print(C)
            print()

            median_C = matrix_ops.calculate_median(C)
            print("Median of array C (using custom method):", median_C)
            print("Median of array C (using np.median):", np.median(C))
            print()

            print("Mean of matrix A:", matrix_ops.mean())
            print("Median of matrix A:", matrix_ops.median())
            print("Correlation coefficient matrix of matrix A:")
            print(matrix_ops.corrcoef())
            print("Variance of matrix A:", matrix_ops.variance())
            print("Standard deviation of matrix A:", matrix_ops.std_deviation())

            if not should_repeat():
                break

