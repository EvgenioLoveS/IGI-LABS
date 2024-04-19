import math
import numpy as np
from .SeriesCalculator import SeriesCalculator
import matplotlib.pyplot as plt
from repeat import should_repeat

class Task3():
    @staticmethod
    def MenuTask3():
        calculator = SeriesCalculator()
        while True:
            x = float(input("Enter the value of the argument (x), where |x| > 1: "))
            eps = float(input("Enter the desired accuracy (eps): "))
            
            if abs(x) <= 1:
                print("The absolute value of x must be greater than 1.")
                continue
            if eps <= 0:
                print("Accuracy (eps) must be a positive number.")
                continue

            result, n, terms, mean, median, mode, variance, std_dev = calculator.ln_series(x, eps)

            math_result = math.log((x + 1) / (x - 1))

            print("\nResults:")
            print(f"| x = {x} | n = {n} | F(x) = {result} | mathF = {math_result} | eps = {eps}")
            print(f"Mean: {mean:.4f}")
            print(f"Median: {median:.4f}")
            print(f"Mode: {mode:.4f}")
            print(f"Variance: {variance:.4f}")
            print(f"Standard Deviation: {std_dev:.4f}")

            # Generate x values for plotting
            x_values = np.linspace(1.1, x, 100)
            series_values = [calculator.ln_series(val, eps)[0] for val in x_values]
            math_function_values = [math.log((val + 1) / (val - 1)) for val in x_values]

            save_path = "Task3/plot_comparison.png"
            # Plotting graphs
            Task3.plot_graphs(x_values, series_values, math_function_values, save_path)

            if not should_repeat():
                break

    @staticmethod
    def plot_graphs(x_values, series_values, math_function_values, save_path = None):
        plt.figure(figsize=(10, 6))
        plt.plot(x_values, series_values, label='Series Expansion', color='blue', marker='o')
        plt.plot(x_values, math_function_values, label='Math Function', color='red', linestyle='--')
        plt.xlabel('Argument (x)')
        plt.ylabel('Function Value (f(x))')
        plt.title('Comparison of Series Expansion and Math Function')
        plt.legend()
        plt.grid(True)
        
        # Annotate with text
        plt.text(x_values[-1], series_values[-1], f'Series: {series_values[-1]:.4f}', fontsize=15, ha='right', va='bottom')
        plt.text(x_values[-1], math_function_values[-1], f'Math: {math_function_values[-1]:.4f}', fontsize=15, ha='right', va = 'top')
        
        # Add annotation
        plt.annotate('Intersection', xy=(0, 0), xytext=(0.5, 0.5),
                     arrowprops=dict(facecolor='black', shrink=0.05))
        
        if save_path:
            plt.savefig(save_path)
            print(f"Plot saved successfully at: {save_path}")
        else:
            plt.show()