import openai
import sys
import os

openai.organization = "org-XY7tvMhByFMbnaHiVRXoQjab"
openai.api_key = os.getenv("OPENAI_API_KEY")

openai.Model.list()

start_sequence = "\nAI:"
restart_sequence = "\nHuman: "

local_download_path = "C:\\Users\\singh\\AppData\\Local\\OpenAIWallpaper"

user_query = sys.argv[1]


def Dalle(user_query):
        response = openai.Image.create(
            prompt=user_query,
            n=1,
            size="1024x1024"
        )
        img_url = response['data'][0]['url']
        sys.stdout.flush(img_url)

Dalle()