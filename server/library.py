import os
import time
import threading
import random

def generateUUID():#dashes=True): #dashes are WIP
    uuid = []
    for i in range(36):
        uuid[i] = random.choice(['a', 'b', 'c', 'd', 'e', 'f', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'])
    
    uuidStr = "{0[0]}{0[1]}{0[2]}{0[3]}{0[4]}{0[5]}-{0[6]}{0[7]}{0[8]}{0[9]}{0[10]}{0[11]}-{0[12]}{0[13]}{0[14]}{0[15]}{0[16]}{0[17]}-{0[18]}{0[19]}{0[20]}{0[21]}{0[22]}{0[23]}-{0[24]}{0[25]}{0[26]}{0[27]}{0[28]}{0[29]}-{0[30]}{0[31]}{0[32]}{0[33]}{0[34]}{0[35]}".format(uuid)

    return uuidStr

#def 