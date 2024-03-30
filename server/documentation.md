Documentation for task User Authentication 
-------------------------------------------

Here I am providing routes to create/signup,login,get,update and delete users in database.

1.Signup
--------

url for signup===========>  /user/signup  
inputs in body===========>   {name:'samplename',
                              email:'sample email,
                              password:'password'
                             } 

outcomes of the route=====>user gets saved into the database 

2.Login
------- 

url for login===========>  /user/login
inputs in body===========>   {email:'sample email,
                              password:'password'
                             } 

outcomes of the route=====>if user already exists then he gets logged into the application 


3.get users 
------------

url for getusers===========>  /user/getall
inputs in header===========>   {token} 

outcomes of the route=====>This is protected route so first I am checking weather user is valid with the help of token provided. And if the token is valid he can see the list of users saved in database 


4.get One
----------

url for getone===========>  /user/getone
inputs in header===========>   {token}  
inputs in body=============>{id:'userid'}

outcomes of the route=====>This is protected route so first I am checking weather user is valid with the help of token provided. And if the token is valid he can see the selected user 

5.update password
-----------------

url for update password===========>  /user/update
inputs in header===========>   {token}  
inputs in body=============>{id:'userid',
                             password:'new password'
                             }

outcomes of the route=====>This is protected route so first I am checking weather user is valid with the help of token provided. And if the token is valid he can update password 


6.delete user
-------------

url for delete user===========>  /user/delete
inputs in header===========>   {token}  
inputs in body=============>{id:'userid'}

outcomes of the route=====>This is protected route so first I am checking weather user is valid with the help of token provided. And if the token is valid he can delete user

Iam also providing my dotenv environment variables 

PORT=5000
DBURL="mongodb+srv://saiteja:abc12@cluster0.rlojc0p.mongodb.net/authentication"
JWTSECRET="encryption_key"






