import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import Embedding, Conv1D, GlobalMaxPooling1D, Dense
import numpy as np
import os
import sys
import tensorflow as tf

# Suppress TensorFlow logs
tf.get_logger().setLevel('ERROR')

def fir_cnn():
    # Step 1: Define file paths
    # Get the current directory of this script
    current_directory = os.path.dirname(os.path.abspath(__file__))
    
    # Define the Excel file path
    file_path = os.path.join(current_directory, 'new_Details.xlsx')

    # Define the model save path
    model_path = os.path.join(current_directory, 'fir_cnn_model.keras')

    # Step 2: Load FIR data from the Excel file
    fir_data = pd.read_excel(file_path)

    # Extract features (X) and labels (y)
    X = fir_data["FIR Text"]
    y_ipc = fir_data["Section"]

    # Step 3: Preprocess the FIR data
    encoder_ipc = LabelEncoder()
    y_ipc_encoded = encoder_ipc.fit_transform(y_ipc)

    tokenizer = Tokenizer(num_words=1000)
    tokenizer.fit_on_texts(X)
    X_sequences = tokenizer.texts_to_sequences(X)
    X_padded = pad_sequences(X_sequences, maxlen=100)

    # Split data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X_padded, y_ipc_encoded, test_size=0.2, random_state=42)

    # Step 4: Train a CNN model (or load a pre-trained model if it exists)
    if os.path.exists(model_path):
        # Load the pre-trained model
        model = load_model(model_path)
        # print("Loaded pre-trained model.")
    else:
        # Build the CNN model
        model = Sequential()
        model.add(Embedding(input_dim=1000, output_dim=100))
        model.add(Conv1D(128, 5, activation='relu'))
        model.add(GlobalMaxPooling1D())
        model.add(Dense(64, activation='relu'))
        model.add(Dense(len(encoder_ipc.classes_), activation='softmax'))  # Softmax for multi-class classification

        # Compile the model
        model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

        # Train the model
        model.fit(X_train, y_train, epochs=10, batch_size=64, validation_data=(X_test, y_test))

        # Ensure the directory exists for saving the model
        os.makedirs(os.path.dirname(model_path), exist_ok=True)

        # Save the trained model
        model.save(model_path)
        # print("Model trained and saved.")

    # Step 5: Predict IPC section for a new complaint
    if len(sys.argv) > 1:
        new_complaint = sys.argv[1]  # Get the complaint text from the command line arguments
    else:
        # print("No complaint text provided!")
        sys.exit(1)

    # Preprocess the new complaint
    new_complaint_sequence = tokenizer.texts_to_sequences([new_complaint])
    new_complaint_padded = pad_sequences(new_complaint_sequence, maxlen=100)

    # Predict the IPC section
    predicted_ipc_probs = model.predict(new_complaint_padded, verbose=0)  # Set verbose to 0 to suppress logs
    predicted_ipc_index = np.argmax(predicted_ipc_probs)
    predicted_ipc_section = encoder_ipc.inverse_transform([predicted_ipc_index])[0]

    # Display the predicted IPC section
    print(predicted_ipc_section)

# Run the function
if __name__ == "__main__":
    fir_cnn()
