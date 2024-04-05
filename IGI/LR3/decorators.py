def add_description(description: str):
    """Decorator that prints a description before running the decorated function."""
    def wrapper(func):
        def wrapped(*args, **kwargs):
            print()
            print("-" * 40)
            print(description)
            print()
            func(*args, **kwargs)
            print("-" * 40)
            print()
        return wrapped
    return wrapper