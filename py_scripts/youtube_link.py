from pytube import YouTube, exceptions
import os
import sys
fuchsia = '\033[38;2;255;00;255m'  # color as hex #FF00FF
reset_color = '\033[92m'

args = str(sys.argv[1])
title = str(sys.argv[2])

local_download_path = "C:\\projects\\node\\venom\\ytMusic\\"

def searchLink(link,title):
    print("\n"+title+"\n")
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
        video_file = local_download_path+yt.title+'.mp4'
        print(video_file)
        isExisting = os.path.exists(new_file)
        os.rename(f'{out_file}',f'{new_file}') if(isExisting == False) else os.remove(f'{out_file}')    

#main function
if __name__ == '__main__':
    searchLink(args,title)