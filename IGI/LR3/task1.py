from decorators import add_description
import math

default_max_iterations = 500

def compute_factorial(n):
    """
    A function for calculating the factorial of the number n.
    """
    factorial = 1

    if n == 0:
        return factorial

    for i in range(1, n + 1):
        factorial *= i

    return factorial


def compute_power(base, exponent):
    """
    A function for raising the base number to exponent.
    """
    return base ** exponent


def ln_series(x, eps, max_iterations=default_max_iterations):
    """
    Function to compute the value of ln((x+1)/(x-1)) using power series expansion.
    """
    result = 0
    for n in range(max_iterations):
        term = 1 / ((2 * n + 1) * compute_power(x, 2 * n + 1))
        result += term
        if abs(term) < eps:
            break
    return result * 2, n

@add_description("Task1: Power Series Expansion of ln((x+1)/(x-1))")
def Task1():
    while True:
        try:
            x = float(input("Enter the value of the argument (x), where |x| > 1: "))
            eps = float(input("Enter the desired accuracy (eps): "))
            
            if abs(x) <= 1:
                print("The absolute value of x must be greater than 1.")
                continue
            if eps <= 0:
                print("Accuracy (eps) must be a positive number.")
                continue

            result, n = ln_series(x, eps)
            math_result = math.log((x + 1) / (x - 1))

            print("\nResults:")
            print(
                f"| x = {x} | n = {n} | F(x) = {result} | mathF = {math_result} | eps = {eps}")

            repeat = input("\nDo you want to perform the task again? (yes/no): ")
            if repeat.lower() != 'yes':
                break
        except ValueError:
            print("Invalid input. Please enter a valid number.")
            continue

