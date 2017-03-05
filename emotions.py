import time
import requests
import cv2
import operator
import numpy as np
import os
import glob
import sys

#from ___future__ import print_function

import matplotlib.pyplot as plt
#%matplotlib inline

#variables
_url = 'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize'
_key = '417059acc64041cd9ea461aafc8e527b' #Here you have to paste your primary key
_maxNumRetries = 10

resList = []


#Helper Function to process the request to Project 
def processRequest( json, data, headers, params ):

    """
    Helper function to process the request to Project Oxford
    Parameters:
    json: Used when processing images from its URL. See API Documentation
    data: Used when processing image read from disk. See API Documentation
    headers: Used to pass the key information and the data type request
    """

    retries = 0
    result = None

    while True:

        response = requests.request( 'post', _url, json = json, data = data, headers = headers, params = params )

        if response.status_code == 429: 

            print( "Message: %s" % ( response.json()['error']['message'] ) )

            if retries <= _maxNumRetries: 
                time.sleep(1) 
                retries += 1
                continue
            else: 
                print( 'Error: failed after retrying!' )
                break

        elif response.status_code == 200 or response.status_code == 201:

            if 'content-length' in response.headers and int(response.headers['content-length']) == 0: 
                result = None 
            elif 'content-type' in response.headers and isinstance(response.headers['content-type'], str): 
                if 'application/json' in response.headers['content-type'].lower(): 
                    result = response.json() if response.content else None 
                elif 'image' in response.headers['content-type'].lower(): 
                    result = response.content
        else:
            print( "Error code: %d" % ( response.status_code ) )
            print( "Message: %s" % ( response.json()['error']['message'] ) )

        break
        
    return result


################### render Result on Image #################

def renderResultOnImage( result, img ):
    
    """Display the obtained results onto the input image"""
    
    for currFace in result:
        faceRectangle = currFace['faceRectangle']
        cv2.rectangle( img,(faceRectangle['left'],faceRectangle['top']),
                           (faceRectangle['left']+faceRectangle['width'], faceRectangle['top'] + faceRectangle['height']),
                       color = (255,0,0), thickness = 5 )


    for currFace in result:
        faceRectangle = currFace['faceRectangle']
        currEmotion = max(currFace['scores'].items(), key=operator.itemgetter(1))[0]
        resList.append(currEmotion)
        textToWrite = "%s" % ( currEmotion )

        #cv2.putText( img, textToWrite, (faceRectangle['left'],faceRectangle['top']-10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255,0,0), 1 )



######3 Detect from an image retrieved via URL##########
'''
urlImage = 'https://raw.githubusercontent.com/Microsoft/ProjectOxford-ClientSDK/master/Face/Windows/Data/detection3.jpg'
headers = dict()
headers['Ocp-Apim-Subscription-Key'] = _key
headers['Content-Type'] = 'application/json' 
json = { 'url': urlImage } 
data = None
params = None
result = processRequest( json, data, headers, params )
#print result
if result is not None:
    # Load the original image, fetched from the URL
    arr = np.asarray( bytearray( requests.get( urlImage ).content ), dtype=np.uint8 )
    img = cv2.cvtColor( cv2.imdecode( arr, -1 ), cv2.COLOR_BGR2RGB )
    renderResultOnImage( result, img )
    ig, ax = plt.subplots(figsize=(15, 20))
    ax.imshow( img )
'''


# Load raw image file into memory
headers = dict()
headers['Ocp-Apim-Subscription-Key'] = _key
headers['Content-Type'] = 'application/octet-stream'
json = None
params = None

def calcScore():
    scoreImg = 0        
    for item in resList:
        #print item
        if (item == "happiness"):
            scoreImg+=5
        elif (item == "sadness"):
            scoreImg-=5
        elif (item == "anger"):
            scoreImg-=10
        elif (item == "surprise"):
            scoreImg+=10
        elif (item == "contempt"):
            scoreImg-=4
        elif (item == "fear"):
            scoreImg-=4
        else:
            scoreImg+=1
    
    length = len(resList)
    try:
        ans = (scoreImg/length)
    except ZeroDivisionError:
        ans = 1
        #print "Score during last speech duration :"
    print ans
        #print "\n"
    return ans


def captureClick():
    camera_port = 0
    camera = cv2.VideoCapture(camera_port)

    #Number of frames to throw away while the camera adjusts to light levels
    ramp_frames = 30

    # Ramp the camera - these frames will be discarded and are only used to allow v4l2
    # to adjust light levels, if necessary
    for i in xrange(ramp_frames):
        camera.read()
    #print("Taking image...")

    retval,im = camera.read()
    camera_capture = im

    #file = "/Users/prathameshnaik/Desktop/test_image.jpg"
    file = "test_image.jpg"

    # A nice feature of the imwrite method is that it will automatically choose the
    # correct format based on the file extension you provide. Convenient!
    cv2.imwrite(file, camera_capture)

    # You'll want to release the camera, otherwise you won't be able to create a new
    # capture object until your script exits
    del(camera)


def getRetValue():
    #Capture the Image
    captureClick()
    #time.sleep(2)
    #filename = "/Users/prathameshnaik/Desktop/test_image.jpg"
    filename = "test_image.jpg"
    with open( filename, 'rb' ) as f:
        #print filename
            data = f.read()
    result = processRequest( json, data, headers, params )

    if result is not None:
    # Load the original image from disk
        data8uint = np.fromstring( data, np.uint8 ) # Convert string to an unsigned int array
        img = cv2.cvtColor( cv2.imdecode( data8uint, cv2.IMREAD_COLOR ), cv2.COLOR_BGR2RGB )
        renderResultOnImage( result, img )
        #ig, ax = plt.subplots(figsize=(15, 20))
        #ax.imshow( img )
    res = calcScore()
    resList = []
    #Remove file required ???
    return res      


def main():
    getRetValue()
            

if __name__ == "__main__":
    main()
    

#print "Program Halted Properly"