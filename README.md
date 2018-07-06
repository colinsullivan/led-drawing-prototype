# LED Drawing Prototype
This is a prototype of an LED drawing wall which renders an animated "trail" from movements on a touch screen.  Documentation of the full project is [here](https://colin-sullivan.net/main/2018/design-challenge-led-wall).

## Running the UI

    $ cd led-drawing-app/
    $ npm run start

If connecting to a server not on the same host (for local UI development), you'll need to pass the `REACT_APP_WEBSOCKET_HOST` env variable to `npm run start`:

    $ REACT_APP_WEBSOCKET_HOST=owabb.local npm run start

## Running a development server

    $ cd led-drawing-app/
    $ npm run dev_start_server

## Provisioning a BeagleBone
Add the host to `ansible/hosts`, easiest if you can SSH directly as `root`.

Create `host_vars` for the machine.  Check the `host_vars/owabb.local` for an example.

Running Ansible: 

    $ ansible-galaxy install -r ./ansible_roles.yml
    $ ansible-playbook ansible/site.yml

This will install all dependencies, configuration, and deploy the app on the BeagleBone.

To just deploy:

    $ ansible-playbook ansible/site_deploy.yml

## Desired TODOs
* Clear button so you don't have to wait for animations to fade away
* Color picker?
* connection icon for debugging
