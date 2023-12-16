***CS 260 Notes***

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

**How to deploy service**
- On Laptop: ./deployService.sh -k "C:\Users\benny\Downloads\CS260_Server.pem" -h gotta-convert-them-all.click -s simon
- On PC: ./deployService.sh -k "C:\Users\Admin\Desktop\CS260_Server.pem" -h gotta-convert-them-all.click -s simon

- On Laptop: ./deployService.sh -k "C:\Users\benny\Downloads\CS260_Server.pem" -h gotta-convert-them-all.click -s startup
- On PC: ./deployService.sh -k "C:\Users\Admin\Desktop\CS260_Server.pem" -h gotta-convert-them-all.click -s startup


**How to add .env after deploying**
- ssh into server:
    - SSH command: ssh -i "C:\Users\Admin\Desktop\CS260_Server.pem" ubuntu@52.207.139.208
    - Or on laptop: ssh -i "C:\Users\benny\Downloads\CS260_Server.pem" ubuntu@52.207.139.208
- cd into startup folder
- create a .env file and copy/paste OpenAI API key
- cd back to main directory and restart pm2 -> pm2 restart startup


**How to deploy React**
- On laptop: ./deployReact.sh -k "C:\Users\benny\Downloads\CS260_Server.pem" -h gotta-convert-them-all.click -s simon
- On PC: ./deployReact.sh -k "C:\Users\Admin\Desktop\CS260_Server.pem" -h gotta-convert-them-all.click -s simon

- On laptop: ./deployReact.sh -k "C:\Users\benny\Downloads\CS260_Server.pem" -h gotta-convert-them-all.click -s startup
- On PC: ./deployReact.sh -k "C:\Users\Admin\Desktop\CS260_Server.pem" -h gotta-convert-them-all.click -s startup


**Final Exam Notes**
1. What ports are used for HTTP, HTTPS, SSH?
2. What do HTTP status codes in the 300, 400, 500 range indicate?
3. What does the HTTP header content-type allows you to do?
4. What do the following attributes of a cookie do?
  - Domain
  - Path
  - SameSite
  - HTTPOnly
5. Assuming the following Express middleware, what would be the console.log output for an HTTP GET request with a URL path of /foo/bar?
6. Given the following Express service code: What does the following JavaScript fetch return?
7. Given the following MongoDB query: { cost: { $gt: 10 }, name: /fran.*/}  Select all of the matching documents.
8. How should you store user passwords in a database?
9. Assuming the following Node.js service code is executing with websockets, what will be logged to the console of the web browser?
10. What is the WebSocket protocol used for?
11. What is JSX and how are the curly braces rendered?
12. Assuming a HTML document with a <div id="root"></div> elemtn, what content will the following React component generate?

          function Welcome(props) {
        return <h1>Hello, {props.name}</h1>;
      }
      function App() {
        return (
          <div>
            <Welcome name="Sara" />
            <Welcome name="Cahal" />
            <Welcome name="Edite" />
          </div>
        );
      }
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(<App />);
13. Assuming a HTML document with a <div id="root"></div> element, what content will the following React component generate?
        function Numbers() { 
          const numbers = [1, 2, 3, 4, 5];
          const listItems = numbers.map((number) =>
            <li>{number}</li>
        );
        return(<ul>{listItems}</ul>)
        }
        const root = ReactDOM.createRoot(document.getElementById('root')); 
        root.render(<Numbers/>);
14. What does the following React component do?
    function Example() {
      // Declare a new state variable, which we'll call "count"  
      const [count, setCount] = useState(0);
      return (
        <div>
          <p>You clicked {count} times</p>
          <button onClick={() => setCount(count + 1)}>
            Click me
          </button>
        </div>
      );
    }
15. What are React Hooks used for?
16. What is the useEffect hook used for?
17. What does this code do?
    export default function App() {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="blogs" element={<Blogs />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      );
    }
18. What role does npm play in web development?
19. What does package.json do in a npm project?
20. What does the fetch function do?
21. What does node.js do?
22. What does Vite do?
