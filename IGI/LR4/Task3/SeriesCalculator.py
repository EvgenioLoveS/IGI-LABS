import math
import numpy as np
from scipy import stats



default_max_iterations = 500

class SeriesCalculator():
    def __init__(self):
        pass

    def ln_series(self, x, eps, max_iterations=default_max_iterations):
        """
        Function to compute the value of ln((x+1)/(x-1)) using power series expansion.
        """
        result = 0
        terms = []
        for n in range(max_iterations):
            term = 1 / ((2 * n + 1) * math.pow(x, 2 * n + 1))
            result += term
            terms.append(result * 2)
            if abs(term) < eps:
                break
        
        # Compute statistical parameters
        sequence = np.array(terms)
        mean = np.mean(sequence)
        median = np.median(sequence)
        if len(sequence) > 0:
            unique_values, counts = np.unique(sequence, return_counts=True)
            mode_index = np.argmax(counts)
            mode_value = unique_values[mode_index]
        else:
            mode_value = None

        variance = np.var(sequence)
        std_dev = np.std(sequence)

        return result * 2, n, terms, mean, median, mode_value, variance, std_dev
