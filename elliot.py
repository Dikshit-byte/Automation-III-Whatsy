import os
from pickletools import optimize
import pprint
from numpy import quantile
import openai
import wget
import pyperclip as pc
from pathlib import Path
from PIL import Image
import sys
import time
import os
import colorama
from colorama import Fore

openai.organization = "org-XY7tvMhByFMbnaHiVRXoQjab"
openai.api_key = os.getenv("OPENAI_API_KEY")
# openai.api_key = "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"
openai.Model.list()

start_sequence = "\nAI:"
restart_sequence = "\nHuman: "

local_download_path = "C:\\Users\\singh\\AppData\\Local\\OpenAIWallpaper"

# global errorhandling program


def errorHandling(param1, param2):
    while True:
        try:
            valid_inp = int(
                input("\nOut of this which option would you like to choose ? : "))
            if valid_inp >= param1 and valid_inp <= param2:
                return valid_inp
        except ValueError:
            print("Error! Enter an integer value!! You dumb🤬")
        except KeyboardInterrupt:
            print("OOPs feelin' like very strong keyboard stroke⌨️")
            raise Exception("Thanks for coming!!")


def Dalle():
    while (True):
        user_query = input(
            Fore.CYAN+"\nEnter any topic or query realted to the drawing you want : ")
        response = openai.Image.create(
            prompt=user_query,
            n=1,
            size="1024x1024"
        )
        img_url = response['data'][0]['url']
        wallpaper = wget.download(img_url, local_download_path)
        words = wallpaper.split("/")
        photo_path = "C:\\Users\\singh\\AppData\\Local\\OpenAIWallpaper\\" + \
            words[1]
        image = Image.open(photo_path)
        image.save(local_download_path+words[1], quality=45, optimize=True)
        image_path1 = "C:\\Users\\singh\\AppData\\Local\\OpenAIWallpaper\\" + \
            words[1]
        image = Image.open(image_path1)
        image.show()


def variation_img():
    image = Image.open(
            "C:\\Users\\singh\\AppData\\Local\\OpenAIWallpaper\\photo.png")
    new_img = image.resize((400, 400))
    new_img.save(local_download_path+'\\photo.png')
    response = openai.Image.create_variation(
    image=open(local_download_path+"\\photo.png", "rb"),
    n=1,
    size="1024x1024"
    )
    img_url = response['data'][0]['url']
    wallpaper = wget.download(img_url, local_download_path)
    words = wallpaper.split("/")
    photo_path = "C:\\Users\\singh\\AppData\\Local\\OpenAIWallpaper\\"+words[1]
    image = Image.open(photo_path)
    image.save(local_download_path+words[1], quality=45, optimize=True)
    image_path1 = "C:\\Users\\singh\\AppData\\Local\\OpenAIWallpaper\\"+words[1]
    image = Image.open(image_path1)
    image.show()

def codex_ai():
    while(True):
        prompts = input(Fore.GREEN+"\n\nEnter your query : ")
        response = openai.Completion.create(
        engine = 'davinci-codex',
        max_tokens=1024*2,
        prompt = prompts,
        temperature = 0, #risk taking ability, influencing creativity
        top_p=1.0, #Influencing sampling
        frequency_penalty=0.0, #Penalities for repeated tokens
        presence_penalty=0.0, #Penalities for new words
        stop=['#'] #when to stop generating stuff
        )
        result = response.choices[0].text
        for char in result:
            sys.stdout.write(Fore.MAGENTA+char)
            sys.stdout.flush()
            time.sleep(0.01)

def assistant_ai():
    while(True):
        prompt = input(Fore.RED+"\n\nAsk me anything : ")
        response = openai.Completion.create(
        model="text-davinci-003",
        prompt=prompt,
        temperature=0.9,
        max_tokens=1024,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0.6,
        stop=[" Human:", " AI:"]
        )
        result = response.choices[0].text
        for char in result: 
            sys.stdout.write(Fore.YELLOW+char)
            sys.stdout.flush()
            time.sleep(0.01)

if __name__ == '__main__':
    print("How would u like to surf my new project ?\n1.Text to Image (warning: model is too stupid for now )\n2.Image Variations\n3.Codex Api (kind of mysterious tool for code)\n4.Ask for anything (This one is kind of addictive)")

valid_inp_main = 0

# another local error handling for input validation
while True:
    try:
        valid_inp_main = int(
            input("\nOut of this which option would you like to choose ? : "))
        if valid_inp_main >= 1 and valid_inp_main <= 4:
            break
        else:
            print("Enter in range of [1,4]")
    except ValueError:
        print("Error! Enter an integer")

# switch cases as per response
match valid_inp_main:
    # It will call dalle function
    case 1:
        Dalle()
# It will call whole image variation function
    case 2:
        variation_img()
# It will call codex function
    case 3:
        codex_ai()
# It will call assistant function
    case 4:
        assistant_ai()