mkdir models

echo "Downloading llama-2-7b-chat.Q4_0.gguf model..."
wget -O models/llama-2-7b-chat.Q4_0.gguf https://huggingface.co/TheBloke/Llama-2-7B-Chat-GGUF/resolve/main/llama-2-7b-chat.Q4_0.gguf?download=true

echo "Downloading Whisper models"
bash scripts/download-whisper-models.sh base.pt