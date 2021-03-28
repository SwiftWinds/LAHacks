from flask import Flask, session, request
app = Flask(__name__)

@app.route('/upload', methods=['GET', 'POST'])
def hello_world():
    if request.method == 'POST':
        session['audio_data'] = request.form['audio_data']
        print(session['audio_data'])
        # abc = vars(request)
        # for i in abc:
        #     print(i)
        return "Uploaded Audio"
    return 'Hello, World!'