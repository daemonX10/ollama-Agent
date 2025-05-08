from typing import Any, Dict, List, Optional
from .base_agent import BaseAgent

class AnalyzerAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name ="Analyzer",
            instructions = """
            Analyze the candidate profile and extract :
            1. Technical skills (as a list)
            2. Years of experience (as a number)
            3. Education Level
            4. Experience Level (Junior,Mid,Senior)
            5. Key Achievements
            6. Domain expertise
            
            formate the output as structured data.""",
        )
        
    async def run(self,messages:list) -> Dict[str,Any]:
        print("analyzer : Analyzing the candidate profile...")
        
        extracted_data = eval(messages[-1]['content'])