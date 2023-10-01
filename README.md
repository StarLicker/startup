# startup
***README***

[Class Notes](https://github.com/StarLicker/startup/blob/main/Notes/notes.md)

**StartUp Specs**

*Elevator Pitch*

Siri can easily tell you how many feet are in a mile, or how many ounces are in a cup. But can Siri tell you how many grapefruits would fit inside Mercury? Didn't think so. Thankfully, Gotta Convert Them All has you covered.

Once you create an account you'll be able to make the conversions you have only dreamed of making. How many AA batteries does a gorilla weigh? How many Nintendo Wii lengths are we away from the Sun? Harnessing the power of Chat GPT we can answer all of these very important questions. Along with being able to see all of your previously calculated conversions, you'll be able to see a leaderboard of the most prolific converters. Our application will keep track of how many unique objects and conversion pairs you enter, so if you want to be on top of that leaderboard, you gotta make sure you convert them all.

*Key Features and Technology*
- Log in/Sign up feature to create and log in to your own account (authentication)
- You'll be able to convert between any two things (as long as we can make an appropriate estimation of the measurements)
- We will keep track of all conversions you make with your account, which can be accessed through the History tab (database)
- Keep track of your status on the leaderboards where you can see the users with the most unique objects used and the most unique pairing of objects used (database, WebSocket data)

*Sketches*

![Semester_Project_Sketch_Front](https://github.com/StarLicker/startup/blob/main/Images/CS260_Project_Front.jpg)

![Semester_Project_Sketch_Front](https://github.com/StarLicker/startup/blob/main/Images/CS260_Project_Back.jpg)

**HTML Deliverable**
*I built out the html structure for my application*
- HTML pages - 5 HTML pages for creating accounts, logging in, converting, seeing conversion history, and viewing the scoreboard.
- Links - Linked log in/create account pages to conversion page. Links on conversion, history, and scoreboard pages to each of the other pages along with a log out option.
- Text - Text describing features of each page and placeholder text for text boxes.
- Images - I'm not sure what other images I'll add, but for now I added a generic "two arrows in a circle" to represent conversions.
- Log in - I have a form and submit button for both logging in and creating an account.
- Database - The history and user stats on the history page represent data pulled from the database for the user.
- WebSocket - Rankings on the scoreboard page current stats of all users.
