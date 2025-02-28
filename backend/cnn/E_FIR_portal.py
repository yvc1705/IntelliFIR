from fir_cnn2 import *
from fir_registration_lang import *
print("*****Welcome to E-FIR Portal*******")
def main():
    while True:
        print("\nChoose an option:")
        print("1. FIR Registration")
        print("2. IPC Section Allocation")
        print("3. Exit")

        choice = input("Enter your choice (1/2/3): ")

        if choice == "1":
            fir_registration()

        elif choice == "2":
            fir_cnn()
        elif choice == "3":
            print("Exiting...")
            break
        else:
            print("Invalid choice. Please enter a valid option.")

if __name__ == "__main__":
    main()

