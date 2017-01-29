#Takes audio input from microphone and translates it into text

import speech_recognition as sr
import pyaudio
import wave
import sys
import requests
from collections import OrderedDict

app_id = "NMDPTRIAL_lavinia_lee_mail_mcgill_ca20170128155539"
app_key = "bb32a1622d2009f1c9e54fd377bad7ed963950b168cce4d9e41806c1d438633666833f574c24a61f9b60f689f72fd9a897a58d7116714afb8a50bc5e89"
uid = "n0trAnd0mHaHaHa11"

r = sr.Recognizer()

with sr.Microphone() as source:
    audio = r.listen(source)
try:
    print(r.recognize_google(audio)) #speech_recognition package
#    config = {'appId': app_id, 'appKey': app_key, 'id': uid}
#    info = "\nTransfer-Encoding:chunked\nContent-Type:audio/x-pcm;bit=16;rate=8000\nAccept: text/plain\nAccept-Language: en-US"
#    msg = requests.post("https://dictation.nuancemobility.net/NMDPAsrCmdServlet/dictation",
#            params = OrderedDict(sorted(config.items(), key=lambda t:t[0])), data=info, files=audio)
#    print(msg.text)
except:
    config = {'appId': app_id, 'appKey': app_key, 'id': uid, 'voice': "Samantha"}
    info = "\nContent-Type: text/plain\nAccept: audio/x-wav;codec=pcm;bit=16;rate=8000\n" + "I'm sorry, could you repeat that?"
    msg = requests.post("https://tts.nuancemobility.net:442/NMDPTTSCmdServlet/tts",
        params = OrderedDict(sorted(config.items(), key=lambda t:t[0])), data = info)
    wf = wave.open(msg.content, 'rb')
    data = wf.readframes(CHUNK)
    p = pyaudio.PyAudio()
    stream = p.open(format = p.get_format_from_width(wf.getsampwidth()),
        channels=wf.getnchannels(),
        rate=wf.getframerate(),
        output=True)
    while len(data) > 0:
        stream.write(data)
        data = wf.readframes(CHUNK)
    stream.stop_stream()
    stream.close()
    p.terminate()
