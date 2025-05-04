#!/bin/bash

# Konfigurasi
REPO_URL="git@github.com:lautaeferdinand/PlayTon.git"
YOUR_EMAIL="lautaeferdinandus@gmail.com"
YOUR_NAME="lautaeferdinand"

# Hapus file ZIP lama
rm -f playton-private.zip

# Buat file .zip dengan nama yang benar
zip -r playton.zip .

# Commit dan push
git add .
git commit -m "Perbarui nama file ZIP menjadi playton.zip"
git push origin main

# Pembersihan
echo "Nama file ZIP telah diperbarui dan di-push ke $REPO_URL"
echo "File playton.zip telah dibuat di $(pwd)"
