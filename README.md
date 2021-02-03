# Modelling
## Overview
### success metric
We would like our success metric to capture both the time factor & monetary worth factor. We designed Valuation Growth Rate (VGR), the average annual percentage increase in valuation over a given time frame t0 - t1.

![VGR Definition](img/vgr.png)
### model architecture
Factors affecting the success of startups vary across funding stages. Therefore, we use 4 models to learn the determining factors in each of the 4 stages:
- Seed-stage (company going from preseries to round A)
- Early-stage (company going from round A to round B)
- Mid-stage (company going from round B to round C)
- Late-stage (company going from round C to round D+)

Each of the model is a Gradient Boosted Decision Tree Classifier classifying a company into one of 3 ranges of VGR:
- < 0%
- 0 - 10%
- \> 10%

## Usage
### install dependencies
```pip install -r requirements.txt```
### jupyter notebook
The python code is packaged as jupyter notebooks. To execute them, turn on jupyter notebook server first.

```jupyter notebook```
### raw data
Please put all the raw csvs into /Model/data/raw for the jupyter notebooks to load them properly. The format follows the crunchbase data dump provided at the beginning of the project.

### data preprocessing
Run preprocessing.ipynb on jupyter notebook to preprocess and generate the dataset for modelling. The dataset will be saved at /Model/data/preprocessed/. For detailed steps of data preprocessing, please refer to preprocessing.ipynb directly.

### modelling
Run model.ipynb on jupyter notebook to train and save the 4 models. The models will be saved at models/. It also generates the data for web application, saved at /Model/data/db/. For detailed implementation of modelling, please refer to model.ipynb directly.

### Setting up the Database server
Please import all JSON files in App/DBdata to a local MongoDB Server (localhost:27017/) with database name, "Crunchbase Companies". Each JSON file represents a seperate collection of the same name. If using a custom generated CSV, please import that into the collection "All" instead of /App/data/All.json

### Setting up Backend flask server
Go to /App/api on the terminal and run the following commands to set up a virtual environment and start the server:
```python -m venv venv```
```Set-ExecutionPolicy Unrestricted -Scope Process``` (for windows users only)
```venv\Scripts\activate```
```pip install flask python-dotenv flask_cors Flask-PyMongo lightgbm pandas```
```flask run```

### Start the application
Go to /App on the terminal and run the following commands to start the application:
```npm install```
```npm start```