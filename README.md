# ActivityClientWebApi
---
## Web API

### Getting Started
1) Download WebApi.exe from [here](https://github.com/Mark-Pearson1/ActivityClientWebApi/raw/main/WebApi/bin/Debug/net5.0/win-x64/publish/WebApi.exe).
2) Once downloaded run the executable and it should be displayed like this:![image](https://user-images.githubusercontent.com/62523135/110734223-437e4580-8277-11eb-9437-fe1b62f403ba.png)
3) With this running the API is now available to be used.

### API Use
GET /ActivityItem:
  Returns all stored activity items.

GET /ActivityItem/{key}
  Returns stored activity item with given key.

POST /ActivityItem application/json: ActivityItem
  Stores given activity item if no currently stored activity item shares its key.
  
DELETE /ActivityItem application/json: int[]
  Deletes stored activity item(s) for keys in provided list. 

## Decisions, Omissions and Ideas for continued development
- Based on information given I assumed that "key" in the JSON provided by the BoredAPI is a unique identifier.
### Idea(s) for future Development
- Add update functionality.
- Add security.
- Add login.

---
## Activity Client

### Getting Started
1) Open Command Prompt/cmd in Windows.
2) Enter in cmd `git clone https://github.com/Mark-Pearson1/ActivityClientWebApi.git` in desired directory.
3) Enter in cmd `cd ActivityClient`.
4) Enter in cmd `npm install`.
5) Ensure WebAPI is running.
6) Enter in cmd `ng serve --o`. 

This should be displayed in your browser:
![image](https://user-images.githubusercontent.com/62523135/110736427-90641b00-827b-11eb-866e-881148b401b3.png)

### Activity Client Use
Get Activity Button:
  On click this will grab an Activity Item from the public BoredApi and be displayed in the Card.
  
Delete Displayed Items Button:
  On click this will delete the displayed Activity Items in the Table below and clear the filter.
  
Filter Input Field:
  On keyup of input this will filter the table below.
  
Table:
  This will display the stored Activity Item(s).
  
## Decisions, Omissions and Ideas for continued development
- I decided to utilise the UI library Angular Material due to its seamless integration with Angular.
### Idea(s) for future Development
- Add update functionality.
- Add login.
- Get input from designer for visuals.
