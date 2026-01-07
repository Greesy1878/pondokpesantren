1️⃣ Hentikan uvicorn yang sedang berjalan
Windows (PowerShell):
# Lihat semua proses Python
Get-Process -Name python

# Hentikan proses uvicorn (ganti <PID> dengan nomor PID yang benar)
Stop-Process -Id <PID>

# Pastikan uvicorn sudah mati
Get-Process -Name python

Linux/Mac:
# Lihat semua proses uvicorn
ps aux | grep uvicorn

# Hentikan proses uvicorn
kill -9 <PID>

2️⃣ Masuk ke folder backend & aktifkan virtualenv
Windows:
cd C:\test\tunasquran\backend
.\.venv\Scripts\activate

# Cek Python
python --version
where python

Linux/Mac:
cd /path/to/tunasquran/backend
source .venv/bin/activate

python --version
which python

3️⃣ Jalankan server uvicorn
uvicorn server:app --reload --host 127.0.0.1 --port 8000


⚠️ Jika server.py ada di subfolder, sesuaikan path:

uvicorn <folder>.server:app --reload --host 127.0.0.1 --port 8000


Jika berhasil, log server akan muncul:

INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [PID] using StatReload
INFO:     Registered route: GET /api/inspirasi

4️⃣ Cek OpenAPI paths
Windows:
Invoke-RestMethod http://127.0.0.1:8000/openapi.json | Select-Object -ExpandProperty paths

Linux/Mac:
curl http://127.0.0.1:8000/openapi.json | jq '.paths | keys'


Pastikan /api/inspirasi muncul di daftar paths.

5️⃣ Tes POST ke /api/inspirasi
Windows:
Invoke-RestMethod -Method POST -Uri http://127.0.0.1:8000/api/inspirasi `
-Body '{"judul":"Motivasi","konten":"Tetap semangat"}' -ContentType "application/json"

Linux/Mac:
curl -X POST http://127.0.0.1:8000/api/inspirasi \
-H "Content-Type: application/json" \
-d '{"judul":"Motivasi","konten":"Tetap semangat"}'


Output contoh:

{
  "id": "64a8f2b1c5b2a",
  "judul": "Motivasi",
  "konten": "Tetap semangat"
}

6️⃣ Pastikan MongoDB berjalan (jika pakai Docker)
Windows / Linux / Mac:
docker ps


Contoh output:

CONTAINER ID   IMAGE       PORTS                  NAMES
abcd1234       mongo       0.0.0.0:27017->27017/tcp   mongodb

7️⃣ Catatan penting

Semua perintah harus dijalankan di terminal / PowerShell, bukan Python REPL.

Gunakan PID nyata untuk Stop-Process atau kill.

Path uvicorn harus sesuai lokasi server.py:

backend/server.py → uvicorn server:app

backend/<subfolder>/server.py → uvicorn <subfolder>.server:app

Pastikan virtualenv aktif agar semua dependency tersedia.

Setelah server berjalan, API bisa diakses via browser, curl, atau PowerShell.