from flask import Flask, render_template, request, jsonify
import smtplib
from email.message import EmailMessage

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/subscribe', methods=['POST'])
def subscribe():
    email = request.form['email']

    try:
        msg = EmailMessage()
        msg.set_content(f'Nouvelle souscription : {email}')
        msg['Subject'] = 'Nouvelle Souscription à ANDROMIN'
        msg['From'] = 'tonemailserveur@gmail.com'
        msg['To'] = 'andromintv@gmail.com'

        # Connexion SMTP (Gmail)
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login('tonemailserveur@gmail.com', 'MOT_DE_PASSE')
            smtp.send_message(msg)

        return jsonify({'status': 'success', 'message': 'Email envoyé avec succès !'})

    except Exception as e:
        print("Erreur :", e)
        return jsonify({'status': 'error', 'message': 'Erreur lors de l\'envoi.'})

if __name__ == '__main__':
    app.run(debug=True)
    
