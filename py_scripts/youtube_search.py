from pytube import YouTube, exceptions
import os
from colorama import Fore
import sys
fuchsia = '\033[38;2;255;00;255m'  # color as hex #FF00FF
reset_color = '\033[92m'

args = str(sys.argv[1])
title = str(sys.argv[2])

local_download_path = "C:\\projects\\node\\venom\\ytMusic\\"

def searchLink(link,title):
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
        new_file = local_download_path+title+'.mp3'
        print(new_file)
        os.rename(out_file, new_file)

#main function
if __name__ == '__main__':
    searchLink(args,title)