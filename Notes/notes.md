*CS 260 Notes*

**Git Notes - 9/15/23**
- I started using Git and GitHub over the summer for my work, but this class helped me understand the difference between forks and branches.
- It was also really useful learning about the Personal Access Tokens and how to resolve conflicts. When I ran into conflicts at work I would always just delete my cloned repository and clone it again haha

**Web Servers Info**
- Elastic IP: http://52.207.139.208/
- SSH command: ssh -i "C:\Users\Admin\Desktop\CS260_Server.pem" ubuntu@52.207.139.208
- Or on laptop: ssh -i "C:\Users\benny\Downloads\CS260_Server.pem" ubuntu@52.207.139.208
- Might need to upgrade from free tier t2.micro, but I can do this without changing the IP address now because I set up an elastic IP
- To restart caddy after making changes to the caddyFile: sudo service caddy restart

*How to copy over files to server*
- scp .pem index.html ubuntu@ip:public_html/...

**Web Certificates/Network Security**
- see slides

**HTML**
- < !-- how to write comments in html -->

![HTML ELements](https://github.com/StarLicker/startup/blob/main/Images/html_elements.png)

![HTML ELements Continued](https://github.com/StarLicker/startup/blob/main/Images/html_elements_2.png)

![HTML Special Characters](https://github.com/StarLicker/startup/blob/main/Images/html_special_characters.png)

![HTML Input Elements](https://github.com/StarLicker/startup/blob/main/Images/HTML_Input.png)


**CSS**
- you can make changes in the head, the tag, or a css style file (probably the best option). CSS cascades through the document and will prefer the style in the smallest implementation.
- tag, id, state/psuedo, and class selectors (p, id="", p:hover, .center, p.center etc.)
- see slides for more

(selector attatched to a tag) p {
                                  color: green;
                                }



**How to deploy**
- On laptop: ./deployFiles.sh -k "C:\Users\benny\Downloads\CS260_Server.pem" -h gotta-convert-them-all.click -s simon
- On PC: ./deployFiles.sh -k "C:\Users\Admin\Desktop\CS260_Server.pem" -h gotta-convert-them-all.click -s simon

- On laptop: ./deployFiles.sh -k "C:\Users\benny\Downloads\CS260_Server.pem" -h gotta-convert-them-all.click -s startup
- On PC: ./deployFiles.sh -k "C:\Users\Admin\Desktop\CS260_Server.pem" -h gotta-convert-them-all.click -s startup
