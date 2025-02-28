import datetime
import random
import speech_recognition as sr
import pandas as pd

# Function to choose complaint language
def choose_language():
    print("Choose Complaint language:")
    print("1. Hindi")
    print("2. Tamil")
    print("3. English")
    language_choice = input("Enter your choice (1/2/3): ")
    language_dict = {'1': 'hi', '2': 'ta', '3': 'en'}
    return language_dict.get(language_choice, 'en')

# Function to ask user details
def get_user_details():
    print("Please provide your details:")
    name = input("Name: ")
    age = input("Age: ")
    mobile_number = input("Mobile Number: ")
    address = input("Address: ")
    aadhar_number = input("Aadhar Number: ")
    return name, age, mobile_number, address, aadhar_number

# Function to register a complaint
def register_complaint():
    print("Do you want to register a complaint? (y/n)")
    choice = input().lower()
    if choice == 'y':
        # Choose language
        language = choose_language()
        
        print("Please speak your complaint:")
        print("Listening...")
        recognizer = sr.Recognizer()
        with sr.Microphone() as source:
            audio_data = recognizer.listen(source)
            print("Processing...")
            try:
                # Recognize speech in the chosen language
                complaint_text = recognizer.recognize_google(audio_data, language=language)
                print("Complaint recorded successfully.")
                return complaint_text
            except sr.UnknownValueError:
                print("Sorry, could not understand the audio.")
                return None
            except sr.RequestError:
                print("Could not request results. Please check your internet connection.")
                return None
    else:
        print("No complaint registered.")
        return None

# Function to generate FIR ID
def generate_fir_id():
    current_date = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    random_digits = ''.join(random.choices('0123456789', k=4))
    return f"FIR{current_date}{random_digits}"

# Function to display FIR details
def display_fir_details(name, age, mobile_number, address, aadhar_number, complaint_text, fir_id, date):
    print("\n------- FIR Registration Preview -------")
    print(f"FIR ID: {fir_id}")
    print(f"Date: {date}")
    print(f"Name: {name}")
    print(f"Age: {age}")
    print(f"Mobile Number: {mobile_number}")
    print(f"Address: {address}")
    print(f"Aadhar Number: {aadhar_number}")
    print("Complaint:")
    print(complaint_text)
    print("---------------------------------------")

# Function to save FIR details to Excel
def save_fir_to_excel(fir_data):
    fir_data.to_excel("B:/Resume Projects/FIR Detection System/fir_database.xlsx", index=False)

# Main FIR registration process
def fir_registration():
    # Step 1: Get user details
    name, age, mobile_number, address, aadhar_number = get_user_details()

    # Step 2: Register a complaint
    complaint_text = register_complaint()

    if complaint_text is not None:
        # Step 3: Generate FIR ID
        fir_id = generate_fir_id()

        # Step 4: Get current date
        current_date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        # Step 5: Display FIR details
        display_fir_details(name, age, mobile_number, address, aadhar_number, complaint_text, fir_id, current_date)

        # Step 6: Save FIR details to Excel
        print("\nDo you want to save the complaint? (y/n)")
        choice = input().lower()
        if choice == 'y':
            fir_data = pd.DataFrame({
                'Name': [name],
                'Age': [age],
                'Mobile Number': [mobile_number],
                'Address': [address],
                'Aadhar Number': [aadhar_number],
                'Complaint': [complaint_text],
                'FIR ID': [fir_id],
                'Date': [current_date]
            })
            
            # Read existing FIR data from Excel file if it exists, otherwise create an empty DataFrame
            try:
                existing_fir_data = pd.read_excel("B:/Resume Projects/FIR Detection System/fir_database.xlsx")
            except FileNotFoundError:
                existing_fir_data = pd.DataFrame(columns=["Name", "Age", "Mobile Number", "Address", "Aadhar Number", "Complaint", "FIR ID", "Date"])

            # Concatenate the new FIR data with existing FIR data
            combined_fir_data = pd.concat([existing_fir_data, fir_data], ignore_index=True)
        
            # Save combined FIR data to Excel
            save_fir_to_excel(combined_fir_data)
            # store in database
            
        
            print("Thanks for registering your complaint.")
        else:
            print("Retry registration")
    else:
        print("Retry registration.")


