import openai
import sys
import os
import wget
from PIL import Image

openai.organization = "org-XY7tvMhByFMbnaHiVRXoQjab"
openai.api_key = os.getenv("OPENAI_API_KEY")

openai.Model.list()

# local_download_path = "C:\\Projects\\Node\\Venom"
user_query = sys.argv[1]


def Dalle(query):
        response = openai.Image.create(
            prompt=query,
            n=1,
            size="1024x1024"
        )
        img_url = response['data'][0]['url']
        wallpaper = wget.download(img_url)
        return wallpaper
        
Dalle(user_query)
sys.stdout.flush()