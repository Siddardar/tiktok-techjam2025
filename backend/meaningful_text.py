from transformers import GPT2LMHeadModel, GPT2TokenizerFast
import torch
import math

class GibberishDetector:
    def __init__(self):
        self.model = GPT2LMHeadModel.from_pretrained("gpt2")
        self.tokenizer = GPT2TokenizerFast.from_pretrained("gpt2")
        self.tokenizer.pad_token = self.tokenizer.eos_token  # Set pad token
        self.model.eval()
    
    def get_perplexity(self, text):
        if len(text.strip()) < 3:
            return float('inf')
        
        # Tokenize with correct parameters
        inputs = self.tokenizer(
            text, 
            return_tensors="pt", 
            truncation=True,  # Changed from 'truncate'
            max_length=512,
            padding=True
        )
        
        with torch.no_grad():
            outputs = self.model(**inputs, labels=inputs["input_ids"])
            loss = outputs.loss
            perplexity = math.exp(loss.item())
        
        return perplexity
    
    def is_meaningful(self, text, threshold=150):
        """
        Returns True if text is meaningful, False if gibberish
        Lower threshold = stricter detection
        """
        perplexity = self.get_perplexity(text)
        return perplexity < threshold