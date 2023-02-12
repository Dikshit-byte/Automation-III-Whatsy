import os
import glob
import shutil
import subprocess
import sys

source = './dl/'
destination = './music/'


def spotdl():
    #link of playlist, song or album by input from user
    link = str(sys.argv[1])
    subprocess.run(f'spotidl {link}')
    # #file finding pattern
    allfile = glob.glob(os.path.join(source,'*.mp3*'),recursive = True)
    # print(allfile)
    # #for all files in dl folder to move into music folder
    for file_path in allfile:
        dst_path = os.path.join(destination,os.path.basename(file_path))
        shutil.move(file_path,dst_path)
        print(f'Moved {file_path} -> {dst_path}')


if __name__ == '__main__':
    spotdl = spotdl()