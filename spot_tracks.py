import os
import glob
import shutil
import subprocess
import sys

source = './dl/'
destination = './music/'
#link of playlist, song or album by input from user
link = str(sys.argv[1])
# link = "https://open.spotify.com/track/4vUmTMuQqjdnvlZmAH61Qk?si=Wqn40Y1wQu2r3YiOa79ZFQ&utm_source=copy-link"
subprocess.run(f'spotidl {link}')

 #file finding pattern
allfile = glob.glob(os.path.join(source,'*.mp3*'),recursive = True)
# print(allfile)

# #for all files in dl folder to move into music folder
for file_path in allfile:
    print("The file path is -> ",file_path)
    change_name0 = str(sys.argv[2])
    change_name = change_name0+'.mp3'
    path = "C:\\projects\\node\\Venom\\dl\\"
    isExisting = os.path.exists(path+change_name)
    if(isExisting == False):
        os.rename(file_path,"./dl/"+change_name)
    dst_path = os.path.join(destination,os.path.basename(change_name))
    shutil.move("./dl/"+change_name,dst_path)
    print(f'Moved {file_path} -> {dst_path}')


#this is the most hard code that i ever did on things for that