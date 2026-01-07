import json
import urllib.request
import urllib.error

url='http://localhost:8000/api/inspirasi'
data={'title':'agent test','category':'Ruang Pena','author':'agent','content':'test content from agent'}
req=urllib.request.Request(url, data=json.dumps(data).encode('utf-8'), headers={'Content-Type':'application/json'})
try:
    resp=urllib.request.urlopen(req, timeout=10)
    print('status', resp.getcode())
    print(resp.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print('HTTPError', e.code)
    try:
        print(e.read().decode('utf-8'))
    except Exception:
        pass
except Exception as e:
    print('Error', e)
