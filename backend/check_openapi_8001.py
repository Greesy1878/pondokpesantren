import subprocess, time, urllib.request, json, sys

p = subprocess.Popen([r"C:\test\tunasquran\backend\.venv\Scripts\python.exe", "-m", "uvicorn", "backend.server:app", "--host", "0.0.0.0", "--port", "8001"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
print("started pid", p.pid)

time.sleep(1)
try:
    data = urllib.request.urlopen('http://localhost:8001/openapi.json', timeout=5).read().decode()
    o = json.loads(data)
    print('\nOpenAPI paths from new server:\n')
    for k in o.get('paths', {}).keys():
        print(k)
except Exception as e:
    print('Failed to fetch OpenAPI from new server:', e)
    try:
        out, err = p.communicate(timeout=1)
        print('uvicorn stdout:', out.decode(errors='ignore')[:1000])
        print('uvicorn stderr:', err.decode(errors='ignore')[:1000])
    except Exception:
        pass
# leaving uvicorn running on port 8001
