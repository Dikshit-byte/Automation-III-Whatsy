import os
import glob
import shutil
import subprocess
import sys

path = "C:\\Projects\\node\\Venom\\music\\"
destination = './music'

#link of playlist, song or album by input from user
song_link = str(sys.argv[1])
song_name = str(sys.argv[2])

print(f'{song_link}  ->  {song_name}')

isExisting = os.path.exists(path+song_name+'.mp3')
print(isExisting)
if(isExisting == False):
    link = song_link
    subprocess.run(f'spotdl {link}')
else:
    print("Already Existed")

#  file finding pattern
allfile = glob.glob('*.mp3*',recursive = True)
print(allfile)

# #for all files in dl folder to move into music folder
for file_path in allfile:
    print("The file path is -> ",file_path)
    shutil.move("./"+file_path,path)
    print(f'Moved {file_path} -> {path}')