My Personal Portfolio WebSite
=
Personal portfolio website made with Django framework in the backend, and with CSS, JS, and Bootstrap for the frontend. It is a dynamic site so that you can control the content of the site through the admin area.

## Requirements
- Python 3.6

## How To Run:
- #### Get Git Project:
    ```bash
    git clone https://github.com/Windrist/Portfolio
    python -m venv venv
    . venv/bin/activate
    cd Portfolio
    ```
- #### Create .env file with your Config:
    ```bash
    SECRET_KEY
    DATABASE_URL
    DROPBOX_OAUTH2_TOKEN
    ```
    - SECRET_KEY and DATABASE_URL have defaut value
    - DROPBOX_OAUTH2_TOKEN get at Dropbox API for save file
    - Check [settings.py](https://github.com/Windrist/Portfolio/blob/Release/portfolio/settings.py) for more information

- #### Run Django to Test:
    ```bash
    python manage.py collectstatic --no-input
    python manage.py migrate
    python manage.py runserver
    ```
- #### On your web browser, check this link: localhost:8000

## Screenshots:
- #### Homepage:
    ![alt text](https://res.cloudinary.com/windrist/image/upload/v1631586579/Github/Home_pf5gph.png)

- #### Experiences and Achievements:
    ![alt text](https://res.cloudinary.com/windrist/image/upload/v1631586580/Github/Experiences_nclcll.png)

- #### Projects and About Me:
    ![alt text](https://res.cloudinary.com/windrist/image/upload/v1631586572/Github/Projects_p3tvdx.png)

## Credits:
* #### Thanks for Orgininal Build of this project made by - Abdelaali ES SALMI -
* #### Link: [Github](https://github.com/abdlalisalmi/DJANGO-Portfolio/README.md)
* #### New Features:
    * Add Full Options to Dashboard
    * Add Anime Girl (My Favorite Hobby, if you don't like pls disable it in "base.html")
    * Fix Some Bug
* #### Hope you like my Website! Enjoy!!!
