from transformers import GPT2LMHeadModel, GPT2Tokenizer
import torch
import requests

# Initialize the tokenizer and model from Hugging Face
model_name = "gpt2-medium"  # You can change this to another model, like 'gpt3.5'
tokenizer = GPT2Tokenizer.from_pretrained(model_name)
model = GPT2LMHeadModel.from_pretrained(model_name)

def generate_text(prompt):
    # Tokenize the input text
    inputs = tokenizer.encode(prompt, return_tensors="pt")

    # Create attention mask
    attention_mask = torch.ones(inputs.shape, dtype=torch.long)

    # Generate text with attention mask and pad token ID set
    outputs = model.generate(
        inputs, 
        attention_mask=attention_mask, 
        max_length=100, 
        num_return_sequences=1,
        pad_token_id=tokenizer.eos_token_id  # Set pad_token_id to eos_token_id
    )

    # Decode the generated text
    generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return generated_text

if __name__ == "__main__":
    prompt = "Please select events from this list: Food Festival, Charity Drive, Therapy Dogs. Recommend these events based these liked events: Food Market, Cat Show.\n I selected these 3 events:"
    generated_text = generate_text(prompt)
    
    # Print the generated text to stdout
    print(generated_text)
    
    # Send the generated text to a JavaScript function via an HTTP request
    response = requests.post('http://localhost:5001/receive', json={'generated_text': generated_text})
    print(f"Response from server: {response.status_code}")
