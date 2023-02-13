from pytube import YouTube, exceptions
import os
from colorama import Fore
import sys
fuchsia = '\033[38;2;255;00;255m'  # color as hex #FF00FF
reset_color = '\033[92m'

# download single video in audio only

args = str(sys.argv[1])
title = str(sys.argv[2])

local_download_path = "C:\\projects\\node\\venom\\ytMusic\\"

def searchLink(link,title):
    print(title)
    try:
        yt = YouTube(link)
    except exceptions.VideoUnavailable:
        print(f'Video{link} is unavailable, skipping.')
    except KeyboardInterrupt:
        print("OOPs feelin' like very strong keyboard stroke")
    else:
        print(f'\n' + fuchsia + 'Downloading: ',yt.title, '~ viewed', yt.views, 'times.')
        out_file = yt.streams.filter(only_audio=True).first().download(local_download_path)
        # print(out_file)
        print(f'\nFinished downloading:  {yt.title}' + reset_color)
        # base, ext = os.path.splitext(out_file)
        new_file = local_download_path+title+'.mp3'
        print(new_file)
        isExisting = os.path.exists(new_file)
        if(isExisting == False):
            os.rename(out_file, new_file)
            # print(new_file)

#main function
if __name__ == '__main__':
    searchLink(args,title)