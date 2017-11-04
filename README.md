Welcome to foxfm2
================

Run foxfm2 in Firefox
------------------------------
Just install [foxfm2](https://addons.mozilla.org/de/firefox/addon/foxfm2/) from Mozillas's official addon page.

Run foxfm2 from sources
-----------------------------------
Who wants to have the very last version should follow these steps :)

### Get foxfm2 sources

To get a copy of foxfm2 sources just clone repository.

### Setup foxfm2 build environment

-  Install nodejs for your OS

- Install all dependencies of foxfm2 - run inside of cloned foxfm2 folder

``` 
npm install
```

- Install all jspm packages - run inside of cloned foxm2 folder

```
jspm install -y
```

### Build foxfm2 from sources

foxfm2 uses gulp for building the application and also ready to use web extension packages to be used in the web browser Firefox and Chrome.

#### Build for Firefox

Run the following command to create a ready to use foxfm2 to be loaded into Firefox from a folder
```
./node_modules/.bin/gulp export-firefox
```
This command creates following folder inside foxfm2 folder
```
./foxfm2/export-firefox
```
which can be loaded from Firefox.

#### Build for Chrome

Run the following command to create a ready to use foxfm2 to be loaded into Chrome from a folder
```
./node_modules/.bin/gulp export-chrome
```
This command creates following folder inside foxfm2 folder
```
.foxfm2/export-chrome
```
which can be loaded from Chrome.
