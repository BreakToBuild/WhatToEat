WhatToEat README
================
WhatToEat is an application where you can choose easily your next meal. Try it out

Editor settings
---------------

Vscode
^^^^^^

Create a `.code-workspace` file on root directory and put there any local settings. More info at https://code.visualstudio.com/docs/editor/multi-root-workspaces#_settings

Project Dependencies
--------------------
To run this project you need to have some dependencies installed

 * **npm** instructions at https://docs.npmjs.com/cli/install

 * **docker-compose** instructions at https://docs.docker.com/compose/install/

Project SetUp
-------------

Run Project
^^^^^^^^^^^

You can run the project by typing to following commands:

 * **backend**
    $ docker-compose build

    $ docker-compose up

 * **frontend**
    $ npm install

    $ npm start


Load Initial Data
^^^^^^^^^^^^^^^^^

You can load initial data and reset de db with the following commands:

$ python manage.py load_initial_data --reset **(pass the reset flag if you want to reset the db)**

