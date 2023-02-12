from pytube import YouTube, Playlist, Channel, Search, exceptions
import os
import youtube_dl
from youtubesearchpython import ChannelsSearch
from pathlib import Path
import colorama
from colorama import Fore

local_download_path = str(Path.home()/"Downloads")
local_music_path = str(Path.home()/"Music")
fuchsia = '\033[38;2;255;00;255m'  # color as hex #FF00FF
reset_color = '\033[92m'

#global errorhandling program
def errorHandling(param1, param2):
    while True:
        try:
            valid_inp = int(input("\nOut of this which option would you like to choose ? : "))
            if valid_inp >= param1 and valid_inp <= param2:
                return valid_inp
        except ValueError:
            print("Error! Enter an integer value!! You fkin' dump asshole🤬")
        except KeyboardInterrupt:
            print("OOPs feelin' like very strong keyboard stroke⌨️")
            raise Exception("Thanks for coming!!")

#download video program with help of link
def singleLink_download_option(answer,link):
            match answer:
                case 1:
                    try:
                        yt = YouTube(link)
                    except exceptions.VideoUnavailable:
                        print(f'Video {link} is unavaialable, skipping.')
                    except KeyboardInterrupt:
                        print("OOPs feelin' like very strong keyboard stroke⌨️")
                    else:
                        print(f'\n' + fuchsia + 'Downloading: ',
                      yt.title, '~ viewed', yt.views, 'times.')
                        yt.streams.filter(
                    file_extension='mp4').get_highest_resolution().download(local_download_path)
                        print(f'\nFinished downloading:  {yt.title}' + reset_color)
                case 2:
                    try:
                        yt = YouTube(link)
                    except exceptions.VideoUnavailable:
                        print(f'Video {link} is unavaialable, skipping.')
                    except KeyboardInterrupt:
                        print("OOPs feelin' like very strong keyboard stroke⌨️")
                    else:
                        print(f'\n' + fuchsia + 'Downloading: ',
                      yt.title, '~ viewed', yt.views, 'times.')
                        yt.streams.filter(
                file_extension='mp4').get_lowest_resolution().download(local_download_path)
                        print(f'\nFinished downloading:  {yt.title}' + reset_color)
                case 3:
                    try:
                        yt = YouTube(link)
                    except exceptions.VideoUnavailable:
                        print(f'Video {link} is unavaialable, skipping.')
                    except KeyboardInterrupt:
                        print("OOPs feelin' like very strong keyboard stroke⌨️")
                    else:
                        print(f'\n' + fuchsia + 'Downloading: ',
                      yt.title, '~ viewed', yt.views, 'times.')
                    out_file = yt.streams.filter(only_audio=True).first().download(local_music_path)
                    print(f'\nFinished downloading:  {yt.title}' + reset_color)
                    base, ext = os.path.splitext(out_file)
                    new_file = base + '.mp3'
                    os.rename(out_file, new_file)


#download single video with the help of provided link
def singleLink():
    link = input("Enter link of video : ")
    try:
        yt = YouTube(link)
    except exceptions.VideoUnavailable:
        print(f'Video {link} is unavaialable, skipping.')
    except KeyboardInterrupt:
        print("OOPs feelin' like very strong keyboard stroke⌨️")
    else:
        print(Fore.LIGHTMAGENTA_EX+yt.title)
    print(Fore.LIGHTYELLOW_EX+"\nEnter 1 to download all videos at high resolution ⚡\n",
          "Enter 2 to download all videos in low resolution 🐽\n", "Enter 3 to download audio 🎶\n")
    user_response = errorHandling(1, 3)
    singleLink_download_option(user_response,link)

#download single video with user search query
def searchLink():
    search_result = Search(input("Enter your search : "))
    print(f'Search complete \n')
    videoId = search_result.results[0].video_id
    link = "https://youtu.be/"+videoId
    try:
        yt = YouTube(link)
    except exceptions.VideoUnavailable:
        print(f'Video {link} is unavaialable, skipping.')
    except KeyboardInterrupt:
        print("OOPs feelin' like very strong keyboard stroke⌨️")
    else:
        print(Fore.GREEN+yt.title)

    print(Fore.LIGHTGREEN_EX+"\nEnter 1 to download all videos at high resolution ⚡\n",
          "Enter 2 to download all videos in low resolution 🐽\n", "Enter 3 to download audio 🎶\n")
    user_response = errorHandling(1, 3)
    singleLink_download_option(user_response,link)

