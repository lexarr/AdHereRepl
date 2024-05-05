## Run the frontend locally

1. Navigate to **_./src/frontend/_** in a terminal
2. Execute `npm install` command to install node dependencies (_This only needs to be done if the `node_modules` folder is missing_)
3. Execute `npm run start` command to launch **_App.tsx_** at _localhost:3000_, by default

## Setting API Key for Frontend

The `ViolatingSitesTable.tsx` component requires an active API Key to retrieve a list of sites that have violated the Better Ads Standard, as determined by Google.

1. Log in to [Google Developer Console](https://g.co/kgs/v3Ssk4M)
2. Navigate to your APIs & Services page
3. Search "Ad Experience Report API" in the main search bar, and enable this API
4. Navigate to the "Credentials" screen from the left sidebar
5. Click "Create Credentials" > "API Key"
6. Edit the newly created API Key (optional)
7. Restrict the key to the Ad Experience Report API (optional)
8. Copy the newly created API key
9. Create a **_.env_** at **_./src/frontend/_** in your project
   - The file should have the following contents:
      ```bash
      REACT_APP_AD_EXPERIENCE_API_KEY=[API_KEY]
      ```
      > Replace `[API_KEY]` with the key you copied in the previous step

## Controlling Site Filtering
By default, when you run the frontend, the sites that populate the main table of violating sites are the first 9 sites in the response received from Google's Ad Experience Report API. <br />

However, there is the option to filter out sites that do not exist. To do so, change the `FILTER_SITES` constant in **_.\src\frontend\src\components\ViolatingSitesTable.tsx_** from `false` to `true`.
> **NOTE**: Filtering out sites can take a long time (anywhere from a few minutes to tens of minutes, depending on network speed). This will impact the time it takes to populate the table of violating sites, both on initial page load, and every time a new list is requested.

## Controlling Port for the Backend
By default, port 8080 is used to run the Flask server. However, some situations may arise where you have to use a different port. The purpose of changing the port is to ensure the Flask server does not conflict with other applications/services and to ensure the frontend is using the correct port to communicate with the server. To change the port, follow these steps:
1. Change the port argument in the main function of **_./src/server.py_**
   ```python
   # BEFORE
   if __name__ == '__main__':
      app.run(port=8080, debug=True)
   ```
   ```python
   # AFTER
   if __name__ == '__main__':
      app.run(port=5000, debug=True)
   ```
2. Add a new environment variable to the **_./src/frontend/.env_** file. The variable will have your desired port number, like so:
      ```bash
      REACT_APP_BACKEND_PORT=5000
      ```

## Documentation Reference

- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs/installation)
- [Typescript](https://www.typescriptlang.org/docs/)
