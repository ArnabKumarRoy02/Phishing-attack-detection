# Kavach Hackathon 2023
This project is our submission for Kavach Hackathon 2023 on ***Phishing Detection Solution***, problem statement ID (KVH-004).<br />
<img src="https://github.com/shshwtsrkr/Phishing-attack-detection/blob/master/images/kavach-logo.png"  width="400" height="250" style="float: right;">

## Problem Statement 
Design and develop a technological solution for AI-enabled Phishing Links Detection and Alert System. The solution should be able to identify the source of phishing attacks in web pages, email apps, social media, instant messenger apps, text messages etc. The solution may be in the form of a desktop/mobile application or a web browser plugin.

# Phishing attack detection
## Why are phishing links dangerous ?

In today's day and age, data is the new oil. It is clear that the importance of information, and more specifically user information is of paramount significance. Personal data is any information that relates to us, our identity as an individual. It includes everything and anything that can be used to identify us directly or indirectly such as our name, address, date of birth, Aadhar number, PAN Card number, email address, phone number, financial information, health information, and more. With increasing attacks and breaches on organizations and users, the end user's data and information is at risk.

Phishing is one of the most common types of cyberattacks that take placeevery year. Here are some statisitcs to understand the gravity of the situation :- <br />
- Phishing attacks are responsible for **90% of data breaches**.
- The global average cost of a data breach caused by a phishing attack is $3.86 million. 
- In 2020, there was a **22% increase** in the number of phishing attacks compared to the previous year.
- One in every 99 emails is a phishing attack. 
- **Phishing emails** account for 80% of all reported security incidents.
- **94% of malware** is delivered **via email**.

Therefore, a solution to detect such link phishing links for the user beforehand is much needed.

## Our Approach
Since, the increase in phishing attacks are increasing day-by-day manual identification and laerting of phishin links is not feasible.
Therefore, we employ machine learning techniques to automate this process. 

### 1. Training the model
For training our model, we use the [Malicious URLs dataset](https://www.kaggle.com/eswarchandt/phishing-website-detector)
- **<ins>Loading the data</ins>** - To work with the data.
- **<ins>Familiarizing with data & EDA (Exploratory Data Analysis)</ins>** - We perform EDA to understand the underlying the structure of the data.
- **<ins>Visualizing the data</ins>** - We perform certain data visualization techniques to visualize the data to realize the important correlations between different features.
- **<ins>Building and training the model</ins>** - We trained the following models :
    - Logistic Regression
    - K-Nearest Neighbors
    - Support Vector Clasifier
    - Naive Bayes
    - Decision Tree
    - Random Forest
    - Gradient Boosting
    - Catboost
    - **Xgboost**
    - Multilayer Perceptrons<br /><br />
   Based on the latency of the model response as well as accuracy XGBoost demonstrated to strike the best balance. Thus, being the model of our choice.

### 2. Building the extension
### 3. Integrating the model with the extension
- The model is saved as a pickle.
- This pickle is served in the Flask as a micro backend framework.
- The flask server then exposes the model so that it can be fed with input, while also enabling us to provide the predicted output into our extension.

## Usage


## Contributors (PhishShield)

1. [Saumit Dinesan](https://github.com/justsaumit)
2. [Shashwat Sarkar](https://github.com/shshwtsrkr)
3. [Arnab Kumar Roy](https://github.com/ArnabKumarRoy02)
4. [Mayank Kumar Jha](https://github.com/mayankxjha)
5. [Pinjana Biswas](https://github.com/Pinjana)
6. [Phirat Passi](https://github.com/Phirat-Passi)
