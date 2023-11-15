from flask import Flask, request, jsonify
import pickle
import numpy as np
import pandas as pd
import cv2
import sklearn
from sklearn.feature_extraction.text import CountVectorizer 
from sklearn import svm 
import nltk 
app = Flask(__name__)



@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

# Handle preflight requests
@app.route('/diagnose_Diabetes', methods=['OPTIONS'])
def options():
    response = jsonify({'message': 'CORS preflight request successful'})
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST')
    return response


#Diabetes controller

@app.route('/mental_health', methods=['POST'])
def diagnose_Diabetes():
    try:
        df= pd.read_csv('mentalhealth.csv')
        x_train=[]
        y_train=[]
        for i in range(len(df['Questions'])):
            x_train.append(df['Questions'][i])
            y_train.append(df['Answers'][i])
        vectorizer=CountVectorizer()
        train_x_vectors=vectorizer.fit_transform(x_train)
        clf_svm= svm.SVC(kernel='linear')
        clf_svm.fit(train_x_vectors,y_train)
        data = request.get_json()
        text = [value for value in data.values()]
        text_x = vectorizer.transform(text)
        ans=clf_svm.predict(text_x)
        ans_list = ans.tolist() 
        return jsonify({'status':'success','answer':ans_list})
    except Exception as e:
        return jsonify({'status':'failed','error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)