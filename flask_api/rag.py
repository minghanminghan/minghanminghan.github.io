#hugging face llama interaction

import transformers
import torch
from datasets import load_dataset

'''
model_id = "meta-llama/Meta-Llama-3-8B"

pipeline = transformers.pipeline(
    "text-generation", model=model_id, model_kwargs={"torch_dtype": torch.bfloat16}, device_map="auto"
)
pipeline("Hey how are you doing today?")
'''

#may use The Stack dataset bc The Pile is outdated (from site) and The Stack can be accessed without download (good for system+github)

# full dataset (file IDs only)
# dataset streaming (will only download the data as needed)
# Login using e.g. `huggingface-cli login` to access this dataset
ds = load_dataset("bigcode/the-stack-v2", streaming=True, split="train", encoding='utf-16') #encoding error
for sample in iter(ds): 
    print(sample) 