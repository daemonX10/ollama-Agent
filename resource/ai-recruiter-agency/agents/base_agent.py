from typing import Dict, Any
import json
from openai import OpenAI


class BaseAgent:
    def __init__(self, name: str, instructions: str):
        self.name = name
        self.instructions = instructions
        self.ollama_client = OpenAI(
            base_url="http://localhost:11434/v1",
            api_key="ollama",  # required but unused
        )

    async def run(self, messages: list) -> Dict[str, Any]:
        """Default run method to be overridden by child classes"""
        raise NotImplementedError("Subclasses must implement run()")

    def _query_ollama(self, prompt: str) -> str:
        """Query Ollama model with the given prompt"""
        try:
            response = self.ollama_client.chat.completions.create(
                model="llama3.2",  # Updated to llama3.2
                messages=[
                    {"role": "system", "content": self.instructions},
                    {"role": "user", "content": prompt},
                ],
                temperature=0.7,
                max_tokens=2000,
            )
            return response.choices[0].message.content
        except Exception as e:
            print(f"Error querying Ollama: {str(e)}")
            raise

    def _parse_json_safely(self, text: str) -> Dict[str, Any]:
        """Safely parse JSON from text, handling potential errors"""
        try:
            # Remove <think> sections
            if '<think>' in response_text and '</think>' in response_text:
                think_start = response_text.find('<think>')
                think_end = response_text.find('</think>') + len('</think>')
                response_text = response_text[:think_start] + response_text[think_end:]
                
            # Extract JSON if present
            json_start = response_text.find('{')
            json_end = response_text.rfind('}') + 1
            
            if json_start != -1 and json_end != -1:
                json_str = response_text[json_start:json_end]
                try:
                    return json.loads(json_str)
                except json.JSONDecodeError:
                    return {"error": "Could not parse JSON", "raw_content": response_text.strip()}
            
            return {"content": response_text.strip()}
        except json.JSONDecodeError:
            return {"error": "Invalid JSON content"}
