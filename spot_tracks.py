import os
import glob
import shutil
import subprocess
import sys

source = './dl/'
destination = './music/'
#link of playlist, song or album by input from user
link = str(sys.argv[1])
# link = "https://open.spotify.com/track/6kp18rnZeE67pAEWASkS6H?si=l_KAoR4dSH6ABY-BzcGg3A&utm_source=copy-link"
subprocess.run(f'spotidl {link}')

 #file finding pattern
allfile = glob.glob(os.path.join(source,'*.mp3*'),recursive = True)
# print(allfile)

# #for all files in dl folder to move into music folder
for file_path in allfile:
    dst_path = os.path.join(destination,os.path.basename(file_path))
    shutil.move(file_path,dst_path)
    print(f'Moved {file_path} -> {dst_path}')


#this is the most hard code that i ever did on things for that