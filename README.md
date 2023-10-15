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

I built out the html structure for my application

- HTML pages - 5 HTML pages for creating accounts, logging in, converting, seeing conversion history, and viewing the scoreboard.
- Links - Linked log in/create account pages to conversion page. Links on conversion, history, and scoreboard pages to each of the other pages along with a log out option.
- Text - Text describing features of each page and placeholder text for text boxes.
- Images - I'm not sure what other images I'll add, but for now I added a generic "two arrows in a circle" to represent conversions.
- Log in - I have a form and submit button for both logging in and creating an account.
- Database - The history and user stats on the history page represent data pulled from the database for the user.
- WebSocket - Rankings on the scoreboard page represent current stats of all users.
- 3rd Party Service Calls - the section on the conversion page where the given conversion is shown represents a call to ChatGPT to get the measurements of the requested objects.

**CSS Deliverable**

*Simon*
- I didn't change all that much but I did add an animation to the home page. I made the text that says "Login to play" get bigger and turn green so it catches the user's attention.

*Startup*
I styled my application to basically it's final appearance using CSS. I'll probably tweak things here and there as the semester goes on and I learn new things, but it will essentially stay the same. For example, when I get the login function working, I'll probably remove the links in the header to the other pages.
- Added header, footer, and main content.
- Navigation/anchor elements: For the navigation/anchor elements I removed the underline, changed the color, and made the color go darker when the mouse is hovering over it.
- Responsive to window resizing: It resizes fairly nicely, but I did add a minimum width so that everything would be shown properly. Again, I'll probably tweak things as I learn more, but I think I have a good start. It looks pretty good on my phone too, although I might try darkening some of the lighter fonts to see if that helps visibility.
- Application elements: I have good whitespace and contrast between elements and I experimented with using fieldspaces and vertical separaters to help divide some sections of the application.
- Application text content: styled all the text consistently with fonts and colors. Threw in some underlines as well and bolding as well.
- Application images: I added an icon for the webpage and I animated the conversion image (the two arrows in a circle) the spin clockwise. I made it slightly transparent and put it in the background so it will stay in the top left corner.
- Github: Multiple different, meaningful commits.
