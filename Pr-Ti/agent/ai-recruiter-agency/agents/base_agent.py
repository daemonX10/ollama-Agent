from typing import Dict,Any
import json
from openai import OpenAI

class BaseAgent:
    def __init__(self,name:str,instructions:str):
        self.name = name
        self.insturctions = 
        instructions
        self.ollama_client = OpenAI(
            base_url="http://localhost:11434/v1",
            model="llama2",
        )
    
    async def run(self,messages:list)->Dict[str,Any]:
        raise NotImplementedError("Subclasses must implement run() method")
    
    def _query_ollama(self,prompt:str)->str:
        try:
            response = self.ollama_client.chat.completions.create(
                messages=[
                    {"role":"system", "content": self.insturctions},
                    {"role":"user","content": prompt}
                ],
                temperature=0.7,
                max_tokens = 2000,
            )
            return response.choices[0].message.content
        except Exception as e:
            print(f"Error querying Ollama: {e}")
            raise
        
    def _parse_json_safely(self,text:str)->Dict[str,Any]:
        try:
           strart = text.find("{")
           end = text.rfind("}")
           if strart == -1 or end == -1:
               raise ValueError("No JSON object found in the text")
           json_str = text[strart:end+1]
           return json.loads(json_str)
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON: {e}")
            raise