#download all videos of a playlist with link 
def playlist():
    url = input("Enter URL of Playlist : ")
    pl = Playlist(url)
    print("\nEnter 1 to see the titles of playlist and videos of it 📽️\n", "Enter 2 to download all videos at high resolution ⚡\n",
          "Enter 3 to download all videos in low resolution 🐽\n", "Enter 4 to download just audio of whole playlist 😁")
    answer = errorHandling(1, 4)
    match answer:
        case 1:
            print(pl.title)
            for video in pl.videos:
                print(f'Title : {video.title}')
            for url in pl.video_urls:
                print(url)
        case 2:
            for url in pl.video_urls:
                try:
                    yt = YouTube(url)
                except exceptions.VideoUnavailable:
                    print(f'Video {url} is unavaialable, skipping.')
                except KeyboardInterrupt:
                    print("OOPs feelin' like very strong keyboard stroke⌨️")
                else:
                    print(f'\n' + fuchsia + 'Downloading: ',
                          yt.title, '~ viewed', yt.views, 'times.')
                    yt.streams.filter(
                        file_extension='mp4').get_highest_resolution().download(local_download_path)
                    print(f'\nFinished downloading:  {yt.title}' + reset_color)
        case 3:
            for url in pl.video_urls:
                try:
                    yt = YouTube(url)
                except exceptions.VideoUnavailable:
                    print(f'Video {url} is unavaialable, skipping.')
                except KeyboardInterrupt:
                    print("OOPs feelin' like very strong keyboard stroke⌨️")
                else:
                    print(f'\n' + fuchsia + 'Downloading: ',
                          yt.title, '~ viewed', yt.views, 'times.')
                yt.streams.filter(
                    file_extension='mp4').get_lowest_resolution().download(local_download_path)
                print(f'\nFinished downloading:  {yt.title}' + reset_color)
        case 4:
            for url in pl.video_urls:
                try:
                    yt = YouTube(url)
                except exceptions.VideoUnavailable:
                    print(f'Video {url} is unavaialable, skipping.')
                except KeyboardInterrupt:
                    print("OOPs feelin' like very strong keyboard stroke⌨️")
                else:
                    print(f'\n' + fuchsia + 'Downloading: ',
                          yt.title, '~ viewed', yt.views, 'times.')
                out_file = yt.streams.filter(
                    only_audio=True).first().download(local_music_path)
                print(f'\nFinished downloading:  {yt.title}' + reset_color)
                base, ext = os.path.splitext(out_file)
                new_file = base + '.mp3'
                os.rename(out_file, new_file)

#download video of a channel with link
def channelLink():
    url = input("Enter URL of channel : ")
    channel = Channel(url)
    print(f'Channel Name is : {channel.channel_name}')

    print("\nEnter 1 to see the title of video \n", "Enter 2 to download all videos at high resolution ⚡\n",
          "Enter 3 to download all videos in low resolution 🐽\n", "Enter 4 to download audio 🎶\n")
    answer = errorHandling(1, 4)
    match answer:
        case 1:
            for video in channel.videos:
                print(f'Title : {video.title}')
        case 2:
            for url in channel.video_urls:
                try:
                    yt = YouTube(url)
                except exceptions.VideoUnavailable:
                    print(f'Video {url} is unavaialable, skipping.')
                except KeyboardInterrupt:
                    print("OOPs feelin' like very strong keyboard stroke⌨️")
                else:
                    print(f'\n' + fuchsia + 'Downloading: ',
                          yt.title, '~ viewed', yt.views, 'times.')
                    yt.streams.filter(
                        file_extension='mp4').get_highest_resolution().download(local_download_path)
                    print(f'\nFinished downloading:  {yt.title}' + reset_color)
        case 3:
            for video in channel.video_urls:
                try:
                    yt = YouTube(video)
                except exceptions.VideoUnavailable:
                    print(f'Video {video} is unavaialable, skipping.')
                except KeyboardInterrupt:
                    print("OOPs feelin' like very strong keyboard stroke⌨️")
                else:
                    print(f'\n' + fuchsia + 'Downloading: ',
                          yt.title, '~ viewed', yt.views, 'times.')
                    yt.streams.filter(
                        file_extension='mp4').get_lowest_resolution().download(local_download_path)
                    print(f'\nFinished downloading:  {yt.title}' + reset_color)
        case 4:
            for video in channel.video_urls:
                try:
                    yt = YouTube(video)
                except exceptions.VideoUnavailable:
                    print(f'Video {video} is unavaialable, skipping.')
                except KeyboardInterrupt:
                    print("OOPs feelin' like very strong keyboard stroke⌨️")
                else:
                    print(f'\n' + fuchsia + 'Downloading: ',
                          yt.title, '~ viewed', yt.views, 'times.')
                    out_file = yt.streams.filter(
                        only_audio=True).first().download(local_music_path)
                    print(f'\nFinished downloading:  {yt.title}' + reset_color)
                    base, ext = os.path.splitext(out_file)
                    new_file = base + '.mp3'
                    os.rename(out_file, new_file)


