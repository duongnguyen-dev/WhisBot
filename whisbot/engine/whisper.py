import whisper
import torch

class Whisper:
    def __init__(self, device, model_name, audio) -> None:
        self.model = whisper.load_model(name=model_name, device=device)
        self.options = whisper.DecodingOptions(language="en", without_timestamps=True)
        self.audio = audio

    def audio_processing(self):
        audio = whisper.load_audio(self.audio)
        audio = whisper.pad_or_trim(audio)

        mel = whisper.log_mel_spectrogram(audio).to(self.model.device)
        return mel
        
    def language_detection(self, mel):
        # detect the spoken language
        _, probs = self.model.detect_language(mel)
        return probs
    
    def generate_text(self):
        mel = self.audio_processing()
        probs = self.language_detection(mel)
        self.language = max(probs, key=probs.get)
        # convert speech to texts
        fp16 = False if self.model.device == torch.device("cpu") else True
        # For decoding options, change fp16 to false if you run on CPU
        options = whisper.DecodingOptions(language=self.language, fp16 = fp16)
        result = whisper.decode(self.model, mel, options)

        return result