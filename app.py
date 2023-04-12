from feature import FeatureExtraction
from flask import Flask, request, redirect
from flask_cors import CORS, cross_origin
import numpy as np
import pandas as pd
from sklearn import metrics
import warnings
import pickle
warnings.filterwarnings('ignore')

file = open("pickle/model.pkl", "rb")
gbc = pickle.load(file)
file.close()


app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        url = request.form["url"]
        obj = FeatureExtraction(url)
        x = np.array(obj.getFeaturesList()).reshape(1, 30)

        y_pred = gbc.predict(x)[0]
        # 1 is safe
        # -1 is unsafe
        y_pro_phishing = gbc.predict_proba(x)[0, 0]
        y_pro_non_phishing = gbc.predict_proba(x)[0, 1]
        # if(y_pred ==1 ):
        pred = "It is {0:.2f} safe to go ".format(y_pro_phishing*100)
        xx = round(y_pro_non_phishing, 2)
        print(xx)
        return str(round(y_pro_non_phishing, 2))
    return str(round(y_pro_non_phishing, 2))


if __name__ == "__main__":
    app.run(debug=True)
