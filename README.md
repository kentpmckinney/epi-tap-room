<!-- Category: React -->
# Independent Project
## Tap Room
https://github.com/kentpmckinney/epi-tap-room

##### Author: Kent McKinney - [GitHub](https://github.com/kentpmckinney)
##### Copyright &copy; 2020 Kent McKinney
### Description:

``This program provides the ability to view, track, and edit kegs``

``A live demo of this application is available on`` [GitHub Pages](https://kentpmckinney.github.io/epi-tap-room/)

### Setup Instructions:
    1. Download a copy of the source code from GitHub from https://github.com/kentpmckinney/epi-tap-room
    2. Install NodeJS if not already installed
    3. Navigate to the location of the downloaded source files
    4. Run the command `npm install` to download a local cache of the npm packages used by this application
    5. Install SASS with the command `npm install node-sass`
    6. Start the application with the command `npm run start`
 
### Changelog:
* 4/28/2020 - Created skeleton React project and added templates (0.5 hours)
* 4/28/2020 - Created a README.md file (0.5 hours)
* 4/28/2020 - Added component diagram to README.md (0.75 hours)
* 4/28/2020 - Added basic components and layout grid (0.50 hours)
* 4/28/2020 - Started a simple JSON data file and loaded it into KegList (0.50 hours)
* 4/29/2020 - Added JSON data to KegList state (0.25 hours)
* 4/29/2020 - Implemented a list of kegs and all necessary details (0.75 hours)
* 4/29/2020 - Add button to purchase a pint (0.50 hours)
* 4/29/2020 - Add remaining required specs (2.50 hours)
* 4/29/2020 - Add remaining optional specs (2.00 hours)
* 4/29/2020 - Final testing and refactoring to ensure objectives are met
* 4/29/2020 - Applied finishing touches

### Component Diagram:

```
|------------------------------------------|
|                                          |
|     App                                  |
|                                          |
|   |--------------------------------|     |
|   |             Header             |     |
|   |--------------------------------|     |
|                                          |
|   |--------------------------------|     |
|   |      KegList           [New] <-|-----|--- Clicking on New in KegList adds a new Keg to the top of
|   |          -----------           |     |    the list in Edit mode
|   |          | Keg     |           |     |
|   |          -----------           |     |
|   |          | Keg     |           |     |
|   |          --------------------  |     |
|   |          | [Details] [Edit] <--|-----|--- Clicking on Details or Edit in Keg fires event handlers
|   |          |                  |  |     |    in KegList. The event handlers cause different children
|   |          |    Keg           |  |     |    to be passed to <Keg />. <Keg /> is thus reused rather
|   |          |                  |  |     |    than creating separate components
|   |          --------------------  |     |
|   |                                |     |
|   |--------------------------------|     |
|                                          |
|                                          |
|------------------------------------------|

```

### Specifications:

| Spec | Input | Output |
| :------------- | :------------- | :------------- |
| Application created with create-react-app runs properly | √ | √ |
| User can see a list of all available kegs | √ | √ |
| User can see the name, brand, price, alcohol content, gluten status, and vegan status for each keg | √ | √ |
| User can submit a form to add a new keg | √ | √ |
| User can click on a keg to see its detail page | √ | √ |
| User can see how many pints are left in a keg | √ | √ |
| User can click on a button next to the keg whenever a pint is sold | √ | √ |
| Clicking the button to sell a pint decreases the number of pints by 1 out of 124 | √ | √ |
| The number of pints in a keg does not go below zero | √ | √ |
| Application compiles and runs and all required functionality is included | √ | √ |
| Functional and class components are used correctly | √ | √ |
| Application effectively uses local and shared state | √ | √ |
| README includes an accurate representation of the component tree | √ | √ |
| Props are used correctly and always include PropTypes | √ | √ |
| [Optional] User can edit the keg's properties at any time | √ | √ |
| [Optional] User can delete a keg | √ | √ |
| [Optional] Keg shows as out of stock when it's empty | √ | √ |
| [Optional] Kegs with less than 10 pints show 'Almost Empty' | √ | √ |
| [Optional] Keg prices are color-coded for readability | √ | √ |
| [Optional] Application is nicely styled | √ | √ |
