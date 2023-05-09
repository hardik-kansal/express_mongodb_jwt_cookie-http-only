mongoose new version i.e why use 127.0.0.1:21017

To start everything, npm run devStart since in server.js we have included script.js and user.js too

const date=new date() **Dont use date.now()**
date.toLocaleDateString() **converts to dd/mm/yy**

################## JWT #################

JSON Web Token
consist of three parts--

header--type of algo hashed with basic 64 url encoder
payload---auth data+exp date with basic 64 url encoder
signature---hashed (header+'.'+payload),secretmessage

JWT sent to user..**User cant create signature since he doesnt know the secret message**

If he tried to alter data,then signature wont be verified by server.

User send this token on each request throughout the session.Server doesnt have to store anything..Much powerful than Session ID authorization where session Id have to be stored on each server for different applications.JWT is stored on client side.

Authorization--Allowing throughout session
Authentication--Login_page

Cookie size is much smaller(4kb) and tab independent..
white session(5mb) is tab dependent..Sesssion storage is specific for a tab...if redirect in same tab or refresh doesnt matter.

Local storgae---user has access(10mb)

npm install method-override
