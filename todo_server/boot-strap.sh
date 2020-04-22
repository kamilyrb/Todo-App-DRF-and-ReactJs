echo "Running makemigrations"
./manage.py makemigrations
echo "Running migrate"
./manage.py migrate
./manage.py runserver 0.0.0.0:8005

