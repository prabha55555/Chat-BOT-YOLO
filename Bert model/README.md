# ChatBot with BERT, GPT-2, and YOLO Integration

This project is a Flask-based chatbot that integrates BERT for intent classification, GPT-2 for generating responses, and YOLOv5 for object detection in images. The chatbot can handle text inputs and image uploads, providing responses based on the detected objects and user queries.

## Features

- **BERT**: Used for classifying the user's intent based on the input message.
- **GPT-2**: Generates responses based on the classified intent.
- **YOLOv5**: Detects objects in uploaded images and integrates the results into the chatbot's responses.
- **Rule-Based System**: Simple rules to handle specific queries related to detected objects (e.g., asking about the color of detected objects).


## Project Link
You can view the project [here](https://drive.google.com/file/d/13LDJhfyJCAldd9nWiHMrDlBjM1EEmh1I/view?usp=drivesdk).


## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Python 3.7 or higher
- Pip package manager
- Virtual environment tool (optional but recommended)

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/chatbot-bert-gpt2-yolo.git
    cd chatbot-bert-gpt2-yolo
    ```

2. **Create and activate a virtual environment (optional but recommended):**

    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3. **Install the required dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

4. **Download the necessary models:**

    - YOLOv5: Place the `yolov5s.pt` model in the project directory.
    - BERT and GPT-2 models will be automatically downloaded when you run the application for the first time.

## Usage

1. **Run the Flask application:**

    ```bash
    python app.py
    ```

2. **Access the Chatbot UI:**

    - The Flask server will run on `http://localhost:5000`.
    - Use a client (like Postman) or a simple web front-end to interact with the chatbot.

## API Endpoints

- **POST /chat**

    This endpoint handles text and image inputs. The request format can either be a JSON object with a `message` key for text input or a form-data request with an `image` file.

    - **Request with Text:**

      ```json
      {
          "message": "What is the color of the car?"
      }
      ```

    - **Request with Image:**

      Use a form-data request where the image is uploaded with the key `image`.

    - **Response:**

      ```json
      {
          "response": "I detected the following objects: car, person."
      }
      ```

## Customization

You can customize the chatbot's behavior by modifying the following:

- **Intent Classification**: Update the BERT model or fine-tune it for specific intents.
- **Response Generation**: Modify the GPT-2 response generation logic for different intents.
- **Object Detection**: Customize the YOLOv5 model or change the confidence thresholds.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you find a bug or have a feature request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
