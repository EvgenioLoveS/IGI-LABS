from .TextOperator import TextOperator



class Task2():
    @staticmethod
    def MenuTask2():
        text_op = TextOperator()

        with open('Task2/Text.txt', 'r') as file:
            text = file.read()
            text_op.text = text
        
        text_op.execute_main_analysis()
        text_op.execute_additional_analysis()

        print("Задачи выполнены. Результаты сохранены в файлы Task2Results.txt и Task2Results.zip.")