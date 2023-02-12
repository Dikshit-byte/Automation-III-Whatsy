from pytube import YouTube, Search, exceptions
import os
from colorama import Fore
import sys

fuchsia = '\033[38;2;255;00;255m'  # color as hex #FF00FF
reset_color = '\033[92m'

# download single video in audio only

args = str(sys.argv[1])
local_download_path = "C:\\projects\\node\\venom\\ytMusic"

def singleLink_download_options(link):
    try:
        yt = YouTube(link)
    except exceptions.VideoUnavailable:
        print(f'Video{link} is unavailable, skipping.')
    except KeyboardInterrupt:
        print("OOPs feelin' like very strong keyboard stroke")
    else:
        print(f'\n' + fuchsia + 'Downloading: ',yt.title, '~ viewed', yt.views, 'times.')
        out_file = yt.streams.filter(only_audio=True).first().download(local_download_path)
        print(out_file)
        print(f'\nFinished downloading:  {yt.title}' + reset_color)
        base, ext = os.path.splitext(out_file)
        print(base)
        new_file = base + '.mp3'
        print(new_file)
        os.rename(out_file, new_file)

def searchLink(query):
    search_result = Search(query)
    print(f'Search complete \n')
    videoId = search_result.results[0].video_id
    link = "https://youtu.be/"+videoId
    singleLink_download_options(link)

#main function
if __name__ == '__main__':
    print("Started Downloading")
    searchLink(args)