#download videos of a channel with search query
def channelSearch():
    inp = input("Enter channel name : ")
    channelSearch = ChannelsSearch(inp, limit=2)
    ans = channelSearch.result()
    url = ans['result'][0]['link']
    channel = Channel(url)
    print(f'Channel Name is : {channel.channel_name}')

    print("\nEnter 1 to see the title of video \n", "Enter 2 to download all videos at high resolution ⚡\n",
          "Enter 3 to download all videos in low resolution 🐽\n", "Enter 4 to download audio 🎶\n")
    answer = errorHandling(1, 4)
    match answer:
        case 1:
            for video in channel.videos:
                print(f'Title : {video.title}')
        case 2:
            for url in channel.video_urls:
                try:
                    yt = YouTube(url)
                except exceptions.VideoUnavailable:
                    print(f'Video {url} is unavaialable, skipping.')
                except KeyboardInterrupt:
                    print("OOPs feelin' like very strong keyboard stroke⌨️")
                else:
                    print(f'\n' + fuchsia + 'Downloading: ',
                          yt.title, '~ viewed', yt.views, 'times.')
                    yt.streams.filter(
                        file_extension='mp4').get_highest_resolution().download(local_download_path)
                    print(f'\nFinished downloading:  {yt.title}' + reset_color)
        case 3:
            for video in channel.video_urls:
                try:
                    yt = YouTube(video)
                except exceptions.VideoUnavailable:
                    print(f'Video {video} is unavaialable, skipping.')
                except KeyboardInterrupt:
                    print("OOPs feelin' like very strong keyboard stroke⌨️")
                else:
                    print(f'\n' + fuchsia + 'Downloading: ',
                          yt.title, '~ viewed', yt.views, 'times.')
                    yt.streams.filter(
                        file_extension='mp4').get_lowest_resolution().download(local_download_path)
                    print(f'\nFinished downloading:  {yt.title}' + reset_color)
        case 4:
            for video in channel.video_urls:
                try:
                    yt = YouTube(video)
                except exceptions.VideoUnavailable:
                    print(f'Video {video} is unavaialable, skipping.')
                except KeyboardInterrupt:
                    print("OOPs feelin' like very strong keyboard stroke⌨️")
                else:
                    print(f'\n' + fuchsia + 'Downloading: ',
                          yt.title, '~ viewed', yt.views, 'times.')
                    out_file = yt.streams.filter(
                        only_audio=True).first().download(local_music_path)
                    print(f'\nFinished downloading:  {yt.title}' + reset_color)
                    base, ext = os.path.splitext(out_file)
                    new_file = base + '.mp3'
                    os.rename(out_file, new_file)

#main function
if __name__ == '__main__':
    print("\nChoose an option from below 👇👇\n","Enter 1 to download a single video or music 😂\n","Enter 2 to download a whole playlist 🥲\n","Enter 3 to download all videos from channel 😑")

    valid_inp_main = 0
#another local error handling for input validation
    while True:
        try:
            valid_inp_main = int(input("\nOut of this which option would you like to choose ? : "))
            if valid_inp_main >= 1 and valid_inp_main <= 3:
                break
            else:
                print("Enter in range of [1,2]")
        except ValueError:
            print("Error! Enter an integer")

#switch cases as per response
    match valid_inp_main:

#It will call single video download from link and search function both as per user input at that moment
        case 1:
            print("\nAgain now choose an option 😤\n",
              "Enter 1 to download via Link 😀\n", "Enter 2 to download via Search 🔎 ")
            response = errorHandling(1,2)
            singleLink() if response==1 else searchLink()

#It will call whole playlist video downlaod function
        case 2:
            playlist()

#It will call channelsearch function
        case 3:
            print("\nAgain now choose an option 😤\n",
              "Enter 1 to give channel link 👍\n", "Enter 2 to search by name 🔎 ")
            response = errorHandling(1, 2)
            channelLink() if response==1 else channelSearch